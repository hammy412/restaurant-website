import './create-account-styles.css';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { MDBBtn, MDBContainer, MDBRow, MDBCol, MDBInput } from 'mdb-react-ui-kit';
import NavBar from '../components/NavBar';

function CreateAccount() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleCreateAccount = () => {
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    axios
    .post('http://localhost:5555/customer', {
      name,
      email,
      password
    })
    .then((res) => {
      if (res.status === 201) {
        navigate('/login');
      }
    })
    .catch((err) => {
      setError(err.response.data.message);
    });
  }

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
              <h5>Create your account</h5>
              <MDBInput wrapperClass='mb-4' placeholder='Full Name' id='form1' type='text' value={name} onChange={(e) => setName(e.target.value)} />
              <MDBInput wrapperClass='mb-4' placeholder='Email address' id='form2' type='email' value={email} onChange={(e) => setEmail(e.target.value)} />
              <MDBInput wrapperClass='mb-4' placeholder='Password' id='form3' type='password' value={password} onChange={(e) => setPassword(e.target.value)} />
              <MDBInput wrapperClass='mb-4' placeholder='Confirm Password' id='form4' type='password' value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
              {error && <p style={{ color: 'red' }}>{error}</p>}
              <div className="text-center pt-1 mb-5 pb-1">
                <button onClick={handleCreateAccount} className="mb-4 w-100 gradient-custom-2 btn-custom">Create Account</button>
              </div>
            </div>
          </MDBCol>
          <MDBCol col='6' className="mb-5">
            <div className="d-flex flex-column justify-content-center gradient-custom-2 h-100 mb-4">
              <div className="text-white px-3 py-4 p-md-5 mx-md-4">
                <h4 className="mb-4">Join us and be part of our community</h4>
                <p className="small mb-0">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
                  tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
                  exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                </p>
              </div>
            </div>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </>
  );
}

export default CreateAccount;