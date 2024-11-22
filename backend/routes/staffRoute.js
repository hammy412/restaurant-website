import express from 'express';
import { Staff } from '../models/staffModel.js';

const router = express.Router();

// this post method adds a new staff member to the database
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

//this get method retrieves the current staff database
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

//this post method logs in a staff member
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