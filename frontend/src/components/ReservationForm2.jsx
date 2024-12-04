//////STEP TWO OF BOOOKING RESERVATION
import React from 'react';
import { MDBInput, MDBBtn } from 'mdb-react-ui-kit';

export default function ReservationForm2({
  name, setName,
  email, setEmail,
  phoneNumber, setPhoneNumber,
  onSubmit
}) {
  return (
    <form onSubmit={(e) => {
      e.preventDefault();
      onSubmit();
    }}>
      <h5>Confirm Your Details</h5>
      <MDBInput
        wrapperClass='mb-4'
        label='Name'
        id='name'
        type='text'
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
      <MDBInput
        wrapperClass='mb-4'
        label='Email'
        id='email'
        type='email'
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <MDBInput
        wrapperClass='mb-4'
        label='Phone Number'
        id='phoneNumber'
        type='number'
        value={phoneNumber}
        onChange={(e) => setPhoneNumber(e.target.value)}
        required
      />
      <div className="text-center pt-1 mb-5 pb-1">
        <MDBBtn className="mb-4 w-100 gradient-custom-2" type="submit">Confirm Reservation</MDBBtn>
      </div>
    </form>
  );
}