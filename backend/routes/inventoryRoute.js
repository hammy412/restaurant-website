import express from 'express';
import { Inventory } from '../models/inventoryModel.js';

const router = express.Router();

router.post('/', async (req, res) => {
    try {
        const { name, quantity, price } = req.body;

        if (!name || quantity === undefined || !price) {
            return res.status(400).send({
                message: 'Send all required fields',
            });
        }

        const newItem = {
            name,
            quantity,
            price,
            status: quantity <= 0 ? 'Out of Stock' : quantity < 20 ? 'Low Stock' : 'In Stock',
        };

        const item = await Inventory.create(newItem);
        return res.status(201).send(item);
    } catch (error) {
        console.log(error.message);
        return res.status(500).send({
            message: 'Internal Server Error',
        });
    }
});

router.get('/', async (req, res) => {
    try{
        const inventory = await Inventory.find({});
        return res.status(200).json({
            count: inventory.length,
            data: inventory
        });
    } catch(error) {
        console.log(error.message);
        res.status(500).send({ message : error.message });
    }
});

router.get('/:id', async (req, res) => {
    try{

        const { id } = req.params;

        const item = await Inventory.findById(id);

        return res.status(200).json(item);
    } catch(error) {
        console.log(error.message);
        res.status(500).send({ message : error.message });
    }
});

router.put('/:id', async (req, res) => {
    try {
        const { name, quantity, price } = req.body;

        if (name === undefined || quantity === undefined || price === undefined) {
            return res.status(400).send({
                message: 'Send all required fields',
            });
        }

        const { id } = req.params;
        const status = quantity <= 0 ? 'Out of Stock' : quantity < 20 ? 'Low Stock' : 'In Stock';
        const updatedItem = await Inventory.findByIdAndUpdate(id, { name, quantity, price, status }, { new: true });

        if (!updatedItem) {
            return res.status(404).json({ message: 'Item not found' });
        }

        return res.status(200).send(updatedItem);
    } catch (error) {
        console.log(error.message);
        res.status(500).send({ message: error.message });
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const item = await Inventory.findByIdAndDelete(id);

        if (!item) {
            return res.status(404).send({
                message: 'Item not found',
            });
        }

        return res.status(200).send({
            message: 'Item deleted successfully',
        });
    } catch (error) {
        console.log(error.message);
        return res.status(500).send({
            message: 'Internal Server Error',
        });
    }
});

export default router;