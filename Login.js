import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../assets/Styles/Login.css';
import NavBar from '../NavBar';

function Login() {
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  // Validation schema
  const validationSchema = Yup.object({
    email: Yup.string().email('Invalid email format').required('Email is required'),
    password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
  });

  const handleSubmit = async (values, { setSubmitting }) => {
    setErrorMessage('');
    try {
      const response = await axios.post('http://localhost:8080/api/auth/login', values);

      if (response.data.success) {
        localStorage.setItem('authToken', response.data.token); // Save token
        navigate('/home', { replace: true }); // Redirect to home and replace history
      } else {
        setErrorMessage(response.data.message || 'Login failed. Please check your credentials.');
      }
    } catch (error) {
      console.error('Login error:', error);
      setErrorMessage('Something went wrong. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div>
       <NavBar
        title="MyCareer"
        link2="/"
        linkText2="Home"
      />
    <div className="login-container">
      <h2>Login</h2>
      <Formik
        initialValues={{ email: '', password: '' }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form>
            <div>
              <label htmlFor="email">Email:</label>
              <Field type="email" name="email" placeholder="Enter your email" />
              <ErrorMessage name="email" component="div" className="error" />
            </div>
            <div>
              <label htmlFor="password">Password:</label>
              <Field type="password" name="password" placeholder="Enter your password" />
              <ErrorMessage name="password" component="div" className="error" />
            </div>
            {errorMessage && <div className="error">{errorMessage}</div>}
            <button type="submit" className='logBtn' disabled={isSubmitting}>
              {isSubmitting ? 'Logging in...' : 'Login'}
            </button>
            <div className="link-container">
              <a href="/register" className='logReg'>New User? Register</a>
            </div>
          </Form>
        )}
      </Formik>
      </div>
      </div>
  );
}

export default Login;
