//  import React, { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import {
//   getBanners,
//   uploadBanners,
//   updateBanners,
// } from "../../Redux/slices/bannerSlice";

// const Banners = () => {
//   const dispatch = useDispatch();

//   const { banners, loading } = useSelector((state) => state.banners);

//   const [selectedImages, setSelectedImages] = useState([]);
//   const [bannerName, setBannerName] = useState("");

//   // For updating
//   const [editId, setEditId] = useState(null);
//   const [editFiles, setEditFiles] = useState([]);
//   const [editName, setEditName] = useState("");
//   const [editPreviewImages, setEditPreviewImages] = useState([]);

//   // Fetch banners
//   useEffect(() => {
//     dispatch(getBanners());
//   }, [dispatch]);

//   // --------------------------
//   // 📌 Handle Select Images for Upload
//   // --------------------------
//   const handleImageSelect = (e) => {
//     const files = Array.from(e.target.files);

//     if (files.length > 12) {
//       alert("You can upload a maximum of 12 images");
//       return;
//     }

//     setSelectedImages(files.map((file) => URL.createObjectURL(file)));
//   };

//   // --------------------------
//   // 📌 Upload New Banner
//   // --------------------------
//   const handleUpload = async (e) => {
//     e.preventDefault();

//     if (!bannerName.trim()) {
//       return alert("Banner name is required");
//     }

//     if (selectedImages.length === 0) {
//       return alert("Please select images");
//     }

//     const formData = new FormData();
//     formData.append("name", bannerName);

//     const inputFiles = document.getElementById("bannerImages").files;
//     Array.from(inputFiles).forEach((file) => {
//       formData.append("images", file);
//     });

//     const result = await dispatch(uploadBanners(formData));

//     if (result.meta.requestStatus === "fulfilled") {
//       alert("Banner uploaded successfully!");
//       setSelectedImages([]);
//       setBannerName("");
//       dispatch(getBanners());
//     } else {
//       alert("Error uploading banner");
//     }
//   };

//   // --------------------------
//   // 📌 Open Edit Form
//   // --------------------------
//   const handleEdit = (banner) => {
//   console.log("Editing banner:", banner); // debug

//   setEditId(banner.id);
//   setEditName(banner.name || "");
//   setEditPreviewImages([...banner.images]);  // clone array
//   setEditFiles([]); // clear previous selections
// };

// const handleEditImageSelect = (e) => {
//   const files = Array.from(e.target.files);
//   setEditFiles(files); // <— ACTUAL FILES
//   setEditPreviewImages(files.map((file) => URL.createObjectURL(file)));
// };
 
//   // --------------------------
//   // 📌 Update Banner
//   // --------------------------
//    const handleUpdate = async (e) => {
//   e.preventDefault();

//   const formData = new FormData();
//   formData.append("name", editName);

//   // Case 1 ❗: User selected new images → upload them
//   if (editFiles.length > 0) {
//     editFiles.forEach((file) => {
//       formData.append("images", file);
//     });
//   }

//   // Case 2 ❗: User DID NOT select new images → backend uses old ones
//   const result = await dispatch(updateBanners({ id: editId, formData }));

//   if (result.meta.requestStatus === "fulfilled") {
//     alert("Banner updated successfully!");
//     setEditId(null);
//     setEditName("");
//     setEditPreviewImages([]);
//     setEditFiles([]);
//     dispatch(getBanners());
//   } else {
//     alert("Error updating banner");
//   }
// };


//   return (
//     <div className="px-6 py-4">
//       <h1 className="text-2xl font-semibold mb-4">Manage Banners</h1>

//       <div className="bg-white shadow-md rounded-lg p-6">
//         {/* -------------------------------------------------- */}
//         {/* EXISTING BANNERS */}
//         {/* -------------------------------------------------- */}
//         <h2 className="text-lg font-medium mb-3">Current Banners</h2>

//         {(!banners || banners.length === 0) ? (
//           <p className="text-gray-500">No banners uploaded yet</p>
//         ) : (
//           <div className="space-y-8">
//             {banners.map((banner) => (
//               <div key={banner.id} className="border rounded-lg p-4 shadow-sm">
//                 <div className="flex justify-between items-center mb-4">
//                   <h3 className="font-semibold text-lg">{banner.name}</h3>
//                   <button
//   type="button"
//   onClick={() => handleEdit(banner)}
//   className="px-4 py-2 rounded bg-yellow-500 text-white hover:bg-yellow-600"
// >
//   Edit
// </button>

//                 </div>

//                 <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
//                   {banner.images.map((img, i) => (
//                     <img
//                       key={i}
//                       src={img}
//                       alt=""
//                       className="w-full h-32 object-cover rounded border"
//                     />
//                   ))}
//                 </div>
//               </div>
//             ))}
//           </div>
//         )}

//         {/* -------------------------------------------------- */}
//         {/* CREATE NEW BANNER */}
//         {/* -------------------------------------------------- */}
//         <form onSubmit={handleUpload} className="mt-10">
//           <h2 className="text-lg font-medium mb-3">Upload New Banner</h2>

//           <input
//             type="text"
//             placeholder="Banner Name"
//             value={bannerName}
//             onChange={(e) => setBannerName(e.target.value)}
//             className="border border-gray-300 p-3 rounded-lg w-full mb-4"
//           />

//           <input
//             type="file"
//             id="bannerImages"
//             multiple
//             accept="image/*"
//             onChange={handleImageSelect}
//             className="border border-gray-300 p-3 rounded-lg w-full mb-4"
//           />

//           {selectedImages.length > 0 && (
//             <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
//               {selectedImages.map((img, i) => (
//                 <img key={i} src={img} className="w-full h-32 object-cover rounded border" />
//               ))}
//             </div>
//           )}

//           <button
//             type="submit"
//             disabled={loading}
//             className="mt-6 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium shadow-md"
//           >
//             {loading ? "Uploading..." : "Upload Banner"}
//           </button>
//         </form>

//         {/* -------------------------------------------------- */}
//         {/* EDIT BANNER FORM */}
//         {/* -------------------------------------------------- */}
//         {editId && (
//           <form onSubmit={handleUpdate} className="mt-10 border-t pt-10">
//             <h2 className="text-lg font-medium mb-3">Edit Banner</h2>

//             <input
//               type="text"
//               value={editName}
//               onChange={(e) => setEditName(e.target.value)}
//               placeholder="Enter banner name"
//               className="border border-gray-300 p-3 rounded-lg w-full mb-4"
//             />

//             <input
//               type="file"
//               id="editBannerImages"
//               multiple
//               accept="image/*"
//               onChange={handleEditImageSelect}
//               className="border border-gray-300 p-3 rounded-lg w-full mb-4"
//             />

//             {editPreviewImages.length > 0 && (
//               <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
//                 {editPreviewImages.map((img, i) => (
//                   <img key={i} src={img} className="w-full h-32 object-cover rounded border" />
//                 ))}
//               </div>
//             )}

//             <button
//               type="submit"
//               className="mt-6 bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-medium shadow-md"
//             >
//               Update Banner
//             </button>
//           </form>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Banners;
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getBanners,
  uploadBanners,
  updateBanners,
} from "../../Redux/slices/bannerSlice";

