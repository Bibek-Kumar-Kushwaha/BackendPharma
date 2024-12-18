import Handler from '../Utils/handler.js'
import supplierModel from "../Models/supplier.model.js";
import userModel from '../Models/user.model.js';

const supplierAddController = async (req, res) => {
    try {
        const { name } = req.body;

        const userData = await userModel.findOne({ name });
 
        if (!userData ) {
            return Handler(
                400,
                "User not found",
                true,
                false,
                res
            );
        }

        const supplierData = new supplierModel({
            supplierName: userData.name,
            supplierAddress: userData.address,
            supplierPhone: userData.phone,
        });

        await supplierData.save();

        return Handler(
            200,
            "Supplier data added successfully",
            false,
            true,
            res,
            {
                supplierData,
            }
        );
    } catch (error) {
        return Handler(
            500,
            error.message || error,
            true,
            false,
            res
        );
    }
};

const supplierUpdateController = async (req, res) => {
    try {
        const { name, purchaseAmount,  depositeAmount } = req.body;

        // Fetch the supplier by name
        const supplier = await supplierModel.findOne({ supplierName: name });

        if (!supplier) {
            return Handler(
                400,
                "Supplier not found",
                true,
                false,
                res
            );
        }
        // Update fields if provided
        const creditAmount = purchaseAmount - (depositeAmount || 0);

        // Update supplier's fields if values are provided
        if (purchaseAmount) supplier.purchaseAmount += purchaseAmount;
        if (depositeAmount) supplier.depositeAmount += depositeAmount;
        
        // Recalculate creditAmount based on updated values
        supplier.creditAmount = supplier.purchaseAmount - supplier.depositeAmount;
        
       

        // Save updated supplier
        await supplier.save();

        return Handler(
            200,
            "Supplier data updated successfully",
            false,
            true,
            res,
            {
                supplier,
            }
        );
    } catch (error) {
        return Handler(
            500,
            error.message || error,
            true,
            false,
            res
        );
    }
};

const supplierGetController = async (req, res) => {
    try {
        const supplierDetails = await supplierModel.find({});
        console.log(supplierDetails);

        return Handler(
            200,
            "Supplier Data fetched successfully",
            false,
            true,
            res,
            {
                supplierDetails,
            }
        );
    } catch (error) {
        return Handler(
            500,
            error.message || error,
            true,
            false,
            res
        );
    }
};


export { supplierGetController, supplierUpdateController, supplierAddController }