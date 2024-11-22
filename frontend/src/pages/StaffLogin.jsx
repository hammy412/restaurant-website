import './login-styles.css';
import React, { useState } from 'react';
import {
  MDBBtn,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBInput
} from 'mdb-react-ui-kit';
import NavBar from '../components/NavBar';

function StaffLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = () => {
    // Regular expression for validating email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  
    if (!email || !password) {
      setError('Both email and password are required.');
      return;
    }
  
    if (!emailRegex.test(email)) {
      setError('Please enter a valid email address.');
      return;
    }
  
    // Clear error and proceed with login logic
    setError('');
    console.log('Logging in with:', { email, password });
    // Add actual login logic here, such as API calls
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleLogin();
    }
  };

  return (
    <>
      <NavBar />
      <MDBContainer
        className="my-5 gradient-form"
        style={{ marginTop: '70px' }}
        onKeyDown={handleKeyDown}
      >
        <MDBRow>
          <MDBCol col="6" className="mb-5">
            <div className="d-flex flex-column ms-5">
              <div className="text-center">
                <img
                  src="/images/DSA_Logo.JPEG"
                  style={{ width: '185px' }}
                  alt="logo"
                />
                <h4 className="mt-1 mb-5 pb-1">
                  <i>Brought to you by DSA Solutions</i>
                </h4>
              </div>

              <h5>
                <b>Please log into your account:</b>
              </h5>
              <MDBInput
                wrapperClass="mb-4"
                placeholder="Email address"
                id="form1"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <MDBInput
                wrapperClass="mb-4"
                placeholder="Password"
                id="form2"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              {error && <p style={{ color: 'red' }}>{error}</p>}
              <div className="text-center pt-1 mb-5 pb-1">
                <MDBBtn
                  className="mb-4 w-100 gradient-custom-2"
                  onClick={handleLogin}
                >
                  <i>Sign in</i>
                </MDBBtn>
              </div>
              <div className="d-flex flex-row align-items-center justify-content-center pb-4 mb-4">
                <p className="mb-0" align="center">
                  <i>
                    Don't remember your staff login? — Make sure to ask your
                    manager! They will be able to help you log in to your
                    account.
                  </i>
                </p>
              </div>
            </div>
          </MDBCol>
          <MDBCol col="6" className="mb-5">
            <div className="d-flex flex-column justify-content-center gradient-custom-2 h-100 mb-4">
              <div className="text-white px-3 py-4 p-md-5 mx-md-4">
                <h4 className="mb-4" align="center">
                  <b>Welcome back, Jang's International Restaurant (JIR) Staff!</b>
                </h4>
                <p className="small mb-0">
                  This is the <b>Staff Login Portal</b>. You are only able to log
                  in here if you work at JIR, and already have a JIR staff account.
                </p>
                <div className="text-center mt-3">
                  <img
                    src="/images/JIR_Restaurant_Building.png"
                    style={{ maxWidth: '100%', height: 370, borderRadius: '8px' }}
                    alt="Jang's International Restaurant"
                  />
                </div>
                <hr width="100%" size="5" color="white" noshade />
                <p className="small mb-0">
                  (If you are looking to log in as a restaurant <i>customer</i>{' '}
                  and accidentally clicked on this page, you may find your way to
                  the customer login page by clicking on the "<b>Customer Login</b>" button on the Navigation Bar at the top of the page, or simply by&nbsp;
                  <a href="http://localhost:5173/login">
                    <i>clicking here</i>
                  </a>
                  .)
                </p>
              </div>
            </div>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </>
  );
}

export default StaffLogin;