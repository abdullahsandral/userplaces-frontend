import { combineReducers } from "redux";
import PlacesReducer from "./PlacesReducer";
import UsersReducer from "./UsersReducer";

const reducersList = {
  users: UsersReducer,
  places: PlacesReducer,
};

export default combineReducers(reducersList);
