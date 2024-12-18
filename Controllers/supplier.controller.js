import Handler from '../Utils/handler.js'
import supplierModel from "../Models/supplier.model.js";

const supplierController = async (req, res) => {
    try {

        const supplierDetails = await supplierModel.find({});
        console.log(supplierDetails)
        return Handler(
            200,
            "Supplier Data are Featched",
            false,
            true,
            res,
            {
                supplierDetails
            }
        )

    } catch (error) {
        return Handler(
            500,
            error.message || error,
            true,
            false,
            res
        )
    }
}

export { supplierController }