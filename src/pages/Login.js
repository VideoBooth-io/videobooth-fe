import React, { useState, useEffect } from "react";
import { useHistory, Link } from "react-router-dom";
import * as yup from "yup";
import Logo from '../imgs/film.png'

// Redux
import { connect } from "react-redux";

// Actions
import { loginUser, setError, clearError } from "../redux/actions/userActions";

// Components
import { Form, Icon, Input, Button, Alert, Divider } from "antd";

const emailLoginSchema = yup.object().shape({
  email: yup.string().email(),
});

const Login = ({isLogged, clearError, loginUser, error}) => {
  const [user, setUser] = useState({
    usernameOrEmail: "",
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

    const userCredentials = user;

    emailLoginSchema
      .validate({ email: user.usernameOrEmail })
      .then(() => {
        userCredentials.method = "email";

        loginUser(userCredentials);
      })
      .catch(() => {
        userCredentials.method = "username";

        loginUser(userCredentials);
      });

    setUser({ usernameOrEmail: "", password: "" });
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
        <Form className="login-form" data-testid="login-form">
          <Form.Item>
            <Input
              type="text"
              name="usernameOrEmail"
              value={user.usernameOrEmail}
              onChange={handleInput}
              placeholder="Username or Email"
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
            <Button type="primary" htmlType="button" onClick={submitLogin} className="login-form-button">
              Sign In
            </Button>
          </Form.Item>
        </Form>
        <Divider>or</Divider>
        <Button type="primary" htmlType="button" className="signup-link" href="/signup">
          Sign Up
        </Button>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  isLogged: state.User.isLogged,
  error: state.User.error,
});

const mapActionsToProps = {
  loginUser,
  setError,
  clearError,
};

export default connect(mapStateToProps, mapActionsToProps)(Login);