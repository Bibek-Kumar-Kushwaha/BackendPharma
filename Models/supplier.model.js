import mongoose from 'mongoose';

const supplierSchema = new mongoose.Schema({
    supplierName: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: true
    },
    supplierAddress: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
    },
    supplierPhone: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
    },
    creditAmount: {
        type: Number,
        default: 0
    },
    depositeAmount: {
        type: Number,
        default: 0
    },
    purchaseAmount: {
        type: Number,
        default: 0
    }
});

const supplierModel = mongoose.model("Supplier", supplierSchema);
export default supplierModel;