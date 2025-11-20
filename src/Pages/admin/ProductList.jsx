import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { fetchAllProducts, deleteProduct, updateProductStatus, updateFeaturedStatus } from "../../Redux/slices/productSlice";
import { useEffect, useMemo, useState } from "react";   // ← FIXED
import { useSelector, useDispatch } from "react-redux";
import { fetchAllCategories } from "../../Redux/slices/categorySlice";

export default function ProductList() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAllProducts());
    dispatch(fetchAllCategories());
  }, [dispatch]);

  const products = useSelector((state) => state?.products?.products);
  const categories = useSelector((state) => state?.category?.categories);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const productsPerPage = 10;

  // FILTERED LIST
  const filteredProducts = useMemo(() => {
    const search = searchTerm.toLowerCase();

    return products.filter((p) =>
      p.name.toLowerCase().includes(search) ||
      p.categoryName.toLowerCase().includes(search)
    );
  }, [products, searchTerm]);

  // PAGINATION
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);
  const indexOfLast = currentPage * productsPerPage;
  const indexOfFirst = indexOfLast - productsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirst, indexOfLast);

  // SMART PAGINATION FUNCTION
  const getPageList = (totalPages, currentPage) => {
    let pages = [];

    if (totalPages <= 5) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    pages.push(1);

    if (currentPage > 3) {
      pages.push("...");
    }

    const start = Math.max(2, currentPage - 1);
    const end = Math.min(totalPages - 1, currentPage + 1);

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    if (currentPage < totalPages - 2) {
      pages.push("...");
    }

    pages.push(totalPages);

    return pages;
  };

  const pageList = getPageList(totalPages, currentPage);

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
  // ✅ Toggle Active/Inactive
  const handleToggleStatus = (product) => {
    const newStatus = product.status === 1 ? 0 : 1;
    dispatch(updateProductStatus({ id: product.id, status: newStatus }))
      .unwrap()
      .then(() => dispatch(fetchAllProducts()));
  };

  // ✅ Toggle Featured/Unfeatured
  const handleToggleFeatured = (product) => {
    const newStatus = product.featuredStatus === 1 ? 0 : 1;
    dispatch(updateFeaturedStatus({ id: product.id, featuredStatus: newStatus }))
      .unwrap()
      .then(() => dispatch(fetchAllProducts()));
  };



  const nextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const prevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };
  useEffect(() => {
  setCurrentPage(1);
}, [searchTerm]);


  return (
    <>
      <Helmet>
        <title>Home - Nallakkar</title>
      </Helmet>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h2 className="text-xl font-semibold text-gray-900">All Products</h2>
            <p className="text-gray-600">Manage your product inventory</p>
          </div>
          <Link
            to="/admin/products/add"
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center whitespace-nowrap cursor-pointer"
          >
            <i className="ri-add-line mr-2"></i>
            Add Product
          </Link>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
          <div className="p-4 border-b border-gray-200">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1">
               <input
  type="text"
  placeholder="Search products..."
  value={searchTerm}
  onChange={(e) => setSearchTerm(e.target.value)}
  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
/>

              </div>
              <select className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm pr-8">
                <option value="">All Categories</option>
                {categories?.map((cat) => (
                  <option key={cat.d} value={cat.id}>
                    {cat.name}
                  </option>
                ))}
              </select>
              <select className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm pr-8">
                <option value="">All Status</option>
                <option value="active">Active</option>
                <option value="low-stock">Low Stock</option>
                <option value="out-of-stock">Out of Stock</option>
              </select>
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
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Featured</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {currentProducts?.map((product) => (
                  <tr key={product?._id} className="hover:bg-gray-50">
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
                      <button
                        onClick={() => handleToggleStatus(product)}
                        className={`px-2 py-1 rounded-full text-xs font-medium cursor-pointer ${product?.status == 1
                            ? "bg-green-100 text-green-800"
                            : "bg-red-100 text-red-800"
                          }`}
                      >
                        {product?.status == 1 ? "Active" : "Inactive"}
                      </button>

                    </td>
                    <td className="py-4 px-4">
                      <button
                        onClick={() => handleToggleFeatured(product)}
                        className={`px-2 py-1 rounded-full text-xs font-medium cursor-pointer ${product?.featuredStatus == 1
                            ? "bg-blue-100 text-blue-800"
                            : "bg-gray-200 text-gray-700"
                          }`}
                      >
                        {product?.featuredStatus == 1 ? "Featured" : "Not Featured"}
                      </button>

                    </td>
                    <td className="py-4 px-4">
                      <div className="flex items-center space-x-2">
                        <Link
                          to={`/admin/productsDetails/${product?.id}`}
                          className="w-8 h-8 flex items-center justify-center text-gray-500 hover:text-blue-600 cursor-pointer"
                        >
                          <i className="ri-eye-line"></i>
                        </Link>
                        <button className="w-8 h-8 flex items-center justify-center text-gray-500 hover:text-green-600 cursor-pointer">
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

         <div className="flex items-center space-x-2 mt-4 mb-4 ms-4">

  <button
    onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
    disabled={currentPage === 1}
    className="px-3 py-1 border border-gray-300 rounded text-sm
               disabled:opacity-50"
  >
    Previous
  </button>

  {pageList.map((p, index) =>
    p === "..." ? (
      <span key={index} className="px-3 py-1 text-gray-500">...</span>
    ) : (
      <button
        key={p}
        onClick={() => setCurrentPage(p)}
        className={`px-3 py-1 rounded text-sm ${
          currentPage === p
            ? "bg-blue-600 text-white"
            : "border border-gray-300 text-gray-700 hover:bg-gray-50"
        }`}
      >
        {p}
      </button>
    )
  )}

  <button
    onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
    disabled={currentPage === totalPages}
    className="px-3 py-1 border border-gray-300 rounded text-sm
               disabled:opacity-50"
  >
    Next
  </button>

</div>

        </div>
      </div>
    </>
  );
}
