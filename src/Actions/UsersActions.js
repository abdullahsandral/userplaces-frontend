import axios from "axios";
import { GET_ALL_USERS, LOADING_USERS, SIGNIN_USER } from "./TYPES";

export const loginUser = (loginData) => async (dispatch) => {
  dispatch(setUersLoding());
  try {
    const { data } = (await axios?.post("/users/signin", loginData)) || {};
    const { tknDate } = data;
    const ExpirationDate =
      tknDate || new Date(new Date().getTime() + 1000 * 60 * 30); //30mins
    const userData = { ...data, TokenExpiryDate: ExpirationDate.toISOString() };
    dispatch({
      type: SIGNIN_USER,
      payload: userData,
    });
    localStorage.setItem("userData", JSON.stringify(userData));
  } catch (error) {
    console.log("ERROR IN SIGN IN");
  }
};

export const getAllUsers = () => async (dispatch) => {
  dispatch(setUersLoding());
  try {
    const { data } = (await axios?.get("/users")) || {};
    dispatch({
      type: GET_ALL_USERS,
      payload: data,
    });
  } catch (error) {
    console.log("ERROR IN GETTING ALL USERS");
  }
};

export const signupNewUser = (signupData) => async (dispatch) => {
  try {
    const { data } = (await axios?.get("/users/signup")) || {};
    console.log(data);
  } catch (error) {
    console.log("ERROR IN SIGNUP");
  }
};

const setUersLoding = () => {
  return {
    type: LOADING_USERS,
  };
};
