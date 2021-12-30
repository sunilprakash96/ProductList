import { combineReducers } from "redux";
import authReducer from "./auth.reducers";
import productReducer from "./product.reducer";

export default combineReducers({
  auth: authReducer,
  product: productReducer
})