import express from 'express';
import { Staff } from '../models/staffModel.js';

const router = express.Router();

router.post('/', async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).send({
                message: 'Send all required fields',
            });
        }

        const newStaff = {
            email,
            password
        };

        const staff = await Staff.create(newStaff);
        return res.status(201).send(staff);
    } catch (error) {
        console.log(error.message);
        return res.status(500).send({
            message: 'Internal Server Error',
        });
    }
});

router.get('/', async (req, res) => {
    try{
        const staff = await Staff.find({});
        return res.status(200).json({
            count: staff.length,
            data: staff
        });
    } catch(error) {
        console.log(error.message);
        res.status(500).send({ message : error.message });
    }
});

router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).send({
                message: 'Send all required fields',
            });
        }

        const staff = await Staff.findOne({ email, password });
        if (!staff) {
            return res.status(400).send({
                message: 'Invalid credentials',
            });
        }

        return res.status(200).send(staff);
    } catch (error) {
        console.log(error.message);
        return res.status(500).send({
            message: 'Internal Server Error',
        });
    }
});

export default router;