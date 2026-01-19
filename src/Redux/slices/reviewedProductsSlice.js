import { createSlice } from "@reduxjs/toolkit";
 
// NO backend persistence; use localStorage for simplicity
const STORAGE_KEY = 'reviewedOrders';

// Helper functions for localStorage
const getReviewedOrdersFromStorage = () => {
    try {
        const data = localStorage.getItem(STORAGE_KEY);
        return data ? JSON.parse(data) : {};
    } catch {
        return {};
    }
};

const saveReviewedOrdersToStorage = (data) => {
    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch (error) {
        console.error('Failed to save reviewed orders to localStorage:', error);
    }
};

// 🔽 Slice
const reviewedProductsSlice = createSlice({
    name: "reviewedProducts",
    initialState: {
        // Structure: { [orderId]: { productIds: [1,2,3], reviewedAt: timestamp } }
        reviewedProducts: getReviewedOrdersFromStorage(),
        loading: false,
        error: null,
    },
    reducers: {
        // ✅ Load from localStorage on app init
        loadReviewedOrders: (state) => {
            state.reviewedProducts = getReviewedOrdersFromStorage();
        },

        // ✅ Mark product as reviewed (optimistic update)
        markProductAsReviewed: (state, action) => {
            const { orderId, productId } = action.payload;

            if (!state.reviewedProducts[orderId]) {
                state.reviewedProducts[orderId] = {
                    productIds: [],
                    reviewedAt: Date.now()
                };
            }

            // Add to reviewed list if not already there
            if (!state.reviewedProducts[orderId].productIds.includes(productId)) {
                state.reviewedProducts[orderId].productIds.push(productId);
                state.reviewedProducts[orderId].reviewedAt = Date.now();
            }

            // Persist to localStorage
            saveReviewedOrdersToStorage(state.reviewedProducts);
        },

        // ✅ Rollback optimistic update on failure
        rollbackProductReview: (state, action) => {
            const { orderId, productId } = action.payload;

            if (state.reviewedProducts[orderId]) {
                state.reviewedProducts[orderId].productIds =
                    state.reviewedProducts[orderId].productIds.filter(id => id !== productId);

                // Update localStorage
                saveReviewedOrdersToStorage(state.reviewedProducts);
            }
        },

        // ✅ Clear reviewed products for an order
        clearOrderReviews: (state, action) => {
            const orderId = action.payload;
            delete state.reviewedProducts[orderId];
            saveReviewedOrdersToStorage(state.reviewedProducts);
        },

        // ✅ Clear all reviewed orders (for testing/logout)
        clearAllReviewedOrders: (state) => {
            state.reviewedProducts = {};
            localStorage.removeItem(STORAGE_KEY);
        }
    }
});

export const {
    loadReviewedOrders,
    markProductAsReviewed,
    rollbackProductReview,
    clearOrderReviews,
    clearAllReviewedOrders
} = reviewedProductsSlice.actions;

// ✅ Selectors
export const selectReviewedProductIds = (state, orderId) =>
    state.reviewedProducts.reviewedProducts[orderId]?.productIds || [];

export const selectIsOrderFullyReviewed = (state, orderId, totalProducts) => {
    const reviewedCount = state.reviewedProducts.reviewedProducts[orderId]?.productIds?.length || 0;
    return totalProducts > 0 && reviewedCount >= totalProducts;
};

export default reviewedProductsSlice.reducer;
