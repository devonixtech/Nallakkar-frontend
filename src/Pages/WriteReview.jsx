import React, { useState, useEffect } from "react";
import { FaArrowLeft, FaStar, FaTimes, FaCheckCircle } from "react-icons/fa";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchOrderByOrderId } from "../Redux/slices/ordersSlice";
import { addReview, fetchReviewsByProduct, fetchReviewsByUserId, updateReview } from "../Redux/slices/reviewSlice";
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
  const userReviews = useSelector((state) => state?.reviews?.userReviews || []);
  const reviewedProductIds = useSelector(
    (state) => state?.reviewedProducts?.reviewedProducts[orderId]?.productIds || []
  );

  // State for each product's review
  const [productReviews, setProductReviews] = useState({});
  const [submittingProducts, setSubmittingProducts] = useState({});

  // Fetch order data & user reviews on mount
  useEffect(() => {
    if (orderId) {
      dispatch(fetchOrderByOrderId(orderId));
    }
    if (userId) {
      dispatch(fetchReviewsByUserId(userId));
    }
  }, [orderId, userId, dispatch]);

  // Initialize review state for each product
  useEffect(() => {
    if (orderData?.order_details?.order_items) {
      const initialReviews = {};
      orderData.order_details.order_items.forEach((item) => {
        const productId = item.product_id || item.productId || item.id;

        // Check if there is an existing review for this orderId and productId in userReviews
        // Logic Updated: Fallback to latest review for this product if no exact order match (for legacy reviews)
        let existingReview = userReviews.find(
          (r) => String(r.orderId) === String(orderId) && String(r.productId) === String(productId)
        );

        if (!existingReview) {
          // Fallback: Find latest review for this product
          const productReviews = userReviews.filter(
            (r) => String(r.productId) === String(productId)
          );

          if (productReviews.length > 0) {
            existingReview = productReviews.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))[0];
          }
        }

        if (productId) {
          initialReviews[productId] = {
            id: existingReview?.id || null, // Store review ID if exists
            rating: existingReview?.rating || 0,
            review: existingReview?.review || "",
            images: [], // New images to upload
            imagePreviews: existingReview?.image ? existingReview.image : [], // Load existing images
            existingImages: existingReview?.image ? existingReview.image : [], // Keep track of existing images url
            hover: null,
            isEdit: !!existingReview, // Flag to know if we are editing
          };
        }
      });
      setProductReviews(initialReviews);
    }
  }, [orderData, userReviews, orderId]);

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

    // Set submitting state for this specific product
    setSubmittingProducts((prev) => ({ ...prev, [productId]: true }));

    // Optimistic update - mark as reviewed immediately (state only)
    dispatch(markProductAsReviewed({ orderId, productId }));

    try {
      const formData = new FormData();
      formData.append("userId", userId);
      formData.append("productId", String(productId));
      formData.append("rating", reviewData.rating);
      formData.append("review", reviewData.review || "");

      // IMPORTANT: Append orderId
      formData.append("orderId", orderId);

      // Append new images
      reviewData.images.forEach((image) => {
        formData.append("image", image);
      });

      // If needed, we might need to handle existing images logic depending on backend.
      // The current backend snippet for updateReview:
      // if (req.files.image) replaces images.
      // else keeps existing.
      // If we want to ADD images to existing? Backend logic implies replacement or "keep old if no new".
      // For now, let's assume standard behavior.

      let result;
      if (reviewData.isEdit && reviewData.id) {
        // Update Mode
        // Note: updateReview thunk expects { id, data: formData }
        result = await dispatch(updateReview({ id: reviewData.id, data: formData })).unwrap();
        toast.success("Review updated successfully!");
      } else {
        // Add Mode
        result = await dispatch(addReview(formData)).unwrap();
        toast.success("Review submitted successfully!");
      }

      // Update product rating if stats are returned
      // ... (Rest of stat update logic)
      if (result?.data?.productStats) {
        dispatch(updateProductRating({
          productId: result.data.productStats.productId,
          avgRating: result.data.productStats.avgRating,
          reviewCount: result.data.productStats.reviewCount
        }));
      }

      // Refetch reviews for this product
      dispatch(fetchReviewsByProduct(productId));
      // Also refetch user reviews to ensure state is synced
      dispatch(fetchReviewsByUserId(userId));

      // Note: We don't clear the form on Edit, but we might want to update the local state "isEdit"
      // For Add, we typically clear or redirect.
      // Since the UI design removes the item from the list if unreviewed...
      // If we implement "Edit", we might want to keep it visible?
      // The original code filtered out `reviewedProductIds`.
      // We should decide if we want to show it as "Reviewed" or "Edit".
      // For now, let's stick to original behavior (hiding it from "Unreviewed" list).

    } catch (error) {
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
  // Modified: If we are in "Edit" mode (meaning we navigated here to edit), we might NOT want to filter it out.
  // But typically WriteReview is for writing NEW reviews for the remaining items.
  // If the user came here specifically to edit (e.g. via OrderHistory), we should show the item.
  // The current logic filters out `reviewedProductIds`.
  // If we found a review in `userReviews` matching this `orderId`, effectively it IS reviewed.

  // Let's change the filter logic:
  // Show the product IF:
  // 1. It is NOT in `reviewedProductIds` (which tracks "just submitted in this session" or local storage)
  // OR
  // 2. We are in "Edit" mode for this product (it exists in userReviews)

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

  // NOTE: Logic changed to allow editing. We no longer hide products after review.

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
          You can add or update your reviews for products in this order.
        </p>
      </div>

      {/* Products List */}
      <div className="space-y-6">
        {products.map((product) => {
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
                  className={`w-full border rounded-lg p-3 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#141A44] disabled:bg-gray-100 disabled:cursor-not-allowed ${reviewData.isEdit ? 'italic bg-gray-50' : ''}`}
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
                className={`w-full font-semibold py-3 rounded-lg transition disabled:bg-gray-400 disabled:cursor-not-allowed ${reviewData.isEdit
                    ? "bg-green-600 hover:bg-green-700 text-white"
                    : "bg-[#141A44] hover:bg-opacity-90 text-white"
                  }`}
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
                ) : reviewData.isEdit ? (
                  "Update Review"
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
