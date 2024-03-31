import React, { useEffect } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { useSelector } from "react-redux";

import store from "./ReduxStore";
import LoginForm from "./Authentication/Signin-Form/LoginForm";
import SignUpForm from "./Authentication/SignUp-Form/SignUpForm";
import Users from "./Users/Pages/Users";
import NewPlaces from "./Places/Pages/NewPlaces";
import UserPlaces from "./Places/Pages/UserPlaces";
import UpdatePlace from "./Places/Pages/UpdatePlace";
import PlaceDetail from "./Places/Pages/PlaceDetail";
import MainNavigation from "./Shared/Components/MainNvigation/MainNavigation";
import PrivateRoute from "./Authentication/PrivateRoute";
import { SIGNIN_USER } from "./Actions/TYPES";
import "./App.css";

let Timer;

const userData = JSON.parse(localStorage.getItem("userData"));
if (
  userData &&
  userData.U_Token &&
  new Date(userData.TokenExpiryDate) > new Date()
) {
  store.dispatch({
    type: SIGNIN_USER,
    payload: userData,
  });
}
const App = () => {
  const { loggedin_user } = useSelector((state) => state?.users);

  useEffect(() => {
    if (loggedin_user) {
      const remainingTime =
        new Date(loggedin_user?.TokenExpiryDate)?.getTime() -
        new Date().getTime();
      Timer = setTimeout(
        () => document.getElementById("signout")?.click(),
        remainingTime
      );
    }
    return () => clearTimeout(Timer);
  }, [loggedin_user]);
  return (
    <Router>
      <MainNavigation />
      <main>
        <Route path="/" exact component={Users} />
        <Route path="/login" exact component={LoginForm} />
        <Route path="/signup" exact component={SignUpForm} />
        <Route path="/:uid/places" exact component={UserPlaces} />
        <Route path="/places/:pID/detail" exact component={PlaceDetail} />
        <PrivateRoute
          path="/places/:pID/update"
          exact
          component={UpdatePlace}
        />
        <PrivateRoute path="/places/:pID" exact component={NewPlaces} />
        {/* <Redirect exact to='/' /> */}
      </main>
    </Router>
  );
};

export default App;
