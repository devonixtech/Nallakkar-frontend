import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState, useMemo } from "react";
import { fetchAllProducts } from "../../Redux/slices/productSlice";

export default function InvestorProduct() {
  const dispatch = useDispatch();
  const investorId = localStorage.getItem("investorId"); // static for now

  useEffect(() => {
    dispatch(fetchAllProducts());
  }, [dispatch]);

  const products = useSelector((state) => state?.products?.products) || [];

  // Filter products for investor
  const investorProducts = products.filter(
    (p) => Number(p?.investorId) === Number(investorId)
  );

  // Search + Pagination State
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const perPage = 10;

  // -------- FILTER (SEARCH) ----------
  const filteredProducts = useMemo(() => {
    const s = searchTerm.trim().toLowerCase();

    return investorProducts.filter((p) => {
      if (!s) return true;

      return (
        p.name?.toLowerCase().includes(s) ||
        p.category?.toLowerCase().includes(s) ||
        p.productCode?.toLowerCase().includes(s)
      );
    });
  }, [searchTerm, investorProducts]);

  // -------- PAGINATION ----------
  const totalItems = filteredProducts.length;
  const totalPages = Math.max(1, Math.ceil(totalItems / perPage));

  const startIndex = (currentPage - 1) * perPage;
  const endIndex = startIndex + perPage;
  const currentProducts = filteredProducts.slice(startIndex, endIndex);

  // Pagination reset on search change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm]);

  // Generate pagination with ellipsis
  const getPageList = (total, page, maxButtons = 7) => {
    if (total <= maxButtons) {
      return Array.from({ length: total }, (_, i) => i + 1);
    }

    const pages = [];
    const left = Math.max(2, page - 1);
    const right = Math.min(total - 1, page + 1);

    pages.push(1);
    if (left > 2) pages.push("left-ellipsis");

    for (let i = left; i <= right; i++) pages.push(i);

    if (right < total - 1) pages.push("right-ellipsis");

    pages.push(total);

    return pages;
  };

  const pageList = getPageList(totalPages, currentPage);

  const getStatusColor = (status) => {
    return status == 1
      ? "bg-green-100 text-green-800"
      : "bg-red-100 text-red-800";
  };

  return (
    <>
      <Helmet>
        <title>Investor Products - Nallakkar</title>
      </Helmet>

      <div className="space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold text-gray-900">All Products</h2>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-lg border p-4">
          <input
            type="text"
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Table */}
        <div className="bg-white rounded-lg border overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Product</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Category</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Price</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Stock</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Code</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Status</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Actions</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-gray-200">
                {currentProducts.map((product) => (
                  <tr key={product?.id} className="hover:bg-gray-50">
                    <td className="py-4 px-4">
                      <div className="flex items-center">
                        <img
                          src={product?.image[0]}
                          className="w-12 h-12 rounded-lg object-cover mr-4"
                          alt=""
                        />
                        <p className="text-sm font-medium">{product.name}</p>
                      </div>
                    </td>

                    <td className="py-4 px-4 text-sm text-gray-700">
                      {product.category}
                    </td>

                    <td className="py-4 px-4 text-sm font-medium">
                      {product.price}
                    </td>

                    <td className="py-4 px-4 text-sm">{product.stock}</td>

                    <td className="py-4 px-4 text-sm">{product.productCode}</td>

                    <td className="py-4 px-4">
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(
                          product.status
                        )}`}
                      >
                        {product.status == 1 ? "Active" : "Inactive"}
                      </span>
                    </td>

                    <td className="py-4 px-4">
                      <Link
                          to={`/investor/investorProductDetails/${product?.id}`}
                          className="w-8 h-8 flex items-center justify-center text-gray-500 hover:text-blue-600 cursor-pointer"
                        >
                          <i className="ri-eye-line"></i>
                        </Link>
                    </td>
                  </tr>
                ))}

                {currentProducts.length === 0 && (
                  <tr>
                    <td
                      colSpan={7}
                      className="text-center py-8 text-gray-500 text-sm"
                    >
                      No products found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="p-4 border-t flex justify-between items-center">
            <p className="text-sm text-gray-600">
              Showing {totalItems === 0 ? 0 : startIndex + 1} –
              {Math.min(endIndex, totalItems)} of {totalItems}
            </p>

            <div className="flex space-x-2">
              <button
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className="px-3 py-1 border rounded disabled:opacity-50"
              >
                Previous
              </button>

              {pageList.map((page, i) =>
                page === "left-ellipsis" || page === "right-ellipsis" ? (
                  <span key={i} className="px-2 text-gray-500">
                    ...
                  </span>
                ) : (
                  <button
                    key={i}
                    onClick={() => setCurrentPage(page)}
                    className={`px-3 py-1 rounded border ${
                      currentPage === page
                        ? "bg-blue-600 text-white"
                        : "hover:bg-gray-100"
                    }`}
                  >
                    {page}
                  </button>
                )
              )}

              <button
                onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages}
                className="px-3 py-1 border rounded disabled:opacity-50"
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
