 import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  createInvestor,
  fetchAllInvestors,
  deleteInvestor,
  updateInvestor,
} from "../../Redux/slices/investorSlice";

const AddInvestor = () => {
  const [showModal, setShowModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false); // 🔹 To track if editing mode
  const [viewInvestor, setViewInvestor] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobileNumber: "",
    password: "",
    branchName: "",
    accountHolderName: "",
    ifscCode: "",
    accountNumber: "",
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAllInvestors());
  }, [dispatch]);

  const investors = useSelector((state) => state.investors.investors);

  const addviewProduct = () => {
    navigate("/admin/investoreProductList");
  };

  // ✅ Handle Create / Update Investor
  const handleSaveInvestor = async () => {
    try {
      if (!formData.name || !formData.email || !formData.mobileNumber) {
        alert("Please fill in all required fields");
        return;
      }

      let resultAction;
      if (isEditing) {
        // 🔹 Update Investor
        resultAction = await dispatch(
          updateInvestor({ id: formData.id, data: formData })
        );
      } else {
        // 🔹 Create Investor
        resultAction = await dispatch(createInvestor(formData));
      }

      if (
        createInvestor.fulfilled.match(resultAction) ||
        updateInvestor.fulfilled.match(resultAction)
      ) {
        alert(isEditing ? "Investor updated successfully!" : "Investor added successfully!");
        setShowModal(false);
        setIsEditing(false);
        setFormData({
          name: "",
          email: "",
          mobileNumber: "",
          password: "",
          branchName: "",
          accountHolderName: "",
          ifscCode: "",
          accountNumber: "",
        });
        dispatch(fetchAllInvestors());
      } else {
        alert(resultAction.payload?.message || "Operation failed");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Something went wrong");
    }
  };

  // ✅ Delete Investor
  const handleDeleteInvestor = async (investorId) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this investor?");
    if (!confirmDelete) return;

    try {
      const resultAction = await dispatch(deleteInvestor(investorId));
      if (deleteInvestor.fulfilled.match(resultAction)) {
        alert("Investor deleted successfully!");
        dispatch(fetchAllInvestors());
      } else {
        alert(resultAction.payload?.message || "Failed to delete investor");
      }
    } catch (error) {
      console.error("Delete Error:", error);
      alert("Something went wrong while deleting investor");
    }
  };

  // ✅ Open Modal for Edit
  const handleEditInvestor = (inv) => {
    setIsEditing(true);
    setFormData(inv);
    setShowModal(true);
  };

  // ✅ Reset Modal on Close
  const handleCloseModal = () => {
    setShowModal(false);
    setIsEditing(false);
    setFormData({
      name: "",
      email: "",
      mobileNumber: "",
      password: "",
      branchName: "",
      accountHolderName: "",
      ifscCode: "",
      accountNumber: "",
    });
  };

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold text-gray-800">Investors</h2>
        <button
          onClick={() => {
            setShowModal(true);
            setIsEditing(false);
          }}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700"
        >
          + Add Investor
        </button>
      </div>

      {/* Table Section */}
      <div className="bg-white rounded-lg shadow p-4">
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
              {investors?.map((inv, idx) => (
                <tr key={inv.id || idx}>
                  <td className="px-4 py-2 border-b">{idx + 1}</td>
                  <td className="px-4 py-2 border-b">{inv?.name}</td>
                  <td className="px-4 py-2 border-b">{inv?.email}</td>
                  <td className="px-4 py-2 border-b">{inv?.mobileNumber}</td>
                  <td className="px-4 py-2 border-b">
                    <button
                      className="px-3 py-1 bg-yellow-500 text-white rounded mr-2 hover:bg-yellow-600"
                      onClick={() => handleEditInvestor(inv)}
                    >
                      Edit
                    </button>
                    <button
                      className="px-3 py-1 bg-red-500 text-white rounded mr-2 hover:bg-red-600"
                      onClick={() => handleDeleteInvestor(inv.id)}
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
                      className="px-3 ms-3 py-1 bg-indigo-500 text-white rounded hover:bg-indigo-600"
                      onClick={ addviewProduct}
                    >
                      Add / View Product
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add / Edit Modal */}
     {showModal && (
  <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50 overflow-auto">
    <div className="bg-white rounded-xl shadow-xl w-full max-w-3xl p-8 relative">

      {/* Close Button */}
      <button
        onClick={handleCloseModal}
        className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 text-xl"
      >
        ✖
      </button>

      <h3 className="text-2xl font-semibold mb-6">
        {isEditing ? "Edit Investor" : "Add Investor"}
      </h3>

      <form className="grid grid-cols-1 md:grid-cols-2 gap-6">

        {[
          { label: "Name", name: "name" },
          { label: "Email", name: "email", type: "email" },
          { label: "Phone", name: "mobileNumber" },
          { label: "Password", name: "password", type: "password" },
          { label: "Branch Name", name: "branchName" },
          { label: "Account Holder Name", name: "accountHolderName" },
          { label: "IFSC Code", name: "ifscCode" },
          { label: "Account Number", name: "accountNumber" },
        ].map((field) => (
          <div key={field.name}>
            <label className="block text-gray-700 font-medium mb-1">
              {field.label}
            </label>
            <input
              type={field.type || "text"}
              name={field.name}
              value={formData[field.name] || ""}
              onChange={(e) =>
                setFormData({ ...formData, [e.target.name]: e.target.value })
              }
              className="w-full px-4 py-2 border border-gray-300 rounded-lg 
                         focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder={`Enter ${field.label.toLowerCase()}`}
            />
          </div>
        ))}

      </form>

      {/* Footer Buttons */}
      <div className="flex justify-end space-x-3 mt-8">
        <button
          type="button"
          onClick={handleCloseModal}
          className="px-5 py-2 bg-gray-200 rounded-lg hover:bg-gray-300"
        >
          Cancel
        </button>

        <button
          type="button"
          onClick={handleSaveInvestor}
          className="px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          {isEditing ? "Update" : "Save"}
        </button>
      </div>
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
              <p><strong>Name:</strong> {viewInvestor.name}</p>
              <p><strong>Email:</strong> {viewInvestor.email}</p>
              <p><strong>Phone:</strong> {viewInvestor.mobileNumber}</p>
              <p><strong>Branch Name:</strong> {viewInvestor.branchName}</p>
              <p><strong>Account Holder:</strong> {viewInvestor.accountHolderName}</p>
              <p><strong>IFSC Code:</strong> {viewInvestor.ifscCode}</p>
              <p><strong>Account Number:</strong> {viewInvestor.accountNumber}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddInvestor;
