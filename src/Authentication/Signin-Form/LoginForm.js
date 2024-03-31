import React, { useEffect } from "react";
import { useHistory } from "react-router";

import Input from "../../Shared/Components/UI Element/Input";
import Spinner from "../../Shared/Components/UI Element/Spinner";
import Backdrop from "../../Shared/Components/Backdrop/Backdrop";
import { useForm } from "../../Shared/Hooks/Form-Hook";
import {
  MIN_LENGTH_VALIDATOR,
  EMAIL_VALIDATOR,
} from "../../Shared/Util/Validators/Validator";
import classes from "./LoginForm.module.css";
import { loginUser } from "../../Actions/UsersActions";
import { useDispatch, useSelector } from "react-redux";

const LoginForm = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const { loading_users, loggedin_user } = useSelector((state) => state.users);

  const [formState, inputChangeHandler] = useForm(
    {
      email: {
        inputValue: "",
        inputisValid: false,
      },
      password: {
        inputValue: "",
        inputisValid: false,
      },
    },
    false
  );

  const submitForm = async (e) => {
    e.preventDefault();
    const loginData = {
      email: formState.inputs.email.inputValue,
      password: formState.inputs.password.inputValue,
    };
    dispatch(loginUser(loginData));
  };

  useEffect(() => {
    const { state } = history.location;
    loggedin_user && history.push(`${state ? state?.to : "/"}`);
  }, [loggedin_user, history]);

  return (
    <div className={classes.center}>
      {loading_users && (
        <Backdrop>
          <Spinner />
          <h2 style={{ color: "gold" }}>Signing In</h2>
        </Backdrop>
      )}
      <form className={classes.addPlaceFORM} onSubmit={submitForm}>
        <h3 style={{ alignSelf: "center" }}>SignIn</h3>
        <Input
          id="email"
          type="Input"
          fieldType="email"
          Label="Email"
          pHolder="Enter Email Address"
          rClass="gYellow"
          Error="Please Enter a Valid Email"
          onInputChange={inputChangeHandler}
          validators={[EMAIL_VALIDATOR()]}
        />

        <Input
          id="password"
          type="Input"
          fieldType="password"
          Label="Password"
          pHolder="Enter Password"
          rClass="gYellow"
          Error="Password Field is Required"
          onInputChange={inputChangeHandler}
          validators={[MIN_LENGTH_VALIDATOR(1)]}
        />

        <button
          className="btn btn-outline-success p-2 mt-3"
          disabled={!formState.formIsValid}
        >
          LOG IN
        </button>
      </form>
    </div>
  );
};

export default LoginForm;
