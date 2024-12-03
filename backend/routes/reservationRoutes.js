import express from 'express';
import { Reservation } from '../models/reservationModel.js';
import { isAuthenticated } from '../middleware/authMiddleware.js';

const router = express.Router();

// Check reservation availability
// Check reservation availability
router.post('/check-availability', async (req, res) => {
  const { date, time, partySize } = req.body;

  try {
    const reservations = await Reservation.find({ date, time });
    const totalPartySize = reservations.reduce((total, reservation) => total + reservation.partySize, 0);

    // Assuming the restaurant has a maximum capacity of 50
    const maxCapacity = 45;
    const available = totalPartySize + partySize <= maxCapacity;

    res.status(200).json({ available });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get all reservations (unprotected route)
router.get('/dashboard', async (req, res) => {
    try {
      const reservations = await Reservation.find();
      res.status(200).json(reservations);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });
  
  // Create a new reservation
  router.post('/', async (req, res) => {
    const { name, email, phoneNumber, partySize, date, time } = req.body;
  
    try {
      const newReservation = new Reservation({
        name,
        email,
        phoneNumber,
        partySize,
        date,
        time,
      });
  
      const savedReservation = await newReservation.save();
      res.status(201).json(savedReservation);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  });


//Get all reservations (protected route)
router.get('/dashboard', isAuthenticated, async (req, res) => {
    try {
      const reservations = await Reservation.find();
      res.status(200).json(reservations);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });

// Get a single reservation by ID (unprotected route)
router.get('/:id', async (req, res) => {
    try {
      const reservation = await Reservation.findById(req.params.id);
      if (reservation) {
        res.status(200).json(reservation);
      } else {
        res.status(404).json({ message: 'Reservation not found' });
      }
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });

// Update a reservation by ID
router.put('/:id', async (req, res) => {
    const { name, email, phoneNumber, partySize, date, time, status } = req.body;
  
    try {
      const reservation = await Reservation.findById(req.params.id);
      if (reservation) {
        reservation.name = name || reservation.name;
        reservation.email = email || reservation.email;
        reservation.phoneNumber = phoneNumber || reservation.phoneNumber;
        reservation.partySize = partySize || reservation.partySize;
        reservation.date = date || reservation.date;
        reservation.time = time || reservation.time;
        reservation.status = status || reservation.status;
  
        const updatedReservation = await reservation.save();
        res.status(200).json(updatedReservation);
      } else {
        res.status(404).json({ message: 'Reservation not found' });
      }
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  });

// Delete a reservation by ID
router.delete('/:id', async (req, res) => {
    try {
      const reservation = await Reservation.findById(req.params.id);
      if (reservation) {
        await Reservation.deleteOne({ _id: req.params.id });
        res.status(200).json({ message: 'Reservation deleted' });
      } else {
        res.status(404).json({ message: 'Reservation not found' });
      }
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });
export default router; 