 import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { createProduct } from "../../Redux/slices/productSlice"; // make sure this thunk exists
import { fetchAllCategories } from "../../Redux/slices/categorySlice";
import { fetchAllInvestors } from "../../Redux/slices/investorSlice";
export default function AddProduct() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading } = useSelector((state) => state.products);

  const [formData, setFormData] = useState({
    title: "",
    category: "",
    subcategory: "",
    price: "",
    discountPrice: "",
    stock: "",
    status: "active",
    description: "",
    shortDescription: "",
    reviewCount: "",
    rating: "",
     length: "",
    breadth: "",
    height: "",
    weight: "",
    investorId: "" ,
  });

  const [images, setImages] = useState([]);
  const [customVariants, setCustomVariants] = useState([{ type: "", value: "" }]);
  const [extraFields, setExtraFields] = useState({
  field1: { key: "", value: "" },
  field2: { key: "", value: "" },
  field3: { key: "", value: "" },
  field4: { key: "", value: "" },
});

  const [errors, setErrors] = useState({});
  const [toast, setToast] = useState({ show: false, type: "success", message: "" });
   
  // Fetch categories and subcategories on mount
  useEffect(() => {
    dispatch(fetchAllCategories());
        dispatch(fetchAllInvestors());
    
  }, [dispatch]);
 const categories = useSelector((state) => state?.ctegory?.categories);
  const investors = useSelector((state) => state.investors.investors);
 
   

  // ---------- helpers ----------
  const showToast = (message, type = "success") => {
    setToast({ show: true, type, message });
    setTimeout(() => setToast({ show: false, type: "success", message: "" }), 3000);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files || []);
    files.forEach((file) => {
      const reader = new FileReader();
      reader.onload = (ev) => {
        setImages((prev) => [...prev, { file, url: ev.target?.result }]);
      };
      reader.readAsDataURL(file);
    });
  };

  const updateVariant = (index, field, value) => {
    setCustomVariants((prev) =>
      prev.map((v, i) => (i === index ? { ...v, [field]: value } : v))
    );
  };
