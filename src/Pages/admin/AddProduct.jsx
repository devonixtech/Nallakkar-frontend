 import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { createProduct } from "../../Redux/slices/productSlice"; // make sure this thunk exists
import { fetchAllCategories } from "../../Redux/slices/categorySlice";
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
  });

  const [images, setImages] = useState([]);
  const [customVariants, setCustomVariants] = useState([{ type: "", value: "" }]);
  const [errors, setErrors] = useState({});
  const [toast, setToast] = useState({ show: false, type: "success", message: "" });
   
  // Fetch categories and subcategories on mount
  useEffect(() => {
    dispatch(fetchAllCategories());
  }, [dispatch]);
 const categories = useSelector((state) => state?.ctegory?.categories);
  // ---------- dummy data ----------
  // Replace with actual categories from Redux store
  // and fetch subcategories based on selected category
  // const categories = [
  //   { id: 1, name: "Clothing", subcategories: ["T-Shirts", "Shirts", "Pants"] },
  //   { id: 2, name: "Electronics", subcategories: ["Phones", "Laptops"] },
  // ];

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

    // Images
    images.forEach((img) => {
      form.append("image", img.file);
    });

    await dispatch(createProduct(form)).unwrap();
    showToast("Product created successfully");
    // navigate("/admin/products");
  } catch (err) {
    console.error("Error creating product:", err);
    showToast("Failed to create product", "error");
  }
};


  return (
    <div className="p-4 max-w-3xl mx-auto">
      <h2 className="text-xl font-bold mb-4">Add Product</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="title"
          placeholder="Product Name"
          value={formData.title}
          onChange={handleChange}
          className="w-full border p-2"
        />
        {errors.title && <p className="text-red-500">{errors.title}</p>}

      <select
  name="category"
  value={formData.category}
  onChange={(e) => {
    handleChange(e);
    setFormData((prev) => ({ ...prev, subcategory: "" }));  
  }}
  className="w-full border p-2"
>
  <option value="">Select Category</option>
  {categories?.map((c) => (
    <option key={c.id} value={c.id}>
      {c.name}
    </option>
  ))}
</select>
{errors.category && <p className="text-red-500">{errors.category}</p>}

<select
  name="subcategory"
  value={formData.subcategory}
  onChange={handleChange}
  className="w-full border p-2"
  disabled={!formData.category} // disable until category is chosen
>
  <option value="">Select Subcategory</option>
  {categories
    ?.find((c) => c.id === Number(formData.category))
    ?.subcategories?.map((sub) => (
      <option key={sub.id} value={sub.id}>
        {sub.name}
      </option>
    ))}
</select>


        <input
          type="number"
          name="price"
          placeholder="Price"
          value={formData.price}
          onChange={handleChange}
          className="w-full border p-2"
        />
        <input
          type="number"
          name="discountPrice"
          placeholder="Discount (%)"
          value={formData.discountPrice}
          onChange={handleChange}
          className="w-full border p-2"
        />
        <input
          type="number"
          name="stock"
          placeholder="Stock"
          value={formData.stock}
          onChange={handleChange}
          className="w-full border p-2"
        />
        <textarea
          name="description"
          placeholder="Description"
          value={formData.description}
          onChange={handleChange}
          className="w-full border p-2"
        />
        <textarea
          name="shortDescription"
          placeholder="Short Description"
          value={formData.shortDescription}
          onChange={handleChange}
          className="w-full border p-2"
        />
 {/* ✅ New Fields */}
        <div className="grid grid-cols-2 gap-2">
          <input
            type="number"
            name="length"
            placeholder="Length (cm)"
            value={formData.length}
            onChange={handleChange}
            className="border p-2"
          />
          <input
            type="number"
            name="breadth"
            placeholder="Breadth (cm)"
            value={formData.breadth}
            onChange={handleChange}
            className="border p-2"
          />
          <input
            type="number"
            name="height"
            placeholder="Height (cm)"
            value={formData.height}
            onChange={handleChange}
            className="border p-2"
          />
          <input
            type="number"
            name="weight"
            placeholder="Weight (kg)"
            value={formData.weight}
            onChange={handleChange}
            className="border p-2"
          />
        </div>
        {/* Variants */}
        <div>
          <h3 className="font-semibold mb-2">Variants</h3>
           {customVariants.map((variant, index) => (
  <div key={index} className="mb-4">
    <input
      type="text"
      placeholder="Type (e.g. Color)"
      value={variant.type}
      onChange={(e) => {
        const updated = [...customVariants];
        updated[index].type = e.target.value;
        setCustomVariants(updated);
      }}
      className="border p-2 w-full mb-2"
    />
    <input
      type="text"
      placeholder="Values (comma separated e.g. L, XL, 2XL)"
      value={variant.value}
      onChange={(e) => {
        const updated = [...customVariants];
        updated[index].value = e.target.value;
        setCustomVariants(updated);
      }}
      className="border p-2 w-full"
    />
  </div>
  
  
))}

          <button
            type="button"
            onClick={() => setCustomVariants([...customVariants, { type: "", value: "" }])}
            className="px-3 py-1 bg-gray-200 rounded"
          >
            + Add Variant
          </button>
        </div>

        {/* Image Upload */}
       {/* Image Upload */}
<div>
  <input type="file" multiple onChange={handleImageUpload} />
  <div className="flex gap-2 mt-2 flex-wrap">
    {images.map((img, i) => (
      <div key={i} className="relative">
        <img
          src={img.url}
          alt="preview"
          className="w-20 h-20 object-cover rounded"
        />
        <button
          type="button"
          onClick={() => setImages(images.filter((_, index) => index !== i))}
          className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs"
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
          className="px-4 py-2 bg-blue-500 text-white rounded"
        >
          {loading ? "Saving..." : "Save Product"}
        </button>
      </form>

      {toast.show && (
        <div
          className={`fixed bottom-4 right-4 p-3 rounded text-white ${
            toast.type === "success" ? "bg-green-500" : "bg-red-500"
          }`}
        >
          {toast.message}
        </div>
      )}
    </div>
  );
}
