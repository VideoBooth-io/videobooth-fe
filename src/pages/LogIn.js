import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import * as yup from 'yup';
import { connect } from 'react-redux';
import {
  Form, Input, Button, Alert, Divider,
} from 'antd';
import Logo from '../imgs/film.png';

// Redux

// Actions
import { loginUser, setAuthError, clearAuthError } from '../redux/actions/userActions';

// Components

const emailLoginSchema = yup.object().shape({
  email: yup.string().required('Email is required').email('Please enter a valid email'),
});

const LogIn = ({
  isLogged, clearError, login, authError, authLoading, setError,
}) => {
  const [user, setUser] = useState({
    email: '',
    password: '',
  });

  const history = useHistory();

  // Redirect if logged already logged in OR on successful registration
  useEffect(() => {
    if (isLogged) {
      clearError();
      history.push('/');
    }
  }, [isLogged, clearError, history]);

  const handleInput = (e) => {
    clearError();
    setUser({ ...user, [e.target.name]: e.target.value.trim() });
  };

  const submitLogin = (e) => {
    e.preventDefault();

    emailLoginSchema
      .validate({ email: user.email })
      .then(() => {
        login(user);
      })
      .catch((validationError) => {
        setError(validationError.message);
      });
    setUser({ email: '', password: '' });
  };

  return (
    <div className="auth-page">
      <div className="login-container">
        <div className="auth-header">
          <a href="https://videobooth.io">
            <img src={Logo} alt="video camera logo" />
            <h1>VideoBooth.io</h1>
          </a>
        </div>
        {authError ? <Alert message={authError} type="error" /> : null}
        <Form className="login-form" data-testid="login-form">
          <Form.Item>
            <Input
              type="email"
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
              {authLoading ? null : 'Log In'}
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
  login: loginUser,
  setError: setAuthError,
  clearError: clearAuthError,
};

LogIn.propTypes = {
  isLogged: PropTypes.bool.isRequired,
  clearError: PropTypes.func.isRequired,
  login: PropTypes.func.isRequired,
  authError: PropTypes.string,
  authLoading: PropTypes.bool.isRequired,
  setError: PropTypes.func.isRequired,
};

LogIn.defaultProps = {
  authError: null,
};

export default connect(mapStateToProps, mapActionsToProps)(LogIn);
