import React, { useState, useEffect } from "react";
import { useHistory, Link } from "react-router-dom";
import * as yup from "yup";
import Logo from '../imgs/film.png'

// Redux
import { connect } from "react-redux";

// Components
import { Form, Input, Button, Alert, Divider } from "antd";

// Actions
import { registerUser, setError, clearError } from "../redux/actions/userActions";

//This is the registration form schema
//If the data doesn't look like this when we submit then it will fail with a message
const formSchema = yup.object().shape({
  first_name: yup.string(),
  last_name: yup.string(),
  email: yup.string().email("Please enter a valid email address."),
  password: yup
    .string()
    .min(8, "Password must be atleast 8 characters.")
    .max(72, "Password must be less than 72 characters."),
  confirm_password: yup.string().oneOf([yup.ref("password"), null], "Passwords must match."),
});

const SignUp = ({isLogged, clearError, registerUser, setError, authError, authLoading}) => {
  const [applicant, setApplicant] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    confirm_password: "",
  });

  let history = useHistory();

  //Redirect if logged already logged in OR on successful registration
  useEffect(() => {
    if (isLogged) {
      clearError();
      history.push("/");
    }
  }, [isLogged, clearError, history]);

  const handleInput = (e) => {
    clearError();
    setApplicant({ ...applicant, [e.target.name]: e.target.value });
  };

  //Attempt to register new user with provided info
  const submitRegistration = (e) => {
    e.preventDefault();

    //Validate form data, return error on first error encountered
    formSchema
      .validate(applicant, { abortEarly: true })
      .then(() => {
        //Data is good, proceed to registration action
        registerUser(applicant);
      })
      .catch((validationError) => {
        setError(validationError.errors);
      });
  };

  return (
    <div className="auth-page">
      <div className="register-container">
        <div className="auth-header">
          <a href="https://videobooth.io">
            <img src={Logo} alt="video camera logo"/>
            <h1>VideoBooth.io</h1>
          </a>
        </div>
          {authError ? <Alert message={authError} type="error" /> : null}
          <Form onSubmit={submitRegistration} className="register-form" data-testid="register-form" labelAlign="left">
          <Form.Item>
              <Input
                type="text"
                name="first_name"
                onChange={handleInput}
                value={applicant.first_name}
                placeholder="First Name"
                autoComplete="off"
                required
              />
              </Form.Item>
              <Form.Item>
                <Input
                  type="text"
                  name="last_name"
                  onChange={handleInput}
                  value={applicant.last_name}
                  placeholder="Last Name"
                  autoComplete="off"
                  required
                />
              </Form.Item>
            <Form.Item>
              <Input
                type="text"
                name="email"
                onChange={handleInput}
                value={applicant.email}
                placeholder="Email address"
                autoComplete="off"
                required
              />
            </Form.Item>
            <Form.Item>
              <Input
                type="password"
                name="password"
                onChange={handleInput}
                value={applicant.password}
                placeholder="Password"
                autoComplete="off"
                required
              />
            </Form.Item>
            <Form.Item>
              <Input
                type="password"
                name="confirm_password"
                onChange={handleInput}
                value={applicant.confirm_password}
                placeholder="Confirm Password"
                autoComplete="off"
                required
              />
            </Form.Item>
            <Form.Item>
            <Button type="primary" htmlType="submit" loading={authLoading} className="register-form-button">
                {authLoading ? "Loading..." : "Sign Up"}
              </Button>
            </Form.Item>
          </Form>
          <Divider>or</Divider>
        <Button type="primary" htmlType="button" className="login-link" href="/login">
          Log In
        </Button>
          </div>
      </div>
  );
};

const mapStateToProps = (state) => ({
  isLogged: state.User.isLogged,
  authError: state.User.authError,
  authLoading: state.User.authLoading,
});

const mapActionsToProps = {
  registerUser,
  setError,
  clearError,
};

export default connect(mapStateToProps, mapActionsToProps)(SignUp);