import { Schema } from "mongoose";

export const ProductSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    description: String,
    imageURL: String,
    createdAt: {
        type: Date,
        default: Date.now
    }
});