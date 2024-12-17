import discountModel from "../Models/discount.model.js";
import Handler from "../Utils/handler.js";

const discountAddController = async (req, res) => {
    try {
        const { discountName, percentage } = req.body;

        if (!discountName || !percentage) {
            400,
                "Provide discountName and Percentage",
                true,
                false,
                res
        }

        const existingDiscount = await discountModel.findOne({ discountName });

        if (existingDiscount) {
            return Handler(
                400,
                "You have already Added this DiscountName",
                true,
                false,
                res
            )
        }

        const newDiscount = await discountModel.create({
            discountName,
            percentage
        })

        return Handler(
            200,
            "New Category Added",
            false,
            true,
            res,
            {
                newDiscount
            }
        )

    } catch (error) {
        return Handler(
            500,
            error.message || message,
            true,
            false,
            res
        )
    }
}

const discountUpdateController = async (req, res) => {
    try {
        const { id } = req.params;
        console.log(`Updating Discount with ID: ${id}`);

        const { discountName, percentage } = req.body;

        const updateDiscount = await discountModel.findByIdAndUpdate(
            id,
            {
                ...(discountName && { discountName }),
                ...(percentage && { percentage })
            },
            { new: true }
        );

        if (!updateDiscount) {
            return Handler(
                400,
                "Product Not Found",
                true,
                false,
                res
            )
        }

        return Handler(
            200,
            "Updated Successfully",
            false,
            true,
            res,
            {
                updateDiscount
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

const getAllDiscountController = async(req,res) => {
    try {
    
        const allDiscount = await discountModel.find({});
    
        return Handler(
            200,
            "All Discount Fetched : ",
            false,
            true,
            res,
            {
                allDiscount
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

export { discountAddController, discountUpdateController, getAllDiscountController };