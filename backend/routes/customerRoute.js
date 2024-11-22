import express from "express";
import { Customer } from "../models/customerModel.js";

const router = express.Router();

//create a new customer (use in registration)
router.post("/", async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).send({
                message: "Send all required fields",
            });
        }

        // Check if the customer already exists
        const existingCustomer = await Customer.findOne({ email });
        if (existingCustomer) {
            return res.status(400).send({
                message: "Customer with this email already exists",
            });
        }

        const newCustomer = {
            email,
            password,
        };

        const customer = await Customer.create(newCustomer);
        return res.status(201).send(customer);
    } catch (error) {
        console.log(error.message);
        return res.status(500).send({
            message: "Internal Server Error",
        });
    }
});

//get current customer database
router.get("/", async (req, res) => {
    try {
        const customers = await Customer.find({});
        return res.status(200).json({
            count: customers.length,
            data: customers,
        });
    } catch (error) {
        console.log(error.message);
        res.status(500).send({ message: error.message });
    }
});

//login a customer
router.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).send({
                message: "Send all required fields",
            });
        }

        const customer = await Customer.findOne({ email, password });
        if (!customer) {
            return res.status(400).send({
                message: "Invalid credentials",
            });
        }

        return res.status(200).send(customer);
    } catch (error) {
        console.log(error.message);
        return res.status(500).send({
            message: "Internal Server Error",
        });
    }
});

export default router;