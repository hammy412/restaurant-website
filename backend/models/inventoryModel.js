import mongoose from "mongoose"

const inventorySchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        quantity: {
            type: Number,
            required: true,
        },
        price: {
            type: Number,
            required: true,
        },
        status: {
            type: String,
        }
    }
);

export const Inventory = mongoose.model('Inventory', inventorySchema);