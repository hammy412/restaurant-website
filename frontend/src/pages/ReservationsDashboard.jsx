import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { MDBContainer, MDBRow, MDBCol, MDBTable, MDBTableBody, MDBTableHead, MDBBtn, MDBModal, MDBModalDialog, MDBModalContent, MDBModalHeader, MDBModalTitle, MDBModalBody, MDBModalFooter, MDBInput } from 'mdb-react-ui-kit';
import NavBar from '../components/NavBar';

const ReservationsDashboard = () => {
  const [reservations, setReservations] = useState([]);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [currentReservation, setCurrentReservation] = useState(null);
  const [sortCriteria, setSortCriteria] = useState('date');
  const [sortOrder, setSortOrder] = useState('asc');

  useEffect(() => {
    const fetchReservations = async () => {
      try {
        const response = await axios.get('http://localhost:5555/reservations/dashboard');
        setReservations(response.data);
      } catch (error) {
        console.error('Error fetching reservations:', error);
      }
    };

    fetchReservations();
  }, []);

  const deleteReservation = async (id) => {
    try {
      await axios.delete(`http://localhost:5555/reservations/${id}`);
      setReservations(reservations.filter(reservation => reservation._id !== id));
    } catch (error) {
      console.error('Error deleting reservation:', error);
    }
  };

  const sortReservations = (reservations, criteria, order) => {
    return reservations.sort((a, b) => {
      if (criteria === 'date') {
        const dateA = new Date(a.date);
        const dateB = new Date(b.date);
        return order === 'asc' ? dateA - dateB : dateB - dateA;
      }
      // Add more sorting criteria if needed
      return 0;
    });
  };

  const openEditModal = (reservation) => {
    setCurrentReservation(reservation);
    setEditModalOpen(true);
  };

  const closeEditModal = () => {
    setEditModalOpen(false);
    setCurrentReservation(null);
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setCurrentReservation({ ...currentReservation, [name]: value });
  };

  const saveReservation = async () => {
    try {
      const response = await axios.put(`http://localhost:5555/reservations/${currentReservation._id}`, {
        status: currentReservation.status
      });
      setReservations(reservations.map(reservation => reservation._id === currentReservation._id ? response.data : reservation));
      closeEditModal();
    } catch (error) {
      console.error('Error updating reservation:', error);
    }
  };

  return (
    <>
      <NavBar />
      <MDBContainer className="my-5">
        <MDBRow>
          <MDBCol>
          <div className="d-flex justify-content-between align-items-center mb-4">
          <h2>Reservations Dashboard</h2>
          <div>
            <label htmlFor="sortCriteria" className="me-2">Sort by:</label>
            <select
              id="sortCriteria"
              value={sortCriteria}
              onChange={(e) => setSortCriteria(e.target.value)}
              className="me-2"
            >
              <option value="date">Date</option>
              {/* Add more options if needed */}
            </select>
            <select
              id="sortOrder"
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value)}
            >
              <option value="asc">Ascending</option>
              <option value="desc">Descending</option>
            </select>
          </div>
        </div>
            <MDBTable>
              <MDBTableHead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Phone Number</th>
                  <th>Party Size</th>
                  <th>Date</th>
                  <th>Time</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </MDBTableHead>
              <MDBTableBody>
                {reservations.map((reservation) => (
                  <tr key={reservation._id}>
                    <td>{reservation.name}</td>
                    <td>{reservation.email}</td>
                    <td>{reservation.phoneNumber}</td>
                    <td>{reservation.partySize}</td>
                    <td>{new Date(reservation.date).toLocaleDateString()}</td>
                    <td>{reservation.time}</td>
                    <td>{reservation.status}</td>
                    <td>
                      <MDBBtn color="danger" size="sm" onClick={() => deleteReservation(reservation._id)}>Delete</MDBBtn>
                    </td>
                  </tr>
                ))}
              </MDBTableBody>
            </MDBTable>
          </MDBCol>
        </MDBRow>
      </MDBContainer>

      {currentReservation && (
        <MDBModal show={editModalOpen} setShow={setEditModalOpen} tabIndex='-1'>
          <MDBModalDialog>
            <MDBModalContent>
              <MDBModalHeader>
                <MDBModalTitle>Edit Reservation Status</MDBModalTitle>
                <MDBBtn className='btn-close' color='none' onClick={closeEditModal}></MDBBtn>
              </MDBModalHeader>
              <MDBModalBody>
                <div className="mb-4">
                  <label htmlFor="status">Status</label>
                  <select
                    id="status"
                    className="form-select"
                    name="status"
                    value={currentReservation.status}
                    onChange={handleEditChange}
                    required
                  >
                    <option value="Pending">Pending</option>
                    <option value="Confirmed">Confirmed</option>
                    <option value="Complete">Complete</option>
                  </select>
                </div>
              </MDBModalBody>
              <MDBModalFooter>
                <MDBBtn color='secondary' onClick={closeEditModal}>Close</MDBBtn>
                <MDBBtn color='primary' onClick={saveReservation}>Save changes</MDBBtn>
              </MDBModalFooter>
            </MDBModalContent>
          </MDBModalDialog>
        </MDBModal>
      )}
    </>
  );
};

export default ReservationsDashboard;