import mongoose from "mongoose";

const counterSchema = new mongoose.Schema({
    name:{
        type: String,
        default:"invoice"
    },
    seq: {
        type: Number,
        default: 0
    }
})

const counterModel = mongoose.model("Counter", counterSchema);
export default counterModel;