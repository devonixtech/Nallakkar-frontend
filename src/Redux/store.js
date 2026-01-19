import { configureStore } from "@reduxjs/toolkit";
import categoryreducer from "./slices/categorySlice";
import subcategoryReduer from "./slices/subcategorySlice";
import productReducer from "./slices/productSlice";
import userReducer from "./slices/userSlice";
import wishlistReducer from "./slices/wishlistSlice";
import cartReducer from "./slices/cartSlice";
import contactReducer from "./slices/contactSlice";
import reviewReducer from "./slices/reviewSlice";
import authReducer from "./slices/authSlice";
import filteredProductReducer from "./slices/filteredProductSlice";
import investorReducer from "./slices/investorSlice";
import paymentReducer from "./slices/paymentSlice";
import buyNowReducer from "./slices/buyNowSlice";
import AddDeliveryAddress from "./slices/addressSlice";
import ordersReducer from "./slices/ordersSlice";
import addressSlice from "./slices/addressSlice";
import OrderHistoryReducer from "./slices/orderHistorySlice";
import dashboardReducer from "./slices/dashboardSlice"
import bannerReducer from "./slices/bannerSlice";
import reviewedProductsReducer from "./slices/reviewedProductsSlice";

export const store = configureStore({
  reducer: {
    ctegory: categoryreducer,
    subcategory: subcategoryReduer,
    products: productReducer,
    users: userReducer,
    wishlist: wishlistReducer,
    cart: cartReducer,
    contacts: contactReducer,
    reviews: reviewReducer,
    auth: authReducer,
    filteredProducts: filteredProductReducer,
    investors: investorReducer,
    payment: paymentReducer,
    buyNow: buyNowReducer,
    orders: ordersReducer,
    address: addressSlice,
    orderHistory: OrderHistoryReducer,
    dashboard: dashboardReducer,
    banners: bannerReducer,
    reviewedProducts: reviewedProductsReducer,

  },
});

