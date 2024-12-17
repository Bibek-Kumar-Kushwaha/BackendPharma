import mongoose from 'mongoose';

const supplierSchema = new mongoose.Schema({
    suppliername: {
        type: String,
        required: true
    },
    supplierAddress: {
        type: String,
        default: ""
    },
    supplierPhone: {
        type: Number,
        required: true,
        unique: true
    }
});

const supplierModel = mongoose.model("Supplier", supplierSchema);
export default supplierModel;