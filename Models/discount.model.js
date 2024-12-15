import mongoose from "mongoose";

const discountSchema = new mongoose.Schema({
  discountName: {
    type: String,
    default: null
  },
  percentage: {
    type: Number,
    default: 0
  }
},
  {
    timestamps: true
  }
);

const discountModel = mongoose.model("Discount", discountSchema);
export default discountModel;