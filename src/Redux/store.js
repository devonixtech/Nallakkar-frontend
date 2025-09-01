import { configureStore } from "@reduxjs/toolkit";
import categoryreducer from "./slices/categorySlice";
import subcategoryReduer from "./slices/subcategorySlice";
import productReducer from "./slices/productSlice";
export const store = configureStore({
  reducer: {
    ctegory : categoryreducer,
    subcategory : subcategoryReduer,
    products : productReducer,
  },
});

