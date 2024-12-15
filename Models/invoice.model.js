import mongoose from "mongoose";

const invoiceSchema = new mongoose.Schema({
    name: {
        type: mongoose.Schema.ObjectId,
        ref: "User"
    },
    phone: {
        type: mongoose.Schema.ObjectId,
        ref: "User"
    },
    address: {
        type: mongoose.Schema.ObjectId,
        ref: "User"
    },
    billNumber: {
        type: String,
        default: null
    },
    date: {
        type: Date,
        default: Date.now()
    },
    userId: {
        type: mongoose.Schema.ObjectId,
        ref: "User"
    },
    SN: {
        type: Number,
        default: 1
    },
    productName: {
        type: mongoose.Schema.ObjectId,
        ref: "Product"
    },
    quantity: {
        type: Number,
        default: 1
    },
    costPrice: {
        type: mongoose.Schema.ObjectId,
        ref: "Product"
    },
    amount: {
        type: Number,
        default: 0
    },
    grandTotal: {
        type: Number,
        default: 0
    },
    discountName: {
        type: mongoose.Schema.ObjectId,
        default: 0
    }
},
    {
        timestamps: true
    }
)

const invoiceModel = mongoose.model("Invoice", invoiceSchema);
export default invoiceModel;