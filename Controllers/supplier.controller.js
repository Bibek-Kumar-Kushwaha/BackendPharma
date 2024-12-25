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
        const { id } = req.params;
        const {
            supplierName,
            supplierAddress,
            supplierPhone,
            supplierEmail,
            purchaseAmount = 0,
            depositeAmount = 0,
        } = req.body;

        // Find and update supplier
        const updateSupplier = await supplierModel.findByIdAndUpdate(
            id,
            {
                ...(supplierName && { supplierName }),
                ...(supplierPhone && { supplierPhone }),
                ...(supplierEmail && { supplierEmail }),
                ...(supplierAddress && { supplierAddress }),
            },
            { new: true }
        );

        if (!updateSupplier) {
            return Handler(
                400,
                "Supplier not found, please add the supplier first.",
                true,
                false,
                res
            );
        }

        // Update financial fields
        updateSupplier.purchaseAmount += Number(purchaseAmount);
        updateSupplier.depositeAmount += Number(depositeAmount);
        updateSupplier.creditAmount =
            updateSupplier.purchaseAmount - updateSupplier.depositeAmount;

        // Save the updated supplier
        await updateSupplier.save();

        return Handler(
            200,
            "Supplier data updated successfully",
            false,
            true,
            res,
            {
                supplier: updateSupplier,
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