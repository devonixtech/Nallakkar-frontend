import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
const AddInvestor = () => {
  const [showModal, setShowModal] = useState(false);
  const [viewInvestor, setViewInvestor] = useState(null); // For viewing full details
const navigate = useNavigate()
const addviewProduct= ()=>{
  navigate("/admin/investoreProductList")
}
  // Dummy investors list
  const investors = [
    {
      id: 1,
      name: "John Doe",
      email: "john@example.com",
      phone: "+91 9876543210",
      status: "Active",
      branchName: "Main Branch",
      accountHolder: "John Doe",
      ifsc: "HDFC0001234",
      accountNumber: "1234567890",
    },
  ];
  return (
    <div className="p-6">
      {/* Header Section */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold text-gray-800">Investors</h2>
        <button
          onClick={() => setShowModal(true)}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700"
        >
          + Add Investor
        </button>
      </div>

      {/* Search + Table Section */}
      <div className="bg-white rounded-lg shadow p-4">
        {/* Search */}
        <div className="flex justify-between items-center mb-4">
          <input
            type="text"
            placeholder="Search investors..."
            className="px-3 py-2 border rounded-lg w-1/3 focus:outline-none focus:ring focus:ring-blue-300"
          />
          <select className="px-3 py-2 border rounded-lg focus:outline-none">
            <option>Show 10</option>
            <option>Show 20</option>
            <option>Show 50</option>
          </select>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full border border-gray-200 text-left">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-4 py-2 border-b">#</th>
                <th className="px-4 py-2 border-b">Name</th>
                <th className="px-4 py-2 border-b">Email</th>
                <th className="px-4 py-2 border-b">Phone</th>
               
                <th className="px-4 py-2 border-b">Actions</th>
              </tr>
            </thead>
            <tbody>
              {investors.map((inv, idx) => (
                <tr key={inv.id}>
                  <td className="px-4 py-2 border-b">{idx + 1}</td>
                  <td className="px-4 py-2 border-b">{inv.name}</td>
                  <td className="px-4 py-2 border-b">{inv.email}</td>
                  <td className="px-4 py-2 border-b">{inv.phone}</td>
                 
                  <td className="px-4 py-2 border-b">
                    <button
                      className="px-3 py-1 bg-yellow-500 text-white rounded mr-2 hover:bg-yellow-600"
                      onClick={() => alert("Edit functionality")}
                    >
                      Edit
                    </button>
                    <button
                      className="px-3 py-1 bg-red-500 text-white rounded mr-2 hover:bg-red-600"
                      onClick={() => alert("Delete functionality")}
                    >
                      Delete
                    </button>
                    <button
                      className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
                      onClick={() => setViewInvestor(inv)}
                    >
                      View
                    </button>
                     <button
                      className="px-3 ms-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
                      onClick={() => addviewProduct()}
                    >
                      Add / View Product
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex justify-between items-center mt-4">
          <p className="text-sm text-gray-600">Showing 1 to 10 of 50 entries</p>
          <div className="flex space-x-2">
            <button className="px-3 py-1 border rounded hover:bg-gray-100">
              Prev
            </button>
            <button className="px-3 py-1 border rounded bg-blue-600 text-white">
              1
            </button>
            <button className="px-3 py-1 border rounded hover:bg-gray-100">
              2
            </button>
            <button className="px-3 py-1 border rounded hover:bg-gray-100">
              3
            </button>
            <button className="px-3 py-1 border rounded hover:bg-gray-100">
              Next
            </button>
          </div>
        </div>
      </div>

      {/* Add Investor Modal */}
      {showModal && (
        <div style={{overflow: "scroll"}}  className="fixed  inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
          <div  className="bg-white mt-12 rounded-lg shadow-lg w-full max-w-lg p-6 relative">
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-20 right-2 text-gray-600 hover:text-gray-800"
            >
              ✖
            </button>
            <h3 className="text-xl mt-12 font-semibold mb-4">Add Investor</h3>
            <form className="space-y-4 mt-4">
              <div>
                <label className="block text-gray-700">Name</label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
                  placeholder="Enter investor name"
                />
              </div>

              <div>
                <label className="block text-gray-700">Email</label>
                <input
                  type="email"
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
                  placeholder="Enter email"
                />
              </div>

              <div>
                <label className="block text-gray-700">Phone</label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
                  placeholder="Enter phone number"
                />
              </div>

              <div>
                <label className="block text-gray-700">Password</label>
                <input
                  type="password"
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
                  placeholder="Enter password"
                />
              </div>

              {/* Bank Details Section */}
              <h4 className="text-lg font-semibold mt-4">Bank Details</h4>
              <div>
                <label className="block text-gray-700">Branch Name</label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
                  placeholder="Enter branch name"
                />
              </div>
              <div>
                <label className="block text-gray-700">Account Holder Name</label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
                  placeholder="Enter account holder name"
                />
              </div>
              <div>
                <label className="block text-gray-700">IFSC Code</label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
                  placeholder="Enter IFSC code"
                />
              </div>
              <div>
                <label className="block text-gray-700">Account Number</label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
                  placeholder="Enter account number"
                />
              </div>

              <div className="flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* View Investor Modal */}
      {viewInvestor && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6 relative">
            <button
              onClick={() => setViewInvestor(null)}
              className="absolute top-2 right-2 text-gray-600 hover:text-gray-800"
            >
              ✖
            </button>
            <h3 className="text-xl font-semibold mb-4">Investor Details</h3>
            <div className="space-y-2">
              <p>
                <strong>Name:</strong> {viewInvestor.name}
              </p>
              <p>
                <strong>Email:</strong> {viewInvestor.email}
              </p>
              <p>
                <strong>Phone:</strong> {viewInvestor.phone}
              </p>
              <p>
                <strong>Status:</strong> {viewInvestor.status}
              </p>
              <h4 className="font-semibold mt-2">Bank Details</h4>
              <p>
                <strong>Branch Name:</strong> {viewInvestor.branchName}
              </p>
              <p>
                <strong>Account Holder:</strong> {viewInvestor.accountHolder}
              </p>
              <p>
                <strong>IFSC Code:</strong> {viewInvestor.ifsc}
              </p>
              <p>
                <strong>Account Number:</strong> {viewInvestor.accountNumber}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddInvestor;
