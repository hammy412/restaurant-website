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
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = () => {
    axios
      .post('http://localhost:5555/customer/login', {
        email,
        password,
      })
      .then((res) => {
        if (res.status === 200) {
          sessionStorage.setItem('customerToken', res.data.token);
          navigate('/reservations');
        }
      })
      .catch((err) => {
        setError(err.response.data.message);
      });
  };


  return (
    <>
      <NavBar />
      <MDBContainer className="my-5 gradient-form" style={{ marginTop: '70px' }}>
        <MDBRow>
          <MDBCol col='6' className="mb-5">
            <div className="d-flex flex-column ms-5">
              <div className="text-center">
                <img src="/images/DSA_Logo.JPEG" style={{ width: '185px' }} alt="logo" />
                <h4 className="mt-1 mb-5 pb-1">Brought to you by DSA Solutions</h4>
              </div>
              <h5>Please login to your account</h5>
              <MDBInput wrapperClass='mb-4' placeholder='Email address' id='form1' type='email' value={email} onChange={(e) => setEmail(e.target.value)} />
              <MDBInput wrapperClass='mb-4' placeholder='Password' id='form2' type='password' value={password} onChange={(e) => setPassword(e.target.value)} />
              {error && <p style={{ color: 'red' }}>{error}</p>}
              <div className="text-center pt-1 mb-5 pb-1">
                <button onClick={handleLogin} className="mb-4 w-100 gradient-custom-2 btn-custom">Sign in</button>
              </div>
              <div className="d-flex flex-row align-items-center justify-content-center pb-4 mb-4" style={{ marginTop: '-40px' }}>
                <p className="mb-0">Don't have an account?</p>
                <Link to="/create-account">
                <button className='mx-2 btn-custom'>
                  Create Account
                </button>
                </Link>
              </div>
            </div>
          </MDBCol>
          <MDBCol col='6' className="mb-5">
            <div className="d-flex flex-column justify-content-center gradient-custom-2 h-100 mb-4">
              <div className="text-white px-3 py-4 p-md-5 mx-md-4">
                <h4 className="mb-4">We are more than just a company</h4>
                <p className="small mb-0">Welcome to Jang's! To make your reservation, please log in to your account. If you're a returning guest, simply enter your credentials to access your booking preferences. New to our restaurant? Create an account in just a few easy steps to enjoy a seamless reservation experience. We look forward to serving you soon and ensuring a memorable dining experience!
                </p>
              </div>
            </div>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </>
  );
}

export default Login;