const Banners = () => {
  const dispatch = useDispatch();
  const { banners, loading } = useSelector((state) => state.banners);

  // Create states
  const [selectedImages, setSelectedImages] = useState([]);
  const [bannerName, setBannerName] = useState("");

  // Edit states
  const [editId, setEditId] = useState(null);
  const [editName, setEditName] = useState("");
  const [editFiles, setEditFiles] = useState([]);
  const [editPreviewImages, setEditPreviewImages] = useState([]);

  useEffect(() => {
    dispatch(getBanners());
  }, [dispatch]);

  // --------------------------
  // Select Images for New Banner
  // --------------------------
  const handleImageSelect = (e) => {
    const files = Array.from(e.target.files);
    if (files.length > 12) return alert("Max 12 images allowed");
    setSelectedImages(files.map((f) => URL.createObjectURL(f)));
  };

  // --------------------------
  // Upload Banner
  // --------------------------
  const handleUpload = async (e) => {
    e.preventDefault();
    if (!bannerName.trim()) return alert("Banner name required");
    if (selectedImages.length === 0) return alert("Select images");

    const formData = new FormData();
    formData.append("name", bannerName);

    const inputFiles = document.getElementById("bannerImages").files;
    Array.from(inputFiles).forEach((file) => {
      formData.append("images", file);
    });

    const result = await dispatch(uploadBanners(formData));
    if (result.meta.requestStatus === "fulfilled") {
      alert("Uploaded!");
      setBannerName("");
      setSelectedImages([]);
      dispatch(getBanners());
    }
  };

  // --------------------------
  // Open Edit Mode
  // --------------------------
  const handleEdit = (banner) => {
    console.log("Editing banner:", banner);

    setEditId(banner.id);
    setEditName(banner.name);
    setEditPreviewImages([...banner.images]); // SAFE COPY
    setEditFiles([]);
    window.scrollTo({ top: 0, behavior: "smooth" }); // move view to edit form
  };

  // --------------------------
  // Select Images in Edit Mode
  // --------------------------
  const handleEditImageSelect = (e) => {
    const files = Array.from(e.target.files);
    setEditFiles(files);
    setEditPreviewImages(files.map((f) => URL.createObjectURL(f)));
  };

  // --------------------------
  // Update Banner
  // --------------------------
  const handleUpdate = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", editName);

    if (editFiles.length > 0) {
      editFiles.forEach((file) => formData.append("images", file));
    }

    const result = await dispatch(updateBanners({ id: editId, formData }));

    if (result.meta.requestStatus === "fulfilled") {
      alert("Banner updated!");
      setEditId(null);
      setEditName("");
      setEditPreviewImages([]);
      setEditFiles([]);
      dispatch(getBanners());
    }
  };

  return (
    <div className="px-6 py-4">
      <h1 className="text-2xl font-semibold mb-4">Manage Banners</h1>

      {/* ----------------------------------------------- */}
      {/* EDIT FORM — ALWAYS VISIBLE WHEN EDITING */}
      {/* ----------------------------------------------- */}
      {editId && (
        <form
          onSubmit={handleUpdate}
          className="mb-10 p-6 bg-yellow-50 border rounded-lg shadow"
        >
          <h2 className="text-lg font-semibold mb-3">Edit Banner</h2>

          <input
            type="text"
            value={editName}
            onChange={(e) => setEditName(e.target.value)}
            placeholder="Enter banner name"
            className="border p-3 rounded-lg w-full mb-4"
          />

          <input
            type="file"
            id="editBannerImages"
            multiple
            accept="image/*"
            onChange={handleEditImageSelect}
            className="border p-3 rounded-lg w-full mb-4"
          />

          {editPreviewImages.length > 0 && (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
              {editPreviewImages.map((img, i) => (
                <img
                  key={i}
                  src={img}
                  className="w-full h-32 object-cover rounded border"
                />
              ))}
            </div>
          )}

          <button
            type="submit"
            className="mt-6 bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg"
          >
            Update Banner
          </button>
        </form>
      )}

      {/* ----------------------------------------------- */}
      {/* BANNER LIST */}
      {/* ----------------------------------------------- */}
      <div className="bg-white shadow-md rounded-lg p-6">
        <h2 className="text-lg font-medium mb-3">Current Banners</h2>

        {(!banners || banners.length === 0) ? (
          <p className="text-gray-500">No banners uploaded</p>
        ) : (
          <div className="space-y-8">
            {banners.map((banner) => (
              <div key={banner.id} className="border rounded-lg p-4 shadow-sm">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="font-semibold text-lg">{banner.name}</h3>

                  <button
                    type="button"
                    onClick={() => handleEdit(banner)}
                    className="px-4 py-2 rounded bg-yellow-500 text-white hover:bg-yellow-600"
                  >
                    Edit
                  </button>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {banner.images.map((img, i) => (
                    <img
                      key={i}
                      src={img}
                      className="w-full h-32 object-cover rounded border"
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* ----------------------------------------------- */}
        {/* CREATE NEW BANNER */}
        {/* ----------------------------------------------- */}
        <form onSubmit={handleUpload} className="mt-10">
          <h2 className="text-lg font-medium mb-3">Upload New Banner</h2>

          <input
            type="text"
            placeholder="Banner Name"
            value={bannerName}
            onChange={(e) => setBannerName(e.target.value)}
            className="border p-3 rounded-lg w-full mb-4"
          />

          <input
            type="file"
            id="bannerImages"
            multiple
            accept="image/*"
            onChange={handleImageSelect}
            className="border p-3 rounded-lg w-full mb-4"
          />

          {selectedImages.length > 0 && (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
              {selectedImages.map((img, i) => (
                <img
                  key={i}
                  src={img}
                  className="w-full h-32 object-cover rounded border"
                />
              ))}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="mt-6 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg"
          >
            {loading ? "Uploading..." : "Upload Banner"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Banners;
