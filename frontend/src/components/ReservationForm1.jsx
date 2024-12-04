import React, { useState } from 'react';
import { MDBInput, MDBBtn, MDBModal, MDBModalDialog, MDBModalContent, MDBModalHeader, MDBModalTitle, MDBModalBody, MDBModalFooter } from 'mdb-react-ui-kit';
import axios from 'axios';

export default function ReservationForm1({
  partySize, setPartySize,
  date, setDate,
  time, setTime,
  onSubmit
}) {
  const [availability, setAvailability] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState('');

  const checkAvailability = async () => {
    try {
      console.log('Checking availability...');
      const response = await axios.post('http://localhost:5555/reservations/check-availability', {
        date,
        time,
        partySize
      });
      console.log('Availability response:', response.data);
      setAvailability(response.data.available);
      setModalMessage(response.data.available ? 'Reservation is available!' : 'Sorry, no availability.');
      setModalOpen(true);
      console.log('Modal should open now'); // Add this log

      if (response.data.available) {
        onSubmit();
      }
    } catch (error) {
      console.error('Error checking availability:', error);
      setModalMessage('An error occurred while checking availability.');
      setModalOpen(true);
      console.log('Modal should open now due to error'); // Add this log

    }
  };

  const timeSlots = [
    '12:00 PM', '12:30 PM', '1:00 PM', '1:30 PM', '2:00 PM', '2:30 PM',
    '3:00 PM', '3:30 PM', '4:00 PM', '4:30 PM', '5:00 PM', '5:30 PM',
    '6:00 PM', '6:30 PM', '7:00 PM', '7:30 PM', '8:00 PM', '8:30 PM',
    '9:00 PM', '9:30 PM', '10:00 PM', '10:30 PM', '11:00 PM', '11:30 PM'
  ];
  return (
    <>
      <form onSubmit={(e) => {
        e.preventDefault();
        checkAvailability();
      }}>
        <div></div>
        <h5>Find a Table</h5>
        <MDBInput
          wrapperClass='mb-4'
          label='Party Size'
          id='partySize'
          type='number'
          min='1'
          max='8'
          value={partySize}
          onChange={(e) => setPartySize(e.target.value)}
          required
        />
        <MDBInput
          wrapperClass='mb-4'
          label='Date'
          id='date'
          type='date'
          value={date}
          onChange={(e) => setDate(e.target.value)}
          required
        />
        <div className="mb-4">
          <label htmlFor="time">Time</label>
          <select
            id="time"
            className="form-select"
            value={time}
            onChange={(e) => setTime(e.target.value)}
            required
          >
            <option value="" disabled>Select a time</option>
            {timeSlots.map((slot) => (
              <option key={slot} value={slot}>{slot}</option>
            ))}
          </select>
        </div>
        <div className="text-center pt-1 mb-5 pb-1">
          <MDBBtn className="mb-4 w-100 gradient-custom-2" type="submit">Check Availability</MDBBtn>
        </div>
      </form>



      <MDBModal show={modalOpen} setShow={setModalOpen} tabIndex='-1' style={{ display: 'block', opacity: 1 }}>
        <MDBModalDialog>
          <MDBModalContent>
            <MDBModalHeader>
              <MDBModalTitle>Availability Status</MDBModalTitle>
              <MDBBtn className='btn-close' color='none' onClick={() => setModalOpen(false)}></MDBBtn>
            </MDBModalHeader>
            <MDBModalBody>
              {modalMessage}
            </MDBModalBody>
            <MDBModalFooter>
              <MDBBtn color='secondary' onClick={() => setModalOpen(false)}>Close</MDBBtn>
            </MDBModalFooter>
          </MDBModalContent>
        </MDBModalDialog>
      </MDBModal>
    </>
  );
}