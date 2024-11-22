{/* The Imports*/}
import React from 'react';
import { Link } from 'react-router-dom';
import './dashboard-styles.css';
import { MDBBtn, MDBContainer, MDBRow, MDBCol } from 'mdb-react-ui-kit';
import NavBar from '../components/NavBar';  // Assuming NavBar is reusable

{/* The Function */}
function StaffDashboard(){
  return(
    <>
      <NavBar />
      <MDBContainer className="my-5" style={{ marginTop: '70px' }} fluid>
        <MDBRow className="d-flex justify-content-center text-center" style={{ minHeight: '80vh' }}>
          {/* Centered Intro Text wrapped in a div */}
          <MDBCol col="12" className="mb-4">
            <div className="staff-dashboard-intro-wrapper">
              <div className="staff-dashboard-intro">
                <h4>Welcome to the Staff Dashboard</h4>
                <p><i>Use the options below to manage reservations and inventory</i>.</p>
              </div>
            </div>
          </MDBCol>

          {/* Buttons for Reservation and Inventory Dashboards (side-by-side) */}
          <MDBRow className="w-100 d-flex justify-content-center">
            <MDBCol col="12" md="5" className="mb-4 d-flex justify-content-center">
              <Link to="/reservation-dashboard" className="w-100">
                <MDBBtn className="dashboard-btn" size="lg" color="primary">
                  <span>Reservation Dashboard</span>
                  <img
                    src="/public/images/Reservation_dashboard_pic.png"
                    alt="Reservation"
                    className="dashboard-img"
                  />
                </MDBBtn>
              </Link>
            </MDBCol>

            <MDBCol col="12" md="5" className="mb-4 d-flex justify-content-center">
              <Link to="/inventory-dashboard" className="w-100">
                <MDBBtn className="dashboard-btn" size="lg" color="secondary">
                  <span>Inventory Dashboard</span>
                  <img
                    src="/public/images/Inventory_dashboard_pic.png"
                    alt="Inventory"
                    className="dashboard-img"
                  />
                </MDBBtn>
              </Link>
            </MDBCol>
          </MDBRow>
        </MDBRow>
      </MDBContainer>
    </>
  );
}

export default StaffDashboard;