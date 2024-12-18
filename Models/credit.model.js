import mongoose from 'mongoose';

const creditSchema = new mongoose.Schema({
    name: {
        type: String, // Store name as a string
        required: true,
    },
    phone: {
        type: String, // Store phone as a string
        required: true,
    },
    creditAmount: {
        type: Number,
        default: 0,
    },
    paidAmount: {
        type: Number,
        default: 0,
    },
    sellAmount: {
        type: Number,
        default: 0,
    },
});

const creditModel = mongoose.model("Credit", creditSchema);
export default creditModel;
