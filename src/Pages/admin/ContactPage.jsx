import React, { useState, useMemo, useEffect } from 'react';
import { Eye, Pencil, Trash2, Search, X, AlertTriangle, CheckCircle, Clock, Waypoints, MessageSquare, Contact } from 'lucide-react';
import { fetchAllContacts, deleteContact , updateContactStatus } from '../../Redux/slices/contactSlice';
import { useDispatch, useSelector } from 'react-redux';

// Status Badge Component
const StatusBadge = ({ status }) => {
  const baseClasses = "px-2 py-1 text-xs font-medium rounded-full";
  const statusClasses = {
    Resolved: "bg-green-100 text-green-800",
    Pending: "bg-yellow-100 text-yellow-800",
    Escalated: "bg-red-100 text-red-800",
  };
  return <span className={`${baseClasses} ${statusClasses[status]}`}>{status}</span>;
};

// --- Modal Components ---

// Add/Edit Inquiry Modal 
// const AddEditInquiryModal = ({ isOpen, onClose, onSave, inquiryToEdit }) => {
//   const isEditMode = !!inquiryToEdit;
//   const [formData, setFormData] = useState({});
//    const dispatch = useDispatch();
//    useEffect(() => {
//      dispatch(fetchAllContacts());
//    }, [dispatch]);
//    const inquiries = useSelector((state) => state?.contacts?.contacts);
//   //  console.log(state);
//   React.useEffect(() => {
//     if (isEditMode) {
//       setFormData(inquiryToEdit);
//     } else {
//       // Default for new inquiry
//       setFormData({
//         customerName: '',
//         email: '',
//         phone: '',
//         message: '',
//         status: 'Pending',
//       });
//     }
//   }, [inquiryToEdit, isOpen]);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData(prev => ({ ...prev, [name]: value }));
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     onSave(formData);
//   };
  
//   if (!isOpen) return null;
  
 
//   return (
//     <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
//       <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md m-4">
//         <div className="flex justify-between items-center mb-4">
//           <h2 className="text-xl font-semibold text-gray-800">{isEditMode ? 'Edit Inquiry' : 'Add New Inquiry'}</h2>
//           <button onClick={onClose} className="text-gray-500 hover:text-gray-800"><X size={24} /></button>
//         </div>
//         <form onSubmit={handleSubmit}>
//           <div className="space-y-4">
//             <div>
//               <label className="block text-sm font-medium text-gray-700">Customer Name</label>
//               <input type="text" name="customerName" value={formData.customerName || ''} onChange={handleChange} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500" required />
//             </div>
//             <div>
//               <label className="block text-sm font-medium text-gray-700">Email Address</label>
//               <input type="email" name="email" value={formData.email || ''} onChange={handleChange} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500" required />
//             </div>
//             <div>
//               <label className="block text-sm font-medium text-gray-700">Phone Number</label>
//               <input type="tel" name="phone" value={formData.phone || ''} onChange={handleChange} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500" />
//             </div>
//             <div>
//               <label className="block text-sm font-medium text-gray-700">Message</label>
//               <textarea name="message" value={formData.message || ''} onChange={handleChange} rows="4" className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500" required></textarea>
//             </div>
//             <div>
//               <label className="block text-sm font-medium text-gray-700">Status</label>
//               <select name="status" value={formData.status || 'Pending'} onChange={handleChange} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 bg-white focus:ring-blue-500 focus:border-blue-500">
//                 <option>Pending</option>
//                 <option>Resolved</option>
//                 <option>Escalated</option>
//               </select>
//             </div>
//           </div>
//           <div className="mt-6 flex justify-end space-x-3">
//             <button type="button" onClick={onClose} className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300">Cancel</button>
//             <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">{isEditMode ? 'Save Changes' : 'Add Inquiry'}</button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// View Inquiry Modal
const ViewInquiryModal = ({ isOpen, onClose, inquiry }) => {
  if (!isOpen || !inquiry) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md m-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-gray-800">Inquiry Details</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-800"><X size={24} /></button>
        </div>
        <div className="space-y-4">
          <div className="flex justify-between">
            {/* <div>
              <p className="text-sm text-gray-500">Inquiry ID</p>
              <p className="font-semibold text-gray-800">{inquiry?.id}</p>
            </div> */}
            <div>
              <p className="text-sm text-gray-500">Date</p>
              <p className="font-semibold text-gray-800"> {inquiry?.createdAt ? new Date(inquiry.createdAt).toLocaleDateString("en-GB") : "-"}</p>
            </div>
          </div>
          <div>
            <p className="text-sm text-gray-500">Customer Name</p> 
            <p className="font-semibold text-gray-800">{inquiry?.name}</p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
                <p className="text-sm text-gray-500">Email</p>
                <p className="font-semibold text-gray-800">{inquiry?.email}</p>
            </div>
            <br/>
            <div>
                <p className="text-sm text-gray-500">Phone</p>
                <p className="font-semibold text-gray-800">{inquiry?.mobile}</p>
            </div>
          </div>
          <div>
            <p className="text-sm text-gray-500">Status</p>
            <StatusBadge status={inquiry.status} />
          </div>
          <div>
            <p className="text-sm text-gray-500">Message</p>
            <p className="mt-1 p-3 bg-gray-50 border rounded-md text-gray-800">{inquiry.message}</p>
          </div>
        </div>
        <div className="mt-6 flex justify-end">
          <button onClick={onClose} className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700">Close</button>
        </div>
      </div>
    </div>
  );
};

