import Handler from '../Utils/handler.js'
import supplierModel from "../Models/supplier.model.js";

const supplierAddController = async (req, res) => {
    try {
        const { supplierName, supplierAddress, supplierPhone, supplierEmail, creditAmount, depositeAmount, purchaseAmount } = req.body;

        if (!supplierName || !supplierPhone || !supplierAddress) {
            return Handler(
                400,
                "Provide Name, Phone and Address of Supplier",
                true,
                false,
                res
            );
        }


        const supplierData = await supplierModel.create({
            supplierName,
            supplierPhone,
            supplierAddress,
            supplierEmail,
            creditAmount,
            depositeAmount,
            purchaseAmount
        });


        return Handler(
            200,
            "Supplier information added successfully",
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
        const { supplierName, supplierAddress, supplierPhone, supplierEmail, purchaseAmount, depositeAmount } = req.body;

        // Fetch the supplier by name
        const supplier = await supplierModel.findOne({ supplierPhone });

        if (!supplier) {
            return Handler(
                400,
                "Supplier not found added first",
                true,
                false,
                res
            );
        }

        if (supplierName) supplier.supplierName = supplierName;
        if (supplierAddress) supplier.supplierAddress = supplierAddress;
        if (supplierEmail) supplier.supplierEmail = supplierEmail;
        if (supplierPhone) supplier.supplierPhone = supplierPhone;
        

        const creditAmount = purchaseAmount - (depositeAmount || 0);

        if (purchaseAmount) supplier.purchaseAmount += purchaseAmount;
        if (depositeAmount) supplier.depositeAmount += depositeAmount;


        supplier.creditAmount = supplier.purchaseAmount - supplier.depositeAmount;

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