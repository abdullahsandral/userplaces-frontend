import {
  GET_ALL_USERS,
  SIGNIN_USER,
  LOADING_USERS,
  SIGNOUT_USER,
} from "../Actions/TYPES";
const initialState = {
  loading_users: false,
  users: null,
  loggedin_user: null,
};

const usersReducers = (state = initialState, action) => {
  switch (action.type) {
    case LOADING_USERS:
      return {
        ...state,
        loading_users: true,
      };
    case GET_ALL_USERS:
      return {
        ...state,
        users: action?.payload,
        loading_users: false,
      };
    case SIGNIN_USER:
      return {
        ...state,
        loggedin_user: action?.payload,
        loading_users: false,
      };
    case SIGNOUT_USER:
      return {
        ...state,
        loggedin_user: null,
      };
    default:
      return {
        ...state,
      };
  }
};

export default usersReducers;
