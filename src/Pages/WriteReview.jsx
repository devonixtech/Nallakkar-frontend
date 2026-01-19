import React, { useState, useEffect } from "react";
import { FaArrowLeft, FaStar, FaTimes, FaCheckCircle } from "react-icons/fa";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchOrderByOrderId } from "../Redux/slices/ordersSlice";
import { addReview, fetchReviewsByProduct } from "../Redux/slices/reviewSlice";
import { markProductAsReviewed, rollbackProductReview } from "../Redux/slices/reviewedProductsSlice";
import { updateProductRating, updateProduct } from "../Redux/slices/productSlice";
import { toast } from "react-toastify";

const WriteReview = () => {
  const { orderId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Redux state
  const orderData = useSelector((state) => state?.orders?.orderData);
  const userId = localStorage.getItem("userId");

  // Get reviewed products from Redux
  const reviewedProductIds = useSelector(
    (state) => state?.reviewedProducts?.reviewedProducts[orderId]?.productIds || []
  );

  // State for each product's review
  const [productReviews, setProductReviews] = useState({});
  const [submittingProducts, setSubmittingProducts] = useState({});

  // Fetch order data on mount (no API call for reviewed products - using localStorage)
  useEffect(() => {
    if (orderId) {
      dispatch(fetchOrderByOrderId(orderId));
      // Reviewed products are already loaded from localStorage in Redux
    }
  }, [orderId, dispatch]);

  // Initialize review state for each product
  useEffect(() => {
    if (orderData?.order_details?.order_items) {
      const initialReviews = {};
      orderData.order_details.order_items.forEach((item) => {
        // Try different possible field names for product ID
        const productId = item.product_id || item.productId || item.id;
        console.log('Product item:', item); // Debug log
        console.log('Using productId:', productId); // Debug log

        if (productId) {
          initialReviews[productId] = {
            rating: 0,
            review: "",
            images: [],
            imagePreviews: [],
            hover: null,
          };
        }
      });
      setProductReviews(initialReviews);
    }
  }, [orderData]);

  // Handle rating change
  const handleRatingChange = (productId, rating) => {
    setProductReviews((prev) => ({
      ...prev,
      [productId]: { ...prev[productId], rating },
    }));
  };

  // Handle hover
  const handleHover = (productId, value) => {
    setProductReviews((prev) => ({
      ...prev,
      [productId]: { ...prev[productId], hover: value },
    }));
  };

  // Handle review text change
  const handleReviewChange = (productId, text) => {
    setProductReviews((prev) => ({
      ...prev,
      [productId]: { ...prev[productId], review: text },
    }));
  };

  // Handle image upload
  const handleImageChange = (productId, e) => {
    const files = Array.from(e.target.files);
    const currentImages = productReviews[productId]?.images || [];

    if (files.length + currentImages.length > 3) {
      toast.error("Maximum 3 images allowed per product");
      return;
    }

    // Create previews
    const newPreviews = files.map((file) => URL.createObjectURL(file));

    setProductReviews((prev) => ({
      ...prev,
      [productId]: {
        ...prev[productId],
        images: [...currentImages, ...files],
        imagePreviews: [
          ...(prev[productId]?.imagePreviews || []),
          ...newPreviews,
        ],
      },
    }));
  };

  // Remove image
  const handleRemoveImage = (productId, index) => {
    setProductReviews((prev) => {
      const updated = { ...prev[productId] };
      updated.images = updated.images.filter((_, i) => i !== index);
      updated.imagePreviews = updated.imagePreviews.filter((_, i) => i !== index);
      return { ...prev, [productId]: updated };
    });
  };

  // Submit individual product review
  const handleSubmitProductReview = async (productId) => {
    if (!userId) {
      toast.error("Please login to submit review");
      return;
    }

    const reviewData = productReviews[productId];

    if (!reviewData || reviewData.rating === 0) {
      toast.error("Please select a rating before submitting");
      return;
    }

    // Validate productId is not undefined
    if (!productId || productId === 'undefined') {
      toast.error("Invalid product ID. Please refresh and try again.");
      return;
    }

    // Set submitting state for this specific product
    setSubmittingProducts((prev) => ({ ...prev, [productId]: true }));

    // Optimistic update - mark as reviewed immediately
    dispatch(markProductAsReviewed({ orderId, productId }));

    try {
      const formData = new FormData();
      formData.append("userId", userId);
      formData.append("productId", String(productId));
      formData.append("rating", reviewData.rating);
      formData.append("review", reviewData.review || "");

      // Append images
      reviewData.images.forEach((image) => {
        formData.append("image", image);
      });

      const result = await dispatch(addReview(formData)).unwrap();

      toast.success("Review submitted successfully!");

      // Update product rating if stats are returned
      if (result?.data?.productStats) {
        dispatch(updateProductRating({
          productId: result.data.productStats.productId,
          avgRating: result.data.productStats.avgRating,
          reviewCount: result.data.productStats.reviewCount
        }));
      } else {
        // Fallback: Fetch reviews, calculate stats locally, and update backend
        try {
          // 1. Fetch updated reviews
          const reviewsResult = await dispatch(fetchReviewsByProduct(productId)).unwrap();

          let reviewsArray = [];
          if (Array.isArray(reviewsResult)) {
            reviewsArray = reviewsResult;
          } else if (reviewsResult?.data && Array.isArray(reviewsResult.data)) {
            reviewsArray = reviewsResult.data;
          } else if (reviewsResult?.reviews && Array.isArray(reviewsResult.reviews)) {
            // Correctly handle the response structure { message, reviews: [], stats }
            reviewsArray = reviewsResult.reviews;
          } else if (reviewsResult?.products && Array.isArray(reviewsResult.products)) {
            // In case it relies on some other structure
            reviewsArray = reviewsResult.products;
          }

          // 2. Calculate stats
          if (reviewsArray.length > 0) {
            const totalRating = reviewsArray.reduce((acc, curr) => acc + Number(curr.rating || 0), 0);
            const avgRating = (totalRating / reviewsArray.length).toFixed(1);
            const reviewCount = reviewsArray.length;

            // 3. Persist to Backend (Update Product table)
            const updateFormData = new FormData();
            updateFormData.append("rating", avgRating);
            updateFormData.append("reviewCount", reviewCount);

            // We only need to update these two fields. 
            // The updateProduct controller handles partial updates if we send them.
            // Note: updateProduct thunk requires FormData because of headers.
            await dispatch(updateProduct({ id: productId, data: updateFormData })).unwrap();

            // 4. Update Redux Store
            dispatch(updateProductRating({
              productId,
              avgRating,
              reviewCount
            }));
          }
        } catch (calcError) {
          console.error("Failed to calculate and update product stats:", calcError);
        }
      }

      // Refetch reviews for this product to update detail page
      dispatch(fetchReviewsByProduct(productId));

      // Clear the review data for this product
      setProductReviews((prev) => ({
        ...prev,
        [productId]: {
          rating: 0,
          review: "",
          images: [],
          imagePreviews: [],
          hover: null,
        },
      }));

    } catch (error) {
      // Rollback optimistic update on failure
      dispatch(rollbackProductReview({ orderId, productId }));
      toast.error(error?.message || "Failed to submit review");
    } finally {
      setSubmittingProducts((prev) => ({ ...prev, [productId]: false }));
    }
  };

  if (!orderData) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#141A44] mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading order details...</p>
        </div>
      </div>
    );
  }

  const products = orderData?.order_details?.order_items || [];

  // Filter out reviewed products using Redux state
  const unreviewedProducts = products.filter((product) => {
    const productId = product.product_id || product.productId || product.id;
    return !reviewedProductIds.includes(productId);
  });

  if (products.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600">No products found in this order</p>
          <button
            onClick={() => navigate("/OrderHistory")}
            className="mt-4 px-6 py-2 bg-[#141A44] text-white rounded-lg hover:bg-opacity-90"
          >
            Back to Orders
          </button>
        </div>
      </div>
    );
  }

  if (unreviewedProducts.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <FaCheckCircle className="text-green-500 text-6xl mx-auto mb-4" />
          <h2 className="text-2xl font-semibold text-gray-800 mb-2">
            All Reviews Submitted!
          </h2>
          <p className="text-gray-600 mb-6">
            Thank you for reviewing all products from this order.
          </p>
          <button
            onClick={() => navigate("/OrderHistory")}
            className="px-6 py-3 bg-[#141A44] text-white rounded-lg hover:bg-opacity-90 transition"
          >
            Back to Order History
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 px-4 sm:px-6 pt-10 pb-24 lg:pb-10">
      {/* Header */}
      <div className="flex items-center mb-6">
        <button onClick={() => navigate(-1)} className="text-xl mr-4">
          <FaArrowLeft />
        </button>
        <h1 className="flex-1 text-2xl font-semibold">
          Write Reviews for Order #{orderData?.order_id}
        </h1>
      </div>

      <div className="flex items-center justify-between mb-6">
        <p className="text-sm text-gray-600">
          Review each product individually. Products will be removed after submission.
        </p>
        <div className="text-right">
          <p className="text-sm font-semibold text-[#141A44]">
            {unreviewedProducts.length} product{unreviewedProducts.length !== 1 ? "s" : ""} remaining
          </p>
          {products.length > 0 && (
            <p className="text-xs text-gray-500 mt-1">
              {reviewedProductIds.length} of {products.length} reviewed
            </p>
          )}
        </div>
      </div>

      {/* Products List */}
      <div className="space-y-6">
        {unreviewedProducts.map((product) => {
          // Try different possible field names for product ID
          const productId = product.product_id || product.productId || product.id;
          const reviewData = productReviews[productId] || {};
          const isSubmitting = submittingProducts[productId];
          const maxChars = 250;

          return (
            <div
              key={productId}
              className="bg-white p-6 rounded-lg shadow-sm border border-gray-200"
            >
              {/* Product Info */}
              <div className="flex items-start gap-4 mb-6 pb-4 border-b">
                <img
                  src={product.image || "https://via.placeholder.com/80"}
                  alt={product.name}
                  className="w-20 h-20 rounded-md object-cover"
                />
                <div className="flex-1">
                  <h2 className="font-semibold text-gray-800 text-lg">
                    {product.name}
                  </h2>
                  <p className="text-sm text-gray-500 mt-1">SKU: {product.sku}</p>
                  <p className="text-sm text-gray-700 mt-1">
                    Price: ₹{product.selling_price}
                  </p>
                </div>
              </div>

              {/* Rating */}
              <div className="mb-4">
                <h3 className="font-semibold text-gray-800 mb-2">
                  Rate this product <span className="text-red-500">*</span>
                </h3>
                <div className="flex gap-2">
                  {[...Array(5)].map((_, index) => {
                    const starValue = index + 1;
                    return (
                      <button
                        key={starValue}
                        type="button"
                        className="text-3xl transition-transform hover:scale-110"
                        onClick={() => handleRatingChange(productId, starValue)}
                        onMouseEnter={() => handleHover(productId, starValue)}
                        onMouseLeave={() => handleHover(productId, null)}
                        disabled={isSubmitting}
                      >
                        <FaStar
                          className={`${starValue <= (reviewData.hover || reviewData.rating)
                            ? "text-yellow-400"
                            : "text-gray-300"
                            }`}
                        />
                      </button>
                    );
                  })}
                  {reviewData.rating > 0 && (
                    <span className="ml-2 text-sm text-gray-600 self-center">
                      {reviewData.rating} star{reviewData.rating > 1 ? "s" : ""}
                    </span>
                  )}
                </div>
              </div>

              {/* Image Upload */}
              <div className="mb-4">
                <h3 className="font-semibold text-gray-800 mb-2">
                  Add Photos (Optional)
                </h3>

                {/* Image Previews */}
                {reviewData.imagePreviews?.length > 0 && (
                  <div className="flex gap-2 mb-3 flex-wrap">
                    {reviewData.imagePreviews.map((preview, idx) => (
                      <div key={idx} className="relative">
                        <img
                          src={preview}
                          alt={`Preview ${idx + 1}`}
                          className="w-20 h-20 object-cover rounded-md border"
                        />
                        <button
                          onClick={() => handleRemoveImage(productId, idx)}
                          className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                          disabled={isSubmitting}
                        >
                          <FaTimes size={12} />
                        </button>
                      </div>
                    ))}
                  </div>
                )}

                {/* Upload Button */}
                {(!reviewData.images || reviewData.images.length < 3) && (
                  <label className={`w-full border-2 border-dashed border-gray-300 rounded-lg p-4 flex flex-col items-center justify-center ${isSubmitting ? 'cursor-not-allowed opacity-50' : 'cursor-pointer hover:bg-gray-50'} transition`}>
                    <input
                      type="file"
                      className="hidden"
                      accept="image/*"
                      multiple
                      onChange={(e) => handleImageChange(productId, e)}
                      disabled={isSubmitting}
                    />
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6 text-gray-400 mb-1"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 4v16m8-8H4"
                      />
                    </svg>
                    <span className="text-xs text-gray-600">
                      Click to upload (max 3 images)
                    </span>
                  </label>
                )}
              </div>

              {/* Review Text */}
              <div className="mb-4">
                <h3 className="font-semibold text-gray-800 mb-2">
                  Write your Review (Optional)
                </h3>
                <textarea
                  value={reviewData.review || ""}
                  onChange={(e) => handleReviewChange(productId, e.target.value)}
                  maxLength={maxChars}
                  rows="3"
                  className="w-full border rounded-lg p-3 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#141A44] disabled:bg-gray-100 disabled:cursor-not-allowed"
                  placeholder="Share your experience with this product..."
                  disabled={isSubmitting}
                ></textarea>
                <p className="text-right text-xs text-gray-500 mt-1">
                  {maxChars - (reviewData.review?.length || 0)} characters remaining
                </p>
              </div>

              {/* Individual Submit Button */}
              <button
                onClick={() => handleSubmitProductReview(productId)}
                disabled={isSubmitting || reviewData.rating === 0}
                className="w-full bg-[#141A44] text-white font-semibold py-3 rounded-lg hover:bg-opacity-90 transition disabled:bg-gray-400 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <span className="flex items-center justify-center">
                    <svg
                      className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Submitting Review...
                  </span>
                ) : (
                  "Submit Review for This Product"
                )}
              </button>
            </div>
          );
        })}
      </div>

      {/* Back Button */}
      <div className="mt-8">
        <button
          onClick={() => navigate("/OrderHistory")}
          className="w-full border-2 border-[#141A44] text-[#141A44] font-semibold py-3 rounded-lg hover:bg-[#141A44] hover:text-white transition"
        >
          Back to Order History
        </button>
      </div>
    </div>
  );
};

export default WriteReview;
