import express from 'express';
import { Inventory } from '../models/inventoryModel.js';

const router = express.Router();

router.post('/', async (req, res) => {
    try {
        if (
            !req.body.name ||
            !req.body.quantity ||
            !req.body.price ||
            !req.body.status
        ) {
            return res.status(400).send({
                message: 'Send all required fields',
            });
        }
        const newItem = {
            name: req.body.name,
            quantity: req.body.quantity,
            price: req.body.price,
            status: req.body.status,
        };

        const item = await Inventory.create(newItem);
        return res.status(201).send(item);
    } catch(error) {
        console.log(error.message);
        res.status(500).send({ message : error.message });
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
    try{
        if (
            !req.body.name ||
            !req.body.quantity ||
            !req.body.price ||
            !req.body.status
        ) {
            return res.status(400).send({
                message: 'Send all required fields',
            });
        }

        const { id } = req.params;
        const result = await Inventory.findByIdAndUpdate(id, req.body);
        if (!result) {
            return res.status(404).json({ message: 'Item not found' });
        }
        return res.status(200).send( { message: 'Item updated successfully' });

    } catch(error) {
        console.log(error.message);
        res.status(500).send({ message : error.message });
    }
});

router.delete('/:id', async (req, res) => {
    try{

        const { id } = req.params;

        const result = await Inventory.findByIdAndDelete(id);

        if (!result){
            return res.status(404).json({ message: 'Item not found' });
        }

        return res.status(200).send({ message: 'Item deleted successfully' });
    } catch(error) {
        console.log(error.message);
        res.status(500).send({ message : error.message });
    }
});

export default router;