const groupedVariants = customVariants.reduce((acc, v) => {
  if (v.type && v.value) {
    if (!acc[v.type]) acc[v.type] = [];
    acc[v.type].push(v.value);
  }
  return acc;
}, {});
const handleExtraFieldChange = (field, type, value) => {
  setExtraFields((prev) => ({
    ...prev,
    [field]: {
      ...prev[field],
      [type]: value,
    },
  }));
};

  const validate = () => {
    const errs = {};
    if (!formData.title.trim()) errs.title = "Product name is required";
    if (!formData.category) errs.category = "Category is required";
    if (!formData.price) errs.price = "Price is required";
    if (!formData.stock) errs.stock = "Stock is required";
    if (!formData.description.trim()) errs.description = "Description is required";
      if (!formData.length) errs.length = "Length is required";
    if (!formData.breadth) errs.breadth = "Breadth is required";
    if (!formData.height) errs.height = "Height is required";
    if (!formData.weight) errs.weight = "Weight is required";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  // ---------- submit ----------
   const handleSubmit = async (e) => {
  e.preventDefault();
  if (!validate()) return;

  try {
    const form = new FormData();
    form.append("name", formData.title);
    form.append("price", formData.price);
    form.append("discount", formData.discountPrice || 0);
    form.append("description", formData.description);
    form.append("description2", formData.shortDescription || "");
    form.append("categoryId", formData.category);
    form.append("subCategoryId", formData.subcategory || "");
    form.append("stock", formData.stock || 0);
    form.append("status", formData.status || "active");
    form.append("reviewCount", formData.reviewCount || "");
    form.append("rating", formData.rating || "");
     form.append("length", formData.length);
      form.append("breadth", formData.breadth);
      form.append("height", formData.height);
      form.append("weight", formData.weight);

    // ✅ Correct variants format
    const variantsToSend = customVariants.reduce((acc, v) => {
      if (v.type && v.value) {
        acc[v.type] = v.value.split(",").map((val) => val.trim());
      }
      return acc;
    }, {});
    form.append("variants", JSON.stringify(variantsToSend));
    // Clean extraFields (remove empty ones)
const cleanedExtraFields = Object.fromEntries(
  Object.entries(extraFields).filter(
    ([_, v]) => v.key.trim() && v.value.trim()
  )
);

// Send to backend
form.append("extraFields", JSON.stringify(cleanedExtraFields));
// 👇 Only append if investor is selected
if (formData.investorId) {
  form.append("investorId", formData.investorId);
}



    // Images
    images.forEach((img) => {
      form.append("image", img.file);
    });

    await dispatch(createProduct(form)).unwrap();
    showToast("Product created successfully");
    navigate("/admin/products");
  } catch (err) {
    console.error("Error creating product:", err);
    showToast("Failed to create product", "error");
  }
};


 return (
  <div className="p-6 max-w-5xl mx-auto">
    <h2 className="text-2xl font-bold mb-6">Add Product</h2>

    <form
      onSubmit={handleSubmit}
      className="space-y-8 bg-white p-6 rounded-2xl shadow-sm border border-gray-200"
    >
      {/* PRODUCT DETAILS */}
      <div>
        <h3 className="text-lg font-semibold mb-3 text-gray-800">Product Details</h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="col-span-2">
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Product Name
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Enter product name"
              className="w-full border rounded-lg p-3 focus:ring focus:ring-blue-200"
            />
            {errors.title && <p className="text-red-500 text-sm">{errors.title}</p>}
          </div>

          {/* CATEGORY */}
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Category
            </label>
            <select
              name="category"
              value={formData.category}
              onChange={(e) => {
                handleChange(e);
                setFormData((prev) => ({ ...prev, subcategory: "" }));
              }}
              className="w-full border rounded-lg p-3 bg-white"
            >
              <option value="">Select Category</option>
              {categories?.map((c) => (
                <option key={c.id} value={c.id}>{c.name}</option>
              ))}
            </select>
            {errors.category && <p className="text-red-500 text-sm">{errors.category}</p>}
          </div>

          {/* SUBCATEGORY */}
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Subcategory
            </label>
            <select
              name="subcategory"
              value={formData.subcategory}
              onChange={handleChange}
              disabled={!formData.category}
              className="w-full border rounded-lg p-3 bg-white disabled:bg-gray-100"
            >
              <option value="">Select Subcategory</option>
              {categories
                ?.find((c) => c.id === Number(formData.category))
                ?.subcategories?.map((sub) => (
                  <option key={sub.id} value={sub.id}>{sub.name}</option>
                ))}
            </select>
          </div>

          {/* PRICE */}
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">Price</label>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              placeholder="Enter price"
              className="w-full border rounded-lg p-3"
            />
          </div>

          {/* DISCOUNT */}
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">Discount (%)</label>
            <input
              type="number"
              name="discountPrice"
              value={formData.discountPrice}
              onChange={handleChange}
              placeholder="Enter discount"
              className="w-full border rounded-lg p-3"
            />
          </div>

          {/* STOCK */}
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">Stock</label>
            <input
              type="number"
              name="stock"
              value={formData.stock}
              onChange={handleChange}
              placeholder="Enter stock quantity"
              className="w-full border rounded-lg p-3"
            />
          </div>
          {/* INVESTOR (OPTIONAL) */}
<div>
  <label className="block text-sm font-medium text-gray-600 mb-1">
    Investor (Optional)
  </label>

  <select
    name="investorId"
    value={formData.investorId}
    onChange={handleChange}
    className="w-full border rounded-lg p-3 bg-white"
  >
    <option value="">No Investor</option>
    {investors?.map((inv) => (
      <option key={inv.id} value={inv.id}>
        {inv.name}
      </option>
    ))}
  </select>
</div>

        </div>
      </div>

      {/* DESCRIPTIONS */}
      <div>
        <h3 className="text-lg font-semibold mb-3 text-gray-800">Descriptions</h3>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Enter full description"
          className="w-full border rounded-lg p-3 h-24"
        />
        <textarea
          name="shortDescription"
          value={formData.shortDescription}
          onChange={handleChange}
          placeholder="Short description"
          className="w-full border rounded-lg p-3 h-20 mt-3"
        />
      </div>

      {/* DIMENSIONS */}
      <div>
        <h3 className="text-lg font-semibold mb-3 text-gray-800">Dimensions</h3>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {["length","breadth","height","weight"].map((f)=>(
            <input
              key={f}
              type="number"
              name={f}
              placeholder={`${f.charAt(0).toUpperCase() + f.slice(1)} ${f==="weight" ? "(kg)" : "(cm)"}`}
              value={formData[f]}
              onChange={handleChange}
              className="border rounded-lg p-3"
            />
          ))}
        </div>
      </div>

      {/* VARIANTS */}
      <div>
        <h3 className="text-lg font-semibold mb-3 text-gray-800">Variants</h3>

        {customVariants.map((variant, index) => (
          <div key={index} className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <input
              type="text"
              placeholder="Type (e.g. Color)"
              value={variant.type}
              onChange={(e) =>
                updateVariant(index, "type", e.target.value)
              }
              className="border rounded-lg p-3"
            />
            <input
              type="text"
              placeholder="Values (comma separated)"
              value={variant.value}
              onChange={(e) =>
                updateVariant(index, "value", e.target.value)
              }
              className="border rounded-lg p-3"
            />
          </div>
        ))}

        <button
          type="button"
          onClick={() => setCustomVariants([...customVariants, { type: "", value: "" }])}
          className="px-4 py-2 bg-gray-100 border rounded-lg hover:bg-gray-200"
        >
          + Add Variant
        </button>
      </div>
{/* EXTRA FIELDS */}
<div>
  <h3 className="text-lg font-semibold mb-3 text-gray-800">
    Additional Information
  </h3>

  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
    {Object.entries(extraFields).map(([field, data], index) => (
      <div key={field} className="border rounded-lg p-4 bg-gray-50">
        <p className="text-sm font-medium text-gray-600 mb-2">
          Field {index + 1}
        </p>

        <input
          type="text"
          placeholder="Key (e.g. Material)"
          value={data.key}
          onChange={(e) =>
            handleExtraFieldChange(field, "key", e.target.value)
          }
          className="w-full border rounded-lg p-2 mb-2"
        />

        <input
          type="text"
          placeholder="Value (e.g. Cotton)"
          value={data.value}
          onChange={(e) =>
            handleExtraFieldChange(field, "value", e.target.value)
          }
          className="w-full border rounded-lg p-2"
        />
      </div>
    ))}
  </div>
</div>

      {/* IMAGES */}
      <div>
        <h3 className="text-lg font-semibold mb-3 text-gray-800">Images</h3>

        <input type="file" multiple onChange={handleImageUpload} className="block" />

        <div className="flex gap-3 mt-3 flex-wrap">
          {images.map((img, i) => (
            <div key={i} className="relative">
              <img
                src={img.url}
                className="w-24 h-24 object-cover rounded-lg border"
              />
              <button
                type="button"
                onClick={() => setImages(images.filter((_, x) => x !== i))}
                className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 text-xs flex items-center justify-center"
              >
                ✕
              </button>
            </div>
          ))}
        </div>
      </div>

      <button
        type="submit"
        disabled={loading}
        className="px-6 py-3 bg-blue-600 rounded-lg text-white font-semibold hover:bg-blue-700"
      >
        {loading ? "Saving..." : "Save Product"}
      </button>
    </form>

    {/* Toast */}
    {toast.show && (
      <div className={`fixed bottom-4 right-4 px-4 py-3 rounded-lg text-white shadow-lg
          ${toast.type === "success" ? "bg-green-500" : "bg-red-500"}
        `}
      >
        {toast.message}
      </div>
    )}
  </div>
);

}
