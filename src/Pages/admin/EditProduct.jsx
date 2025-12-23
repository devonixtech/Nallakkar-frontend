import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";

import {
  fetchProductById,
  updateProduct
} from "../../Redux/slices/productSlice";

import { fetchAllCategories } from "../../Redux/slices/categorySlice";

export default function EditProduct() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // NOTE: your slice uses product (not singleProduct)
  const { producData, loading } = useSelector((s) => s.products);
 const product = useSelector((s) => s?.products?.productData?.data);
//   const categories = useSelector((s) => s.category?.categories);
  const categories = useSelector((state) => state?.ctegory?.categories);

  console.log("p",product)
  const [formData, setFormData] = useState({
    title: "",
    category: "",
    subcategory: "",
    price: "",
    discountPrice: "",
    stock: "",
    status: "1",
    description: "",
    shortDescription: "",
    reviewCount: "",
    rating: "",
    length: "",
    breadth: "",
    height: "",
    weight: "",
  });

  const [existingImages, setExistingImages] = useState([]); // URLs
  const [newImages, setNewImages] = useState([]); // File objects

  const [customVariants, setCustomVariants] = useState([{ type: "", value: "" }]);
  const [extraFields, setExtraFields] = useState({
  field1: { key: "", value: "" },
  field2: { key: "", value: "" },
  field3: { key: "", value: "" },
  field4: { key: "", value: "" },
});

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (id) dispatch(fetchProductById(id));
    dispatch(fetchAllCategories());
  }, [dispatch, id]);

  // populate form after product loads
  useEffect(() => {
    if (!product) return;

    setFormData({
      title: product.name || "",
      category: product.categoryId ?? "",
      subcategory: product.subCategoryId ?? "",
      price: product.price ?? "",
      discountPrice: product.discount ?? "",
      stock: product.stock ?? "",
      status: product.status ? String(product.status) : "1",
      description: product.description ?? "",
      shortDescription: product.description2 ?? "",
      length: product.length ?? "",
      breadth: product.breadth ?? "",
      height: product.height ?? "",
      weight: product.weight ?? "",
      reviewCount: product.reviewCount ?? "",
      rating: product.rating ?? "",
    });

    setExistingImages(product.image || []);

    if (product.variants && typeof product.variants === "object") {
      const vArr = Object.entries(product.variants).map(([type, values]) => ({
        type,
        value: Array.isArray(values) ? values.join(", ") : String(values),
      }));
      setCustomVariants(vArr.length ? vArr : [{ type: "", value: "" }]);
    } else {
      setCustomVariants([{ type: "", value: "" }]);
    }

  if (product.extraFields && typeof product.extraFields === "object") {
    setExtraFields({
      field1: product.extraFields.field1 || { key: "", value: "" },
      field2: product.extraFields.field2 || { key: "", value: "" },
      field3: product.extraFields.field3 || { key: "", value: "" },
      field4: product.extraFields.field4 || { key: "", value: "" },
    });
  }
  }, [product]);

  // generic input handler
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((p) => ({ ...p, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  // variants helpers
  const updateVariant = (index, field, value) => {
    setCustomVariants((prev) => prev.map((v, i) => (i === index ? { ...v, [field]: value } : v)));
  };
  const addVariant = () => setCustomVariants((p) => [...p, { type: "", value: "" }]);
  const removeVariant = (i) => setCustomVariants((p) => p.filter((_, idx) => idx !== i));
const handleExtraFieldChange = (field, type, value) => {
  setExtraFields((prev) => ({
    ...prev,
    [field]: {
      ...prev[field],
      [type]: value,
    },
  }));
};

  // image handlers
  const handleNewImageUpload = (e) => {
    const files = Array.from(e.target.files || []);
    setNewImages((prev) => [...prev, ...files]);
    // clear input value to allow re-upload same file if needed
    e.target.value = null;
  };

  const removeExistingImage = (idx) => {
    setExistingImages((prev) => prev.filter((_, i) => i !== idx));
  };

  const removeNewImage = (idx) => {
    setNewImages((prev) => prev.filter((_, i) => i !== idx));
  };

  const validate = () => {
    const errs = {};
    if (!formData.title.trim()) errs.title = "Product name is required";
    if (!formData.category) errs.category = "Category is required";
    if (!formData.price) errs.price = "Price is required";
    if (!formData.stock && formData.stock !== 0) errs.stock = "Stock is required";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

 const handleSubmit = async (e) => {
  e.preventDefault();
  if (!validate()) return;

  try {
    const form = new FormData();
    form.append("name", formData.title);
    form.append("price", formData.price);
    form.append("discount", formData.discountPrice || 0);
    form.append("description", formData.description || "");
    form.append("description2", formData.shortDescription || "");
    form.append("categoryId", formData.category || "");
    form.append("subCategoryId", formData.subcategory || "");
    form.append("stock", formData.stock || 0);
    form.append("status", formData.status || "1");
    form.append("reviewCount", formData.reviewCount || "");
    form.append("rating", formData.rating || "");
    form.append("length", formData.length || "");
    form.append("breadth", formData.breadth || "");
    form.append("height", formData.height || "");
    form.append("weight", formData.weight || "");

    const variantsToSend = customVariants.reduce((acc, v) => {
      if (v.type && v.value) {
        acc[v.type] = v.value.split(",").map((val) => val.trim());
      }
      return acc;
    }, {});
    form.append("variants", JSON.stringify(variantsToSend));
    // Clean extraFields
const cleanedExtraFields = Object.fromEntries(
  Object.entries(extraFields).filter(
    ([_, v]) => v.key.trim() && v.value.trim()
  )
);

form.append("extraFields", JSON.stringify(cleanedExtraFields));


    // ❌ REMOVE THIS LINE (CAUSES CRASH)
    // form.append("existingImages", JSON.stringify(existingImages));

    newImages.forEach((file) => form.append("image", file));

    await dispatch(updateProduct({ id, data: form })).unwrap();

    alert("Product updated successfully");
    navigate("/admin/products");
  } catch (err) {
    console.error("Update error:", err);
    alert("Failed to update product");
  }
};


   
  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">Edit Product</h2>

      <form onSubmit={handleSubmit} className="space-y-8 bg-white p-6 rounded-2xl shadow-sm border border-gray-200">
        {/* PRODUCT DETAILS */}
        <div>
          <h3 className="text-lg font-semibold mb-3 text-gray-800">Product Details</h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="col-span-2">
              <label className="block text-sm font-medium text-gray-600 mb-1">Product Name</label>
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

            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">Category</label>
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
    <option key={c.id} value={c.id}>
      {c.name}
    </option>
  ))}
</select>

              {errors.category && <p className="text-red-500 text-sm">{errors.category}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">Subcategory</label>
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
      <option key={sub.id} value={sub.id}>
        {sub.name}
      </option>
    ))}
