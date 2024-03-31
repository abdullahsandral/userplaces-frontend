import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import RootReducer from "./Reducers/indexReducer";

const initialState = {};
const middlewares = [thunk];
const store = createStore(
  RootReducer,
  initialState,
  compose(applyMiddleware(...middlewares))
);

export default store;
