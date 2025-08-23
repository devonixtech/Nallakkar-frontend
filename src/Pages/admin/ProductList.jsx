import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";

export default function ProductList() {
  const products = [
    {
      id: 1,
      name: "Wireless Bluetooth Headphones",
      category: "Electronics",
      price: "$299.99",
      stock: 45,
      status: "Active",
      image:
        "https://readdy.ai/api/search-image?query=modern%20wireless%20bluetooth%20headphones%20with%20sleek%20design%20on%20white%20background%2C%20product%20photography%2C%20studio%20lighting%2C%20minimalist%20style&width=80&height=80&seq=prod1&orientation=squarish",
    },
    {
      id: 2,
      name: "Smartphone Case",
      category: "Accessories",
      price: "$29.99",
      stock: 120,
      status: "Active",
      image:
        "https://readdy.ai/api/search-image?query=premium%20smartphone%20protective%20case%20transparent%20clear%20design%20on%20white%20background%2C%20product%20photography%2C%20studio%20lighting&width=80&height=80&seq=prod2&orientation=squarish",
    },
    {
      id: 3,
      name: "Laptop Stand Adjustable",
      category: "Office",
      price: "$89.99",
      stock: 8,
      status: "Low Stock",
      image:
        "https://readdy.ai/api/search-image?query=adjustable%20aluminum%20laptop%20stand%20ergonomic%20design%20on%20white%20background%2C%20product%20photography%2C%20studio%20lighting%2C%20modern%20office%20accessory&width=80&height=80&seq=prod3&orientation=squarish",
    },
    {
      id: 4,
      name: "USB-C Cable 6ft",
      category: "Accessories",
      price: "$15.99",
      stock: 0,
      status: "Out of Stock",
      image:
        "https://readdy.ai/api/search-image?query=premium%20USB-C%20charging%20cable%20white%20braided%20design%20on%20white%20background%2C%20product%20photography%2C%20studio%20lighting%2C%20tech%20accessory&width=80&height=80&seq=prod4&orientation=squarish",
    },
    {
      id: 5,
      name: "Wireless Mouse",
      category: "Electronics",
      price: "$49.99",
      stock: 67,
      status: "Active",
      image:
        "https://readdy.ai/api/search-image?query=ergonomic%20wireless%20computer%20mouse%20black%20modern%20design%20on%20white%20background%2C%20product%20photography%2C%20studio%20lighting%2C%20office%20equipment&width=80&height=80&seq=prod5&orientation=squarish",
    },
  ];

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
            <p className="text-gray-600">Manage your product inventory</p>
          </div>
          <Link
            href="/admin/products/add"
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
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                />
              </div>
              <select className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm pr-8">
                <option value="">All Categories</option>
                <option value="electronics">Electronics</option>
                <option value="accessories">Accessories</option>
                <option value="office">Office</option>
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
                    Status
                  </th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {products.map((product) => (
                  <tr key={product.id} className="hover:bg-gray-50">
                    <td className="py-4 px-4">
                      <div className="flex items-center">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-12 h-12 rounded-lg object-cover object-top mr-4"
                        />
                        <div>
                          <h4 className="text-sm font-medium text-gray-900">
                            {product.name}
                          </h4>
                          <p className="text-sm text-gray-500">
                            ID: {product.id}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-4 text-sm text-gray-700">
                      {product.category}
                    </td>
                    <td className="py-4 px-4 text-sm font-medium text-gray-900">
                      {product.price}
                    </td>
                    <td className="py-4 px-4 text-sm text-gray-700">
                      {product.stock}
                    </td>
                    <td className="py-4 px-4">
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(
                          product.status
                        )}`}
                      >
                        {product.status}
                      </span>
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex items-center space-x-2">
                        <Link
                          to={"/admin/productsDetails"}
                          className="w-8 h-8 flex items-center justify-center text-gray-500 hover:text-blue-600 cursor-pointer"
                        >
                          <i className="ri-eye-line"></i>
                        </Link>
                        <button className="w-8 h-8 flex items-center justify-center text-gray-500 hover:text-green-600 cursor-pointer">
                          <i className="ri-edit-line"></i>
                        </button>
                        <button className="w-8 h-8 flex items-center justify-center text-gray-500 hover:text-red-600 cursor-pointer">
                          <i className="ri-delete-bin-line"></i>
                        </button>
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
