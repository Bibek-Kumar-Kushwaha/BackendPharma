import mongoose from 'mongoose';

const creditSchema = new mongoose.Schema({
    userName: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    userId: {
        type: mongoose.Schema.ObjectId,
        required: true
    }
});

const creditModel = mongoose.model("Credit", creditSchema);
export default creditModel;