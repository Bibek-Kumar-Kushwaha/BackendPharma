import discountModel from "../Models/discount.model.js";
import Handler from "../Utils/handler.js";

const discountAddController = async (req, res) => {
    try {
        const { discountName, percentage } = req.body;

        if (!discountName || !percentage) {
            return Handler(
                400,
                "Provide discountName and Percentage",
                true,
                false,
                res
            );
        }

        const existingDiscount = await discountModel.findOne({ discountName });

        if (existingDiscount) {
            return Handler(
                400,
                "You have already Added this DiscountName",
                true,
                false,
                res
            );
        }

        const newDiscount = await discountModel.create({
            discountName,
            percentage
        });

        return Handler(
            200,
            "New Discount Added",
            false,
            true,
            res,
            { newDiscount }
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
}

const discountUpdateController = async (req, res) => {
    try {
        const { id } = req.params;
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
                "Discount Not Found",
                true,
                false,
                res
            );
        }

        return Handler(
            200,
            "Discount Updated Successfully",
            false,
            true,
            res,
            { updateDiscount }
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
}

const getAllDiscountController = async (req, res) => {
    try {
        const allDiscount = await discountModel.find({});

        if (!allDiscount || allDiscount.length === 0) {
            return Handler(
                404,
                "No Discounts Found",
                true,
                false,
                res
            );
        }

        return Handler(
            200,
            "All Discounts Fetched Successfully",
            false,
            true,
            res,
            { allDiscount }
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
}

export { discountAddController, discountUpdateController, getAllDiscountController };
