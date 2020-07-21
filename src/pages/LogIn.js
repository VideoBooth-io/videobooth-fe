import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import * as yup from "yup";
import Logo from '../imgs/film.png'

// Redux
import { connect } from "react-redux";

// Actions
import { loginUser, setError, clearError } from "../redux/actions/userActions";

// Components
import { Form, Input, Button, Alert, Divider } from "antd";

const emailLoginSchema = yup.object().shape({
  email: yup.string().email(),
});

const LogIn = ({ isLogged, clearError, loginUser, authError, authLoading }) => {
  const [user, setUser] = useState({
    email: "",
    password: "",
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
    setUser({ ...user, [e.target.name]: e.target.value.trim() });
  };

  const submitLogin = (e) => {
    e.preventDefault();

    console.log(user)

    emailLoginSchema
      .validate({ email: user.email })
      .then(() => {
        loginUser(user);
      })
    setUser({ email: "", password: "" });
  };

  return (
    <div className="auth-page">
      <div className="login-container">
        <div className="auth-header">
          <a href="https://videobooth.io">
            <img src={Logo} alt="video camera logo"/>
            <h1>VideoBooth.io</h1>
          </a>
        </div>
        {authError ? <Alert message={authError} type="error" /> : null}
        <Form className="login-form" data-testid="login-form">
          <Form.Item>
            <Input
              type="text"
              name="email"
              value={user.email}
              onChange={handleInput}
              placeholder="Email Address"
              autoComplete="off"
              required
            />
          </Form.Item>
          <Form.Item>
            <Input
              type="password"
              name="password"
              value={user.password}
              onChange={handleInput}
              placeholder="Password"
              autoComplete="off"
              required
            />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="button" loading={authLoading} onClick={submitLogin} className="login-form-button">
              {authLoading ? null : "Log In"}
            </Button>
          </Form.Item>
        </Form>
        <Divider>or</Divider>
        <Button htmlType="button" className="signup-link" href="/signup">
          Sign Up
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
  loginUser,
  setError,
  clearError,
};

export default connect(mapStateToProps, mapActionsToProps)(LogIn);
