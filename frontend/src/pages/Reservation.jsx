import './create-account-styles.css';
import React, { useState } from 'react';
import { MDBContainer, MDBRow, MDBCol, MDBModal, MDBModalDialog, MDBModalContent, MDBModalHeader, MDBModalTitle, MDBModalBody, MDBModalFooter, MDBBtn } from 'mdb-react-ui-kit';
import NavBar from '../components/NavBar';
import ReservationForm1 from '../components/ReservationForm1';
import ReservationForm2 from '../components/ReservationForm2';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Reservations() {
  const [step, setStep] = useState(1);
  const [partySize, setPartySize] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [confirmationModalOpen, setConfirmationModalOpen] = useState(false);
  const navigate = useNavigate();

  const handleForm1Submit = () => {
    setStep(2);
  };

  const handleForm2Submit = async () => {
    try {
      const response = await axios.post('http://localhost:5555/reservations', {
        name,
        email,
        phoneNumber,
        partySize,
        date,
        time
      });
      console.log('Reservation confirmed:', response.data);
      setConfirmationModalOpen(true);
      navigate('/');
    } catch (error) {
      console.error('Error creating reservation:', error);
    }
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
              {step === 1 ? (
                <ReservationForm1
                  partySize={partySize}
                  setPartySize={setPartySize}
                  date={date}
                  setDate={setDate}
                  time={time}
                  setTime={setTime}
                  onSubmit={handleForm1Submit}
                />
              ) : (
                <ReservationForm2
                  name={name}
                  setName={setName}
                  email={email}
                  setEmail={setEmail}
                  phoneNumber={phoneNumber}
                  setPhoneNumber={setPhoneNumber}
                  onSubmit={handleForm2Submit}
                />
              )}
            </div>
          </MDBCol>
          <MDBCol col='6' className="mb-5">
            <div className="d-flex flex-column justify-content-center gradient-custom-2 h-100 mb-4">
              <div className="text-white px-3 py-4 p-md-5 mx-md-4">
                <h4 className="mb-4">Make a Reservation</h4>
                <p className="small mb-0">Reserve your table at Jang's for an unforgettable dining experience. Whether you're celebrating a special occasion or enjoying a night out, we’re here to ensure you have a memorable time. Simply select your preferred date, time, and party size, and we’ll take care of the rest. We look forward to welcoming you!
                </p>
              </div>
            </div>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
      <MDBModal show={confirmationModalOpen} setShow={setConfirmationModalOpen} tabIndex='-1'>
        <MDBModalDialog>
          <MDBModalContent>
            <MDBModalHeader>
              <MDBModalTitle>Reservation Confirmed</MDBModalTitle>
              <button type="button" className="btn-close" aria-label="Close" onClick={() => setConfirmationModalOpen(false)}></button>
            </MDBModalHeader>
            <MDBModalBody>
              Your reservation has been successfully created.
            </MDBModalBody>
            <MDBModalFooter>
            <button className="btn-custom" onClick={() => setConfirmationModalOpen(false)}>Close</button>
            </MDBModalFooter>
          </MDBModalContent>
        </MDBModalDialog>
      </MDBModal>
      
    </>
  );
}

export default Reservations;