import mongoose from "mongoose";

const staffSchema = mongoose.Schema(
    {
        email: {
            type: String,
            required: true,
            unique: true
        },
        password: {
            type: String,
            required: true,
        }
    }
);

export const Staff = mongoose.model('Staff', staffSchema);