// Delete Inquiry Modal
const DeleteInquiryModal = ({ isOpen, onClose, onConfirm, inquiry }) => {
  if (!isOpen || !inquiry) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-sm m-4">
        <div className="flex items-start">
          <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
            <AlertTriangle className="h-6 w-6 text-red-600" aria-hidden="true" />
          </div>
          <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
            <h3 className="text-lg leading-6 font-medium text-gray-900">Delete Inquiry</h3>
            <div className="mt-2">
              <p className="text-sm text-gray-500">
                Are you sure you want to delete inquiry <strong>{inquiry.id}</strong> from <strong>{inquiry.customerName}</strong>? This action cannot be undone.
              </p>
            </div>
          </div>
        </div>
        <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
           <button
  type="button"
  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 sm:ml-3 sm:w-auto sm:text-sm"
  onClick={() => onConfirm(inquiry?.id)}
>
  Delete Inquiry
</button>

          <button
            type="button"
            className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 sm:mt-0 sm:w-auto sm:text-sm"
            onClick={onClose}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};


// --- Main Page Component ---
const InquiriesPage = () => {
  // const [inquiries, setInquiries] = useState(initialInquiries);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All Status');
  
  // Modal states
  const [isAddEditModalOpen, setAddEditModalOpen] = useState(false);
  const [isViewModalOpen, setViewModalOpen] = useState(false);
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
   const dispatch = useDispatch();
   useEffect(() => {
     dispatch(fetchAllContacts());
   }, [dispatch]);
   const inquiries = useSelector((state) => state?.contacts?.contacts);
  // Data for modals
  const [selectedInquiry, setSelectedInquiry] = useState(null);
  
  // Derived state for stats
  const stats = useMemo(() => {
    return {
      total: inquiries?.length,
      pending: inquiries?.filter(i => i.status === 'Pending').length,
      resolved: inquiries?.filter(i => i.status === 'Resolved').length,
      escalated: inquiries?.filter(i => i.status === 'Escalated').length,
    };
  }, [inquiries]);
  
  // Filtering logic
  const filteredInquiries = useMemo(() => {
    return inquiries?.filter(inquiry => {
      const matchesSearch =
        inquiry?.customerName?.toLowerCase()?.includes(searchTerm.toLowerCase()) ||
        inquiry?.email?.toLowerCase()?.includes(searchTerm.toLowerCase()) 
      
      const matchesStatus = statusFilter === 'All Status' || inquiry.status === statusFilter;
      
      return matchesSearch && matchesStatus;
    });
  }, [inquiries, searchTerm, statusFilter]);
  
  // --- Event Handlers ---
  
  const handleOpenAddModal = () => {
    setSelectedInquiry(null); // Clear previous selection
    setAddEditModalOpen(true);
  };

  const handleOpenViewModal = (inquiry) => {
    setSelectedInquiry(inquiry);
    setViewModalOpen(true);
  };
  
  const handleOpenEditModal = (inquiry) => {
    setSelectedInquiry(inquiry);
    setAddEditModalOpen(true);
  };

  const handleOpenDeleteModal = (inquiry) => {
    setSelectedInquiry(inquiry);
    setDeleteModalOpen(true);
  };
  
  const handleCloseModals = () => {
    setAddEditModalOpen(false);
    setViewModalOpen(false);
    setDeleteModalOpen(false);
    setSelectedInquiry(null);
  };
  
  // const handleSaveInquiry = (inquiryData) => {
  //   if (inquiryData.id) {
  //     // Edit existing inquiry
  //     setInquiries(inquiries.map(i => i.id === inquiryData.id ? inquiryData : i));
  //   } else {
  //     // Add new inquiry
  //     const newInquiry = {
  //       ...inquiryData,
  //       id: `INQ-${String(inquiries.length + 2).padStart(3, '0')}`,
  //       date: new Date().toLocaleDateString('en-GB'),
  //     };
  //     setInquiries([newInquiry, ...inquiries]);
  //   }
  //   handleCloseModals();
  // };

   const handleDeleteInquiry = async (id) => {
  try {
    await dispatch(deleteContact(id)).unwrap();
    dispatch(fetchAllContacts());
    handleCloseModals();
  } catch (err) {
    console.error("Failed to delete inquiry:", err);
  }
};


  // --- Render ---
  return (
    <div className="bg-gray-50 min-h-screen p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
            <div>
                <h1 className="text-2xl font-bold text-gray-900">Inquiries</h1>
                <p className="mt-1 text-sm text-gray-600">Manage customer inquiries and support requests</p>
            </div>
            {/* <button 
                onClick={handleOpenAddModal}
                className="mt-4 sm:mt-0 px-4 py-2 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-75"
            >
                + Add Inquiry
            </button> */}
          </div>
        </div>
        
        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <div className="bg-white p-4 rounded-lg shadow flex items-center justify-between">
                <div>
                    <p className="text-sm font-medium text-gray-500">Total Inquiries</p>
                    <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
                </div>
                <div className="bg-blue-100 p-2 rounded-lg"><MessageSquare className="h-6 w-6 text-blue-600"/></div>
            </div>
            <div className="bg-white p-4 rounded-lg shadow flex items-center justify-between">
                <div>
                    <p className="text-sm font-medium text-gray-500">Pending</p>
                    <p className="text-2xl font-bold text-yellow-600">{stats.pending}</p>
                </div>
                <div className="bg-yellow-100 p-2 rounded-lg"><Clock className="h-6 w-6 text-yellow-600"/></div>
            </div>
            <div className="bg-white p-4 rounded-lg shadow flex items-center justify-between">
                <div>
                    <p className="text-sm font-medium text-gray-500">Resolved</p>
                    <p className="text-2xl font-bold text-green-600">{stats.resolved}</p>
                </div>
                <div className="bg-green-100 p-2 rounded-lg"><CheckCircle className="h-6 w-6 text-green-600"/></div>
            </div>
            {/* <div className="bg-white p-4 rounded-lg shadow flex items-center justify-between">
                <div>
                    <p className="text-sm font-medium text-gray-500">Escalated</p>
                    <p className="text-2xl font-bold text-red-600">{stats.escalated}</p>
                </div>
                <div className="bg-red-100 p-2 rounded-lg"><Waypoints className="h-6 w-6 text-red-600"/></div>
            </div> */}
        </div>

        {/* Search and Filter */}
        <div className="bg-white p-4 rounded-lg shadow mb-6">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <div className="relative w-full sm:max-w-xs">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search inquiries..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
            </div>
            {/* <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full sm:w-auto px-4 py-2 border border-gray-300 rounded-md bg-white text-gray-700 focus:outline-none focus:ring-1 focus:ring-blue-500"
            >
              <option>All Status</option>
              <option>Pending</option>
              <option>Resolved</option>
              <option>Escalated</option>
            </select> */}
          </div>
        </div>
        
        {/* Inquiries Table */}
        <div className="bg-white shadow rounded-lg overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 tracking-wider">SNo.</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer Name</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Message</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
             <tbody className="bg-white divide-y divide-gray-200">
  {filteredInquiries.map((inquiry, index) => (
    <tr key={inquiry.id}>
      {/* 👇 use index + 1 instead of inquiry.id */}
      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
        {index + 1}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">{inquiry?.name}</td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{inquiry?.email}</td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 max-w-xs truncate">{inquiry?.message}</td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
  {inquiry?.createdAt ? new Date(inquiry.createdAt).toLocaleDateString("en-GB") : "-"}
</td>

      <td className="px-6 py-4 whitespace-nowrap text-sm">
        <td className="px-6 py-4 whitespace-nowrap text-sm">
  <button
   className={`px-3 py-1 rounded-full text-xs ${
    inquiry.status === "Resolved"
      ? "bg-green-100 text-green-800"
      : "bg-yellow-100 text-yellow-800"
  }`}
    onClick={async () => {
      try {
        await dispatch(updateContactStatus({ id: inquiry?.id, status: "Resolved" })).unwrap();
        // 👇 Immediately refresh contacts after successful update
        dispatch(fetchAllContacts());
      } catch (err) {
        console.error("Failed to update status:", err);
      }
    }}
  >
    {inquiry?.status === null ? "Mark as Resolved" : "Resolved"}
  </button>
</td>

        </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
        <div className="flex items-center space-x-3">
          <button onClick={() => handleOpenViewModal(inquiry)} className="text-gray-400 hover:text-blue-600"><Eye size={18} /></button>
          <button onClick={() => handleOpenDeleteModal(inquiry)} className="text-gray-400 hover:text-red-600"><Trash2 size={18} /></button>
        </div>
      </td>
    </tr>
  ))}
</tbody>

          </table>
        </div>
      </div>
      
      {/* Modals */}
      {/* <AddEditInquiryModal 
        isOpen={isAddEditModalOpen}
        onClose={handleCloseModals}
        onSave={handleSaveInquiry}
        inquiryToEdit={selectedInquiry}
      /> */}
      <ViewInquiryModal
        isOpen={isViewModalOpen}
        onClose={handleCloseModals}
        inquiry={selectedInquiry}
      />
      <DeleteInquiryModal
        isOpen={isDeleteModalOpen}
        onClose={handleCloseModals}
        onConfirm={handleDeleteInquiry}
        inquiry={selectedInquiry}
      />
    </div>
  );
};

export default InquiriesPage;
