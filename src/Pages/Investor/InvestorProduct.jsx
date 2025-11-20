import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { fetchAllProducts } from "../../Redux/slices/productSlice";

export default function InvestorProduct() {
  const dispatch = useDispatch();
  const investorId = localStorage.getItem('investorId');
  // const investorId = 5;
  useEffect(() => {
    dispatch(fetchAllProducts());
  }, [dispatch]);
  const products = useSelector((state) => state?.products?.products);
const investorProducts = products?.filter(
  (product) => product?.investorId == investorId
);

  
   
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

  return (
    <>
      <Helmet>
        <title>Home - Nallakkar</title>
      </Helmet>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h2 className="text-xl font-semibold text-gray-900">
              All Products
            </h2>

          </div>

        </div>

        <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
          <div className="p-4 border-b border-gray-200">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1">
                <input
                  type="text"
                  placeholder="Search products..."
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                />
              </div>
              <button
  disabled={true}
  className="
    px-3 py-1 text-xs rounded-md font-medium 
    bg-blue-600 text-white 
    hover:bg-blue-700
    disabled:bg-gray-400 
    disabled:cursor-not-allowed 
    disabled:opacity-70
    disabled:hover:bg-gray-400
  "
>
  Claim
</button>

              {/* <select className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm pr-8">
                <option value="">All Categories</option>
                {categories?.map((cat) => (
                  <option key={cat._id} value={cat._id}>
                    {cat.name}
                  </option>
                ))}
              </select>

              <select className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm pr-8">
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
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">
                    Product
                  </th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">
                    Category
                  </th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">
                    Price
                  </th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">
                    Stock
                  </th>
                   <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">
                    Product Code
                  </th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">
                    Status
                  </th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {investorProducts?.map((product) => (
                  <tr key={product?.id} className="hover:bg-gray-50">
                    <td className="py-4 px-4">
                      <div className="flex items-center">
                        <img
                          src={product?.image}
                          alt={product?.name}
                          className="w-12 h-12 rounded-lg object-cover object-top mr-4"
                        />
                        <div>
                          <h4 className="text-sm font-medium text-gray-900">
                            {product.name}
                          </h4>
                          {/* <p className="text-sm text-gray-500">
                            ID: {product.id}
                          </p> */}
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-4 text-sm text-gray-700">
                      {product?.categoryName}
                    </td>
                    <td className="py-4 px-4 text-sm font-medium text-gray-900">
                      {product.price}
                    </td>
                    <td className="py-4 px-4 text-sm text-gray-700">
                      {product?.stock}
                    </td>
                     <td className="py-4 px-4 text-sm text-gray-700">
                      {product?.productCode}
                    </td>
                    <td className="py-4 px-4">
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(
                          product.status
                        )}`}
                      >
                        {product?.status == 1 ? 'Active' : 'Inactive'}
                      </span>
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex items-center space-x-2">
                        <Link
                          //   to={"/admin/productsDetails"}
                          className="w-8 h-8 flex items-center justify-center text-gray-500 hover:text-blue-600 cursor-pointer"
                        >
                          <i className="ri-eye-line"></i>
                        </Link>
                        {/* <button className="w-8 h-8 flex items-center justify-center text-gray-500 hover:text-green-600 cursor-pointer">
                          <i className="ri-edit-line"></i>
                        </button>
                        <button className="w-8 h-8 flex items-center justify-center text-gray-500 hover:text-red-600 cursor-pointer">
                          <i className="ri-delete-bin-line"></i>
                        </button> */}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="p-4 border-t border-gray-200 flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-sm text-gray-600">Showing 1 to 5 of 5 results</p>
            <div className="flex items-center space-x-2">
              <button className="px-3 py-1 border border-gray-300 rounded text-sm text-gray-500 cursor-pointer">
                Previous
              </button>
              <button className="px-3 py-1 bg-blue-600 text-white rounded text-sm cursor-pointer">
                1
              </button>
              <button className="px-3 py-1 border border-gray-300 rounded text-sm text-gray-700 hover:bg-gray-50 cursor-pointer">
                2
              </button>
              <button className="px-3 py-1 border border-gray-300 rounded text-sm text-gray-700 hover:bg-gray-50 cursor-pointer">
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
