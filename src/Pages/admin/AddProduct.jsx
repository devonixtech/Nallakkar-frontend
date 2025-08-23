import { useState } from "react";
import { Link } from "react-router-dom";

export default function AddProduct() {
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
    slug: "",
    fabric: "",
    pattern: "",
    netQuantity: "",
    countryOfOrigin: "",
    packageType: "",
    estimatedDelivery: "",
    metaTitle: "",
    metaDescription: "",
    keywords: "",
  });

  const [images, setImages] = useState([]); // removed TypeScript types
  const [selectedSizes, setSelectedSizes] = useState([]);
  const [customVariants, setCustomVariants] = useState([
    { type: "", value: "" },
  ]);
  const [showToast, setShowToast] = useState({
    show: false,
    message: "",
    type: "success",
  });
  const [errors, setErrors] = useState({});

  const categories = [
    {
      id: "clothing",
      name: "Clothing",
      subcategories: ["T-Shirts", "Shirts", "Pants", "Dresses", "Jackets"],
    },
    {
      id: "electronics",
      name: "Electronics",
      subcategories: ["Phones", "Laptops", "Headphones", "Accessories"],
    },
    {
      id: "home",
      name: "Home & Garden",
      subcategories: ["Furniture", "Decor", "Kitchen", "Bedding"],
    },
    {
      id: "sports",
      name: "Sports",
      subcategories: ["Fitness", "Outdoor", "Team Sports", "Equipment"],
    },
  ];

  const sizes = ["XS", "S", "M", "L", "XL", "XXL", "XXXL"];

  const generateSlug = (title) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
      ...(name === "title" && { slug: generateSlug(value) }),
    }));

    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleStatusToggle = () => {
    setFormData((prev) => ({
      ...prev,
      status: prev.status === "active" ? "inactive" : "active",
    }));
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files || []);
    files.forEach((file) => {
      const reader = new FileReader();
      reader.onload = (event) => {
        setImages((prev) => [
          ...prev,
          {
            file,
            url: event.target?.result,
            isMain: prev.length === 0,
          },
        ]);
      };
      reader.readAsDataURL(file);
    });
  };

  const setMainImage = (index) => {
    setImages((prev) =>
      prev.map((img, i) => ({ ...img, isMain: i === index }))
    );
  };

  const removeImage = (index) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSizeChange = (size) => {
    setSelectedSizes((prev) =>
      prev.includes(size) ? prev.filter((s) => s !== size) : [...prev, size]
    );
  };

  const addCustomVariant = () => {
    setCustomVariants((prev) => [...prev, { type: "", value: "" }]);
  };

  const updateCustomVariant = (index, field, value) => {
    setCustomVariants((prev) =>
      prev.map((variant, i) =>
        i === index ? { ...variant, [field]: value } : variant
      )
    );
  };

  const removeCustomVariant = (index) => {
    setCustomVariants((prev) => prev.filter((_, i) => i !== index));
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.title.trim()) newErrors.title = "Product title is required";
    if (!formData.category) newErrors.category = "Category is required";
    if (!formData.price) newErrors.price = "Price is required";
    if (!formData.stock) newErrors.stock = "Stock quantity is required";
    if (!formData.description.trim())
      newErrors.description = "Product description is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const showToastMessage = (message, type = "success") => {
    setShowToast({ show: true, message, type });
    setTimeout(
      () => setShowToast({ show: false, message: "", type: "success" }),
      3000
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateForm()) {
      showToastMessage("Please fill in all required fields", "error");
      return;
    }

    console.log("Product Data:", formData);
    console.log("Images:", images);
    console.log("Sizes:", selectedSizes);
    console.log("Custom Variants:", customVariants);

    showToastMessage("Product saved successfully!");
  };

  const selectedCategory = categories.find(
    (cat) => cat.id === formData.category
  );

  return (
    <>
      {showToast.show && (
        <div
          className={`fixed top-4 right-4 z-50 px-6 py-3 rounded-lg shadow-lg ${
            showToast.type === "success" ? "bg-green-500" : "bg-red-500"
          } text-white`}
        >
          <div className="flex items-center">
            <i
              className={`${
                showToast.type === "success"
                  ? "ri-check-line"
                  : "ri-error-warning-line"
              } mr-2`}
            ></i>
            {showToast.message}
          </div>
        </div>
      )}

      <div className="space-y-6">
        {/* Breadcrumbs */}
        <nav className="flex text-sm text-gray-600">
          <Link to="/admin/dashboard" className="hover:text-gray-900">
            Home
          </Link>
          <i className="ri-arrow-right-s-line mx-2"></i>
          <Link href="/admin/products" className="hover:text-gray-900">
            Products
          </Link>
          <i className="ri-arrow-right-s-line mx-2"></i>
          <span className="text-gray-900">Add Product</span>
        </nav>

        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">
              Add New Product
            </h2>
            <p className="text-gray-600">Create a new product for your store</p>
          </div>
          <Link
            to="/admin/products"
            className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors flex items-center whitespace-nowrap cursor-pointer"
          >
            <i className="ri-arrow-left-line mr-2"></i>
            Back to Products
          </Link>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left Column - Main Content */}
            <div className="lg:col-span-2 space-y-6">
              {/* Basic Information */}
              <div className="bg-white rounded-lg border border-gray-200 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Basic Information
                </h3>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Product Title <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="title"
                      value={formData.title}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm ${
                        errors.title ? "border-red-300" : "border-gray-300"
                      }`}
                      placeholder="Enter product title"
                    />
                    {errors.title && (
                      <p className="text-red-500 text-xs mt-1">
                        {errors.title}
                      </p>
                    )}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Category <span className="text-red-500">*</span>
                      </label>
                      <select
                        name="category"
                        value={formData.category}
                        onChange={handleInputChange}
                        className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm pr-8 ${
                          errors.category ? "border-red-300" : "border-gray-300"
                        }`}
                      >
                        <option value="">Select Category</option>
                        {categories.map((category) => (
                          <option key={category.id} value={category.id}>
                            {category.name}
                          </option>
                        ))}
                      </select>
                      {errors.category && (
                        <p className="text-red-500 text-xs mt-1">
                          {errors.category}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Subcategory
                      </label>
                      <select
                        name="subcategory"
                        value={formData.subcategory}
                        onChange={handleInputChange}
                        disabled={!formData.category}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm pr-8 disabled:bg-gray-100"
                      >
                        <option value="">Select Subcategory</option>
                        {selectedCategory?.subcategories.map((sub) => (
                          <option key={sub} value={sub}>
                            {sub}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Price (₹) <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="number"
                        name="price"
                        value={formData.price}
                        onChange={handleInputChange}
                        step="0.01"
                        min="0"
                        className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm ${
                          errors.price ? "border-red-300" : "border-gray-300"
                        }`}
                        placeholder="0.00"
                      />
                      {errors.price && (
                        <p className="text-red-500 text-xs mt-1">
                          {errors.price}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Discount Price (₹)
                      </label>
                      <input
                        type="number"
                        name="discountPrice"
                        value={formData.discountPrice}
                        onChange={handleInputChange}
                        step="0.01"
                        min="0"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                        placeholder="0.00"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Stock Quantity <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="number"
                        name="stock"
                        value={formData.stock}
                        onChange={handleInputChange}
                        min="0"
                        className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm ${
                          errors.stock ? "border-red-300" : "border-gray-300"
                        }`}
                        placeholder="0"
                      />
                      {errors.stock && (
                        <p className="text-red-500 text-xs mt-1">
                          {errors.stock}
                        </p>
                      )}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Status
                    </label>
                    <div className="flex items-center">
                      <button
                        type="button"
                        onClick={handleStatusToggle}
                        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 cursor-pointer ${
                          formData.status === "active"
                            ? "bg-blue-600"
                            : "bg-gray-200"
                        }`}
                      >
                        <span
                          className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${
                            formData.status === "active"
                              ? "translate-x-6"
                              : "translate-x-1"
                          }`}
                        />
                      </button>
                      <span className="ml-3 text-sm text-gray-700">
                        {formData.status === "active" ? "Active" : "Inactive"}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Product Description */}
              <div className="bg-white rounded-lg border border-gray-200 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Product Description
                </h3>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Short Description
                    </label>
                    <input
                      type="text"
                      name="shortDescription"
                      value={formData.shortDescription}
                      onChange={handleInputChange}
                      maxLength={150}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                      placeholder="Brief product summary"
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      {formData.shortDescription.length}/150 characters
                    </p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Long Description <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      name="description"
                      value={formData.description}
                      onChange={handleInputChange}
                      rows={6}
                      maxLength={1000}
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm resize-none ${
                        errors.description
                          ? "border-red-300"
                          : "border-gray-300"
                      }`}
                      placeholder="Detailed product description, features, benefits..."
                    />
                    {errors.description && (
                      <p className="text-red-500 text-xs mt-1">
                        {errors.description}
                      </p>
                    )}
                    <p className="text-xs text-gray-500 mt-1">
                      {formData.description.length}/1000 characters
                    </p>
                  </div>
                </div>
              </div>

              {/* Variants & Sizes */}
              <div className="bg-white rounded-lg border border-gray-200 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Variants & Sizes
                </h3>

                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-3">
                      Available Sizes
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {sizes.map((size) => (
                        <label
                          key={size}
                          className="flex items-center cursor-pointer"
                        >
                          <input
                            type="checkbox"
                            checked={selectedSizes.includes(size)}
                            onChange={() => handleSizeChange(size)}
                            className="sr-only"
                          />
                          <div
                            className={`px-4 py-2 rounded-lg border-2 transition-colors ${
                              selectedSizes.includes(size)
                                ? "border-blue-500 bg-blue-50 text-blue-700"
                                : "border-gray-300 text-gray-700 hover:border-gray-400"
                            }`}
                          >
                            {size}
                          </div>
                        </label>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-3">
                      Custom Variants
                    </label>
                    {customVariants.map((variant, index) => (
                      <div key={index} className="flex items-center gap-3 mb-3">
                        <input
                          type="text"
                          placeholder="Type (e.g., Color)"
                          value={variant.type}
                          onChange={(e) =>
                            updateCustomVariant(index, "type", e.target.value)
                          }
                          className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                        />
                        <input
                          type="text"
                          placeholder="Value (e.g., Red)"
                          value={variant.value}
                          onChange={(e) =>
                            updateCustomVariant(index, "value", e.target.value)
                          }
                          className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                        />
                        {customVariants.length > 1 && (
                          <button
                            type="button"
                            onClick={() => removeCustomVariant(index)}
                            className="w-8 h-8 flex items-center justify-center text-red-500 hover:text-red-700 cursor-pointer"
                          >
                            <i className="ri-delete-bin-line"></i>
                          </button>
                        )}
                      </div>
                    ))}
                    <button
                      type="button"
                      onClick={addCustomVariant}
                      className="text-blue-600 hover:text-blue-700 text-sm font-medium cursor-pointer"
                    >
                      <i className="ri-add-line mr-1"></i>
                      Add Custom Variant
                    </button>
                  </div>
                </div>
              </div>

              {/* Additional Details */}
              <div className="bg-white rounded-lg border border-gray-200 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Additional Details
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Fabric/Material
                    </label>
                    <input
                      type="text"
                      name="fabric"
                      value={formData.fabric}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                      placeholder="Cotton, Polyester, etc."
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Pattern/Style
                    </label>
                    <input
                      type="text"
                      name="pattern"
                      value={formData.pattern}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                      placeholder="Solid, Striped, etc."
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Net Quantity
                    </label>
                    <input
                      type="text"
                      name="netQuantity"
                      value={formData.netQuantity}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                      placeholder="1 piece, 100ml, etc."
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Country of Origin
                    </label>
                    <input
                      type="text"
                      name="countryOfOrigin"
                      value={formData.countryOfOrigin}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                      placeholder="India, China, etc."
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Package Type
                    </label>
                    <select
                      name="packageType"
                      value={formData.packageType}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm pr-8"
                    >
                      <option value="">Select Package Type</option>
                      <option value="box">Box</option>
                      <option value="bag">Bag</option>
                      <option value="envelope">Envelope</option>
                      <option value="tube">Tube</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Estimated Delivery (days)
                    </label>
                    <input
                      type="number"
                      name="estimatedDelivery"
                      value={formData.estimatedDelivery}
                      onChange={handleInputChange}
                      min="1"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                      placeholder="7"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column - Sidebar */}
            <div className="space-y-6">
              {/* Product Images */}
              <div className="bg-white rounded-lg border border-gray-200 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Product Images
                </h3>

                <div className="space-y-4">
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-gray-400 transition-colors">
                    <i className="ri-image-add-line text-3xl text-gray-400 mb-2"></i>
                    <p className="text-sm text-gray-500 mb-2">
                      Drag & drop images or click to upload
                    </p>
                    <p className="text-xs text-gray-400 mb-3">
                      PNG, JPG up to 5MB each
                    </p>
                    <input
                      type="file"
                      multiple
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                      id="image-upload"
                    />
                    <label
                      htmlFor="image-upload"
                      className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors cursor-pointer text-sm"
                    >
                      Choose Files
                    </label>
                  </div>

                  {images.length > 0 && (
                    <div className="space-y-3">
                      <p className="text-sm font-medium text-gray-700">
                        Uploaded Images
                      </p>
                      {images.map((image, index) => (
                        <div
                          key={index}
                          className="relative border border-gray-200 rounded-lg p-3"
                        >
                          <div className="flex items-center space-x-3">
                            <img
                              src={image.url}
                              alt={`Product ${index + 1}`}
                              className="w-12 h-12 object-cover object-top rounded-lg"
                            />
                            <div className="flex-1">
                              <div className="flex items-center space-x-2">
                                <button
                                  type="button"
                                  onClick={() => setMainImage(index)}
                                  className={`px-2 py-1 rounded text-xs font-medium cursor-pointer ${
                                    image.isMain
                                      ? "bg-green-100 text-green-700"
                                      : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                                  }`}
                                >
                                  {image.isMain ? "Main" : "Set as Main"}
                                </button>
                                <button
                                  type="button"
                                  onClick={() => removeImage(index)}
                                  className="w-6 h-6 flex items-center justify-center text-red-500 hover:text-red-700 cursor-pointer"
                                >
                                  <i className="ri-delete-bin-line text-xs"></i>
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* SEO & Meta Information */}
              <div className="bg-white rounded-lg border border-gray-200 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  SEO & Meta Information
                </h3>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      URL Slug
                    </label>
                    <input
                      type="text"
                      name="slug"
                      value={formData.slug}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                      placeholder="auto-generated-from-title"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Meta Title
                    </label>
                    <input
                      type="text"
                      name="metaTitle"
                      value={formData.metaTitle}
                      onChange={handleInputChange}
                      maxLength={60}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                      placeholder="SEO title"
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      {formData.metaTitle.length}/60 characters
                    </p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Meta Description
                    </label>
                    <textarea
                      name="metaDescription"
                      value={formData.metaDescription}
                      onChange={handleInputChange}
                      rows={3}
                      maxLength={160}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm resize-none"
                      placeholder="SEO description"
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      {formData.metaDescription.length}/160 characters
                    </p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Keywords
                    </label>
                    <input
                      type="text"
                      name="keywords"
                      value={formData.keywords}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                      placeholder="keyword1, keyword2, keyword3"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center justify-end space-x-4 bg-white p-6 rounded-lg border border-gray-200">
            <Link
              to="/admin/products"
              className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors whitespace-nowrap cursor-pointer"
            >
              <i className="ri-close-line mr-2"></i>
              Cancel
            </Link>
            <button
              type="button"
              className="px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors whitespace-nowrap cursor-pointer"
            >
              <i className="ri-draft-line mr-2"></i>
              Save as Draft
            </button>
            <button
              type="submit"
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors whitespace-nowrap cursor-pointer"
            >
              <i className="ri-save-line mr-2"></i>
              Save Product
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
