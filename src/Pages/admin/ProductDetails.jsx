import { useState } from "react";
import { Link } from "react-router-dom";

export default function ProductDetails({ productId }) {
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [productStatus, setProductStatus] = useState("active");
  const [selectedSize, setSelectedSize] = useState("M");

  // Mock product data based on ID
  const getProductData = (id) => {
    const products = {
      "1": {
        id: 1,
        name: "Wireless Bluetooth Headphones",
        category: "Electronics",
        subcategory: "Audio Devices",
        price: 299.99,
        comparePrice: 399.99,
        stock: 45,
        status: "active",
        sku: "WBH-2024-001",
        rating: 4.8,
        reviewCount: 256,
        description:
          "Premium wireless Bluetooth headphones with active noise cancellation, 30-hour battery life, and studio-quality sound. Perfect for music lovers, professionals, and gamers who demand the best audio experience.",
        specifications: [
          { label: "Battery Life", value: "30 hours" },
          { label: "Connectivity", value: "Bluetooth 5.0" },
          { label: "Weight", value: "250g" },
          { label: "Charging", value: "USB-C Fast Charge" },
          { label: "Noise Cancellation", value: "Active ANC" },
        ],
        images: [
          "https://readdy.ai/api/search-image?query=premium%20wireless%20bluetooth%20headphones%20black%20sleek%20design%20studio%20lighting%20white%20background%20product%20photography%20high%20quality%20detailed%20view&width=600&height=600&seq=prod1main&orientation=squarish",
          "https://readdy.ai/api/search-image?query=wireless%20bluetooth%20headphones%20side%20profile%20view%20black%20premium%20design%20white%20background%20product%20photography%20studio%20lighting&width=600&height=600&seq=prod1side&orientation=squarish",
          "https://readdy.ai/api/search-image?query=bluetooth%20headphones%20charging%20case%20accessories%20white%20background%20product%20photography%20studio%20lighting%20premium%20design&width=600&height=600&seq=prod1acc&orientation=squarish",
          "https://readdy.ai/api/search-image?query=wireless%20headphones%20controls%20buttons%20detail%20close%20up%20white%20background%20product%20photography%20studio%20lighting&width=600&height=600&seq=prod1detail&orientation=squarish",
        ],
        sizes: ["S", "M", "L", "XL"],
        colors: ["Black", "White", "Gray"],
        deliveryOptions: [
          { type: "Standard", time: "5-7 business days", price: 9.99 },
          { type: "Express", time: "2-3 business days", price: 19.99 },
          { type: "Overnight", time: "1 business day", price: 39.99 },
        ],
        offers: [
          "10% off on orders over $200",
          "Free shipping on orders over $150",
          "30-day money back guarantee",
        ],
      },
    };

    // Return product if found, otherwise fallback to first product
    return products[id] ?? products["1"];
  };

  const product = getProductData(productId);

  const toggleStatus = () => {
    setProductStatus(productStatus === "active" ? "inactive" : "active");
  };

  const getStatusColor = (status) => {
    return status === "active"
      ? "bg-green-100 text-green-800"
      : "bg-red-100 text-red-800";
  };

  const reviews = [
    {
      id: 1,
      user: "Sarah Johnson",
      rating: 5,
      date: "2024-01-15",
      comment:
        "Exceptional sound quality and comfort. The noise cancellation works perfectly for my daily commute.",
      verified: true,
    },
    {
      id: 2,
      user: "Mike Chen",
      rating: 5,
      date: "2024-01-10",
      comment:
        "Battery life is amazing! I can use them for days without charging. Great build quality.",
      verified: true,
    },
    {
      id: 3,
      user: "Emma Davis",
      rating: 4,
      date: "2024-01-08",
      comment:
        "Very comfortable for long listening sessions. Sound is crystal clear with great bass.",
      verified: true,
    },
  ];

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <i
        key={i}
        className={`ri-star-${
          i < Math.floor(rating) ? "fill" : "line"
        } text-yellow-400`}
      ></i>
    ));
  };

  return (
    <>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-semibold text-gray-900">
              Product Details
            </h2>
            <p className="text-gray-600">View and manage product information</p>
          </div>
          <div className="flex items-center space-x-3">
            <Link
              to={`/admin/products/edit/${productId}`}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center whitespace-nowrap cursor-pointer"
            >
              <i className="ri-edit-line mr-2"></i>
              Edit Product
            </Link>
            <Link
              to="/admin/products"
              className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors flex items-center whitespace-nowrap cursor-pointer"
            >
              <i className="ri-arrow-left-line mr-2"></i>
              Back to Products
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="space-y-6">
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Product Images
              </h3>

              <div className="space-y-4">
                <div className="aspect-square bg-gray-50 rounded-lg overflow-hidden">
                  <img
                    src={product.images[activeImageIndex]}
                    alt={product.name}
                    className="w-full h-full object-cover object-top"
                  />
                </div>

                <div className="grid grid-cols-4 gap-2">
                  {product.images.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setActiveImageIndex(index)}
                      className={`aspect-square rounded-lg overflow-hidden border-2 cursor-pointer transition-colors ${
                        activeImageIndex === index
                          ? "border-blue-500"
                          : "border-gray-200 hover:border-gray-300"
                      }`}
                    >
                      <img
                        src={image}
                        alt={`${product.name} ${index + 1}`}
                        className="w-full h-full object-cover object-top"
                      />
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Description & Specifications
              </h3>

              <div className="space-y-4">
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">
                    Product Description
                  </h4>
                  <p className="text-gray-600 leading-relaxed">
                    {product.description}
                  </p>
                </div>

                <div>
                  <h4 className="font-medium text-gray-900 mb-3">
                    Specifications
                  </h4>
                  <div className="space-y-2">
                    {product.specifications.map((spec, index) => (
                      <div
                        key={index}
                        className="flex justify-between items-center py-2 border-b border-gray-100 last:border-b-0"
                      >
                        <span className="text-gray-600">{spec.label}</span>
                        <span className="font-medium text-gray-900">
                          {spec.value}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Product Information
              </h3>

              <div className="space-y-4">
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">
                    {product.name}
                  </h1>
                  <p className="text-gray-600 mt-1">SKU: {product.sku}</p>
                </div>

                <div className="flex items-center space-x-4">
                  <span className="text-gray-600">Category:</span>
                  <span className="font-medium text-gray-900">
                    {product.category}
                  </span>
                  <span className="text-gray-400">&gt;</span>
                  <span className="font-medium text-gray-900">
                    {product.subcategory}
                  </span>
                </div>

                <div className="flex items-center space-x-4">
                  <div className="flex items-baseline space-x-2">
                    <span className="text-3xl font-bold text-gray-900">
                      ${product.price}
                    </span>
                    <span className="text-lg text-gray-500 line-through">
                      ${product.comparePrice}
                    </span>
                  </div>
                  <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-sm font-medium">
                    {Math.round(
                      ((product.comparePrice - product.price) /
                        product.comparePrice) *
                        100
                    )}
                    % OFF
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-gray-600">Stock: </span>
                    <span className="font-medium text-gray-900">
                      {product.stock} units
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-gray-600">Status:</span>
                    <button
                      onClick={toggleStatus}
                      className={`px-3 py-1 rounded-full text-sm font-medium cursor-pointer ${getStatusColor(
                        productStatus
                      )}`}
                    >
                      {productStatus === "active" ? "Active" : "Inactive"}
                    </button>
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <div className="flex items-center">
                    {renderStars(product.rating)}
                  </div>
                  <span className="font-medium text-gray-900">
                    {product.rating}
                  </span>
                  <span className="text-gray-500">
                    ({product.reviewCount} reviews)
                  </span>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Available Sizes
              </h3>

              <div className="grid grid-cols-5 gap-2">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`py-2 px-3 border rounded-lg text-sm font-medium cursor-pointer transition-colors ${
                      selectedSize === size
                        ? "border-blue-500 bg-blue-50 text-blue-700"
                        : "border-gray-300 text-gray-700 hover:border-gray-400"
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Delivery Options
              </h3>

              <div className="space-y-3">
                {product.deliveryOptions.map((option, index) => (
                  <div
                    key={index}
                    className="flex justify-between items-center p-3 border border-gray-200 rounded-lg"
                  >
                    <div>
                      <h4 className="font-medium text-gray-900">
                        {option.type} Delivery
                      </h4>
                      <p className="text-sm text-gray-600">{option.time}</p>
                    </div>
                    <span className="font-medium text-gray-900">
                      ${option.price}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Special Offers
              </h3>

              <div className="space-y-2">
                {product.offers.map((offer, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <i className="ri-checkbox-circle-fill text-green-500 w-4 h-4 flex items-center justify-center"></i>
                    <span className="text-gray-700">{offer}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Customer Reviews
          </h3>

          <div className="space-y-4">
            <div className="flex items-center space-x-4 pb-4 border-b border-gray-200">
              <div className="flex items-center space-x-2">
                <div className="flex items-center">
                  {renderStars(product.rating)}
                </div>
                <span className="text-2xl font-bold text-gray-900">
                  {product.rating}
                </span>
              </div>
              <div className="text-gray-600">
                <span className="font-medium">{product.reviewCount}</span> total
                reviews
              </div>
            </div>

            <div className="space-y-4">
              {reviews.map((review) => (
                <div
                  key={review.id}
                  className="border-b border-gray-200 pb-4 last:border-b-0"
                >
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <div className="flex items-center space-x-2">
                        <h4 className="font-medium text-gray-900">
                          {review.user}
                        </h4>
                        {review.verified && (
                          <span className="bg-green-100 text-green-800 text-xs px-2 py-0.5 rounded-full">
                            Verified Purchase
                          </span>
                        )}
                      </div>
                      <div className="flex items-center space-x-2 mt-1">
                        <div className="flex items-center">
                          {renderStars(review.rating)}
                        </div>
                        <span className="text-sm text-gray-500">
                          {review.date}
                        </span>
                      </div>
                    </div>
                  </div>
                  <p className="text-gray-700">{review.comment}</p>
                </div>
              ))}
            </div>

            <button className="w-full py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors cursor-pointer">
              Load More Reviews
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