</select>

            </div>

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
              {errors.price && <p className="text-red-500 text-sm">{errors.price}</p>}
            </div>

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
              {errors.stock && <p className="text-red-500 text-sm">{errors.stock}</p>}
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
            {["length", "breadth", "height", "weight"].map((f) => (
              <input
                key={f}
                type="number"
                name={f}
                placeholder={`${f.charAt(0).toUpperCase() + f.slice(1)} ${f === "weight" ? "(kg)" : "(cm)"}`}
                value={formData[f] ?? ""}
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
            <div key={index} className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-3 items-center">
              <input
                type="text"
                placeholder="Type (e.g. Color)"
                value={variant.type}
                onChange={(e) => updateVariant(index, "type", e.target.value)}
                className="border rounded-lg p-3"
              />
              <input
                type="text"
                placeholder="Values (comma separated)"
                value={variant.value}
                onChange={(e) => updateVariant(index, "value", e.target.value)}
                className="border rounded-lg p-3"
              />
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => removeVariant(index)}
                  className="px-3 py-2 bg-red-100 rounded"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}

          <button
            type="button"
            onClick={addVariant}
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
          <h3 className="text-lg font-semibold mb-3 text-gray-800">Existing Images</h3>
          <div className="flex gap-3 mt-3 flex-wrap">
            {existingImages.map((img, i) => (
              <div key={i} className="relative">
                <img src={img} className="w-24 h-24 object-cover rounded-lg border" alt={`img-${i}`} />
                <button
                  type="button"
                  onClick={() => removeExistingImage(i)}
                  className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 text-xs flex items-center justify-center"
                >
                  ✕
                </button>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-3 text-gray-800">Upload New Images</h3>
          <input type="file" multiple onChange={handleNewImageUpload} className="block" />
          <div className="flex gap-3 mt-3 flex-wrap">
            {newImages.map((img, i) => (
              <div key={i} className="relative">
                <img
                  src={URL.createObjectURL(img)}
                  className="w-24 h-24 object-cover rounded-lg border"
                  alt={`new-${i}`}
                />
                <button
                  type="button"
                  onClick={() => removeNewImage(i)}
                  className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 text-xs flex items-center justify-center"
                >
                  ✕
                </button>
              </div>
            ))}
          </div>
        </div>

        <div>
          <button
            type="submit"
            disabled={loading}
            className="px-6 py-3 bg-blue-600 rounded-lg text-white font-semibold hover:bg-blue-700"
          >
            {loading ? "Updating..." : "Update Product"}
          </button>
        </div>
      </form>
    </div>
  );
}
