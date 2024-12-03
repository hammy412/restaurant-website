import express from "express";
import { PORT, mongoDBURL } from "./config.js";
import mongoose from "mongoose";
import inventoryRoute from './routes/inventoryRoute.js';
import staffRoute from './routes/staffRoute.js';
import reservationRoutes from './routes/reservationRoutes.js';
import cors from 'cors';

const app = express();

app.use(express.json());

app.use(cors());

app.get('/', (req, res) => {
    res.send('Hello World');
});

app.use('/inventory', inventoryRoute);
app.use('/staff', staffRoute);
app.use('/reservations', reservationRoutes);

mongoose
  .connect(mongoDBURL)
  .then(() => {
    console.log('App connected to database');
    app.listen(PORT, () => {
      console.log(`App is listening to port: ${PORT}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });
