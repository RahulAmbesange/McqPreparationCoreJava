import React from 'react';
import { Formik, Form, ErrorMessage, Field } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import '../assets/Styles/Register.css';
import NavBar from '../NavBar';

function Register() {
  const navigate = useNavigate();

  // Validation schema using Yup
  const validationSchema = Yup.object().shape({
    firstName: Yup.string().required('First Name is Required'),
    lastName: Yup.string().required('Last Name is Required'),
    email: Yup.string()
      .email('Invalid email format')
      .required('Email is Required'),
    password: Yup.string()
      .min(6, 'Password must be at least 6 characters')
      .required('Password is Required'),
    mobileNumber: Yup.string()
      .matches(/^[0-9]{10}$/, 'Mobile number must be 10 digits')
      .required('Mobile number is Required'),
  });

  // Handle form submission
  const handleSubmit = async (values, { setSubmitting, setStatus }) => {
    setStatus(null); // Clear previous status
    try {
      console.log('Submitting values:', values);

      const response = await axios.post(
        'http://localhost:8080/api/auth/register',
        values,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      console.log('API Response:', response);

      if (response.status === 201 && response.data.success) {
        alert('Registration successful!');

        // Save user data (e.g., email or token) in sessionStorage
        sessionStorage.setItem('user', JSON.stringify(response.data.user));

        // Prevent going back to registration page using history state
        window.history.replaceState(null, '', '/login');

        navigate('/login'); // Redirect to the login page
      } else {
        setStatus({
          submit: response.data.message || 'An unexpected error occurred.',
        });
      }
    } catch (error) {
      let errorMsg = 'Something went wrong, please try again.';
      if (error.response) {
        console.error('Backend Error Response:', error.response);
        errorMsg = error.response?.data?.message || 'Server error occurred.';
      } else if (error.request) {
        console.error('No response from server:', error.request);
        errorMsg = 'No response from server. Please check your connection.';
      } else {
        console.error('Error during request setup:', error.message);
        errorMsg = 'Error during request setup. Please try again later.';
      }
      setStatus({ submit: errorMsg });
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
    
    <div className="register-container">
      <h2>Register</h2>
      <Formik
        initialValues={{
          firstName: '',
          lastName: '',
          email: '',
          password: '',
          mobileNumber: '',
        }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting, status }) => (
          <Form>
            <div>
              <label htmlFor="firstName">First Name:</label>
              <Field
                type="text"
                name="firstName"
                id="firstName"
                placeholder="Enter your First name"
              />
              <ErrorMessage name="firstName" component="div" className="error" />
            </div>
            <div>
              <label htmlFor="lastName">Last Name:</label>
              <Field
                type="text"
                name="lastName"
                id="lastName"
                placeholder="Enter your Last name"
              />
              <ErrorMessage name="lastName" component="div" className="error" />
            </div>
            <div>
              <label htmlFor="email">Email:</label>
              <Field
                type="email"
                name="email"
                id="email"
                placeholder="Enter your Email"
              />
              <ErrorMessage name="email" component="div" className="error" />
            </div>
            <div>
              <label htmlFor="password">Password:</label>
              <Field
                type="password"
                name="password"
                id="password"
                placeholder="Enter your Password"
              />
              <ErrorMessage name="password" component="div" className="error" />
            </div>
            <div>
              <label htmlFor="mobileNumber">Mobile Number:</label>
              <Field
                type="text"
                name="mobileNumber"
                id="mobileNumber"
                placeholder="Enter your Mobile number"
              />
              <ErrorMessage name="mobileNumber" component="div" className="error" />
            </div>

            {status && status.submit && <div className="error">{status.submit}</div>}

            <button type="submit" className='regBtn' disabled={isSubmitting}>
              {isSubmitting ? 'Registering...' : 'Register'}
            </button>
            <div className="link-container">
              <Link to="/login" className='regLogin'>Already Registered? Login</Link>
            </div>
          </Form>
        )}
      </Formik>
      </div>
      </div>
  );
}

export default Register;
