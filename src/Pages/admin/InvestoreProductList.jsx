import { useEffect, useState } from "react";
 import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { fetchAllProducts, deleteProduct } from "../../Redux/slices/productSlice";
import { useSelector, useDispatch } from "react-redux";
import { fetchAllCategories } from "../../Redux/slices/categorySlice";
import AddInvestoreProduct from "./AddInvestoreProduct";
import { useNavigate } from "react-router-dom";

export default function InvestoreProductList() {
  const dispatch = useDispatch();
  const investorId = localStorage.getItem('investorId');
  useEffect(() => {
    dispatch(fetchAllProducts());
    dispatch(fetchAllCategories());
  }, [dispatch]);
const navigate=useNavigate();
  const products = useSelector((state) => state?.products?.products);
  const categories = useSelector((state) => state?.category?.categories);  
const [searchTerm, setSearchTerm] = useState("");
const [currentPage, setCurrentPage] = useState(1);


  // Get investorId from localStorage

// Filter products where investorId matches
const investorProducts = products
  ?.filter((product) => product?.investorId === investorId)
  ?.filter((product) =>
    product?.name?.toLowerCase().includes(searchTerm)
  );
  console.log('INVESTOR ID:', investorId);
  console.log("Filtered Products for Investor:", investorProducts);
const itemsPerPage = 10; // you can change
const indexOfLastItem = currentPage * itemsPerPage;
const indexOfFirstItem = indexOfLastItem - itemsPerPage;

const currentProducts = investorProducts?.slice(indexOfFirstItem, indexOfLastItem);

 const [showAddModal, setShowAddModal] = useState(false); 
  const getStatusColor = (status) => {
    switch (status) {
      case "Delivered":
        return "bg-green-100 text-green-800";
      case "Processing":
        return "bg-yellow-100 text-yellow-800";
      case "Shipped":
        return "bg-blue-100 text-blue-800";
      case "Pending":
        return "bg-gray-100 text-gray-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  // ✅ Delete handler
  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      dispatch(deleteProduct(id))
        .unwrap()
        .then(() => {
          dispatch(fetchAllProducts());
          alert("Product deleted successfully!");
        })
        .catch((err) => {
          console.error("Delete failed:", err);
          alert("Failed to delete product.");
        });
    }
  };

  return (
    <>
      <Helmet>
        <title>Home - Nallakkar</title>
      </Helmet>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            {/* <h2 className="text-xl font-semibold text-gray-900">John deo </h2>
            <p className="text-gray-600">Manage John Deo inventory</p> */}
          </div>
            {/* ✅ Add Product Button */}
          <button
            onClick={() =>   navigate("/admin/products/add")} // open popup
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center whitespace-nowrap cursor-pointer"
          >
            <i className="ri-add-line mr-2"></i>
            Add Product
          </button>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
          <div className="p-4 border-b border-gray-200">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1">
              <input
  type="text"
  placeholder="Search products..."
  value={searchTerm}
  onChange={(e) => setSearchTerm(e.target.value.toLowerCase())}
  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
/>

              </div>
              {/* <select className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm pr-8">
                <option value="">All Categories</option>
                {categories?.map((cat) => (
                  <option key={cat.d} value={cat.id}>
                    {cat.name}
                  </option>
                ))}
              </select> */}
              {/* <select className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm pr-8">
                <option value="">All Status</option>
                <option value="active">Active</option>
                <option value="low-stock">Low Stock</option>
                <option value="out-of-stock">Out of Stock</option>
              </select> */}
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Product</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Category</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Price</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Stock</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Status</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {currentProducts?.map((product) => (
                  <tr key={product?.id} className="hover:bg-gray-50">
                    <td className="py-4 px-4">
                      <div className="flex items-center">
                        <img
                          src={product?.image?.[0]}
                          alt={product?.name}
                          className="w-12 h-12 rounded-lg object-cover object-top mr-4"
                        />
                        <div>
                          <h4 className="text-sm font-medium text-gray-900">{product?.name}</h4>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-4 text-sm text-gray-700">{product?.categoryName}</td>
                    <td className="py-4 px-4 text-sm font-medium text-gray-900">{product?.price}</td>
                    <td className="py-4 px-4 text-sm text-gray-700">{product?.stock}</td>
                    <td className="py-4 px-4">
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(
                          product?.status
                        )}`}
                      >
                        {product?.status === 1 ? "Active" : "Inactive"}
                      </span>
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex items-center space-x-2">
                        <Link
                          to={`/admin/productsDetails/${product?.id}`}
                          className="w-8 h-8 flex items-center justify-center text-gray-500 hover:text-blue-600 cursor-pointer"
                        >
                          <i className="ri-eye-line"></i>
                        </Link>
                        <button   
                         onClick={()=>{navigate( `/admin/products/edit/${product?.id}`)}}
                        className="w-8 h-8 flex items-center justify-center text-gray-500 hover:text-green-600 cursor-pointer">
                          <i className="ri-edit-line"></i>
                        </button>
                        <button
                          onClick={() => handleDelete(product?.id)}
                          className="w-8 h-8 flex items-center justify-center text-gray-500 hover:text-red-600 cursor-pointer"
                        >
                          <i className="ri-delete-bin-line"></i>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

       <div className="flex items-center space-x-2 mb-3 ">

  <button
    className="px-3 py-1 ms-3 border border-gray-300 rounded text-sm text-gray-500 cursor-pointer"
    disabled={currentPage === 1}
    onClick={() => setCurrentPage((prev) => prev - 1)}
  >
    Previous
  </button>

  {Array.from({ length: Math.ceil(investorProducts?.length / itemsPerPage) }, (_, i) => (
    <button
      key={i}
      className={`px-3 py-1 rounded text-sm ${
        currentPage === i + 1
          ? "bg-blue-600 text-white"
          : "border border-gray-300 text-gray-700 hover:bg-gray-50"
      }`}
      onClick={() => setCurrentPage(i + 1)}
    >
      {i + 1}
    </button>
  ))}

  <button
    className="px-3 py-1 border border-gray-300 rounded text-sm text-gray-700 hover:bg-gray-50 cursor-pointer"
    disabled={currentPage === Math.ceil(investorProducts?.length / itemsPerPage)}
    onClick={() => setCurrentPage((prev) => prev + 1)}
  >
    Next
  </button>

</div>

        </div>
      </div>


      {/* ✅ Add Product Popup Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white w-full max-w-3xl rounded-lg shadow-lg relative">
            {/* Close button */}
            <button
              onClick={() => setShowAddModal(false)}
              className="absolute top-3 right-3 text-gray-600 hover:text-gray-800 text-xl"
            >
              ✕
            </button>

            <div className="p-4 max-h-[90vh] overflow-y-auto">
              <AddInvestoreProduct
                onClose={() => setShowAddModal(false)} // pass close handler
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
