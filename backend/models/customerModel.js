import mongoose from "mongoose";

const customerSchema = mongoose.Schema(
    {
        email: {
            type: String,
            required: true,
            unique: true
        },
        password: {
            type: String,
            required: true
        }
    }
);

export const Customer = mongoose.model('Customer', customerSchema);