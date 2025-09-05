import { configureStore } from "@reduxjs/toolkit";
import categoryreducer from "./slices/categorySlice";
import subcategoryReduer from "./slices/subcategorySlice";
import productReducer from "./slices/productSlice";
import userReducer from "./slices/userSlice";  
import wishlistReducer from "./slices/wishlistSlice";
import cartReducer from "./slices/cartSlice"; 
export const store = configureStore({
  reducer: {
    ctegory : categoryreducer,
    subcategory : subcategoryReduer,
    products : productReducer,
    users : userReducer,
    wishlist : wishlistReducer,
    cart : cartReducer,
  },
});

