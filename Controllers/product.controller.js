import productModel from "../Models/product.model.js";
import Handler from "../Utils/handler.js";

const productAddController = async (req, res) => {
    try {
        const { productName, costPrice, sellingPrice, MRP } = req.body;

        if (!productName || !costPrice || !sellingPrice || !MRP) {
            400,
                "Provide Product name,costPrice,sellingPrice,MRP",
                true,
                false,
                res
        }

        const existingProduct = await productModel.findOne({ productName });

        if (existingProduct) {
            return Handler(
                400,
                "You have already Added this Product",
                true,
                false,
                res
            )
        }
        const newProduct = await productModel.create({
            productName,
            costPrice,
            sellingPrice,
            MRP
        })

        return Handler(
            200,
            "New Product Added",
            false,
            true,
            res,
            {
                newProduct
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

const productUpdateController = async (req, res) => {
    try {
        const { id } = req.params;
        console.log(`Updating Product with ID: ${id}`);

        const { productName, costPrice, sellingPrice, MRP, stockQuantity, expiryDate, unit, description } = req.body;

        const updateProduct = await productModel.findByIdAndUpdate(
            id,
            {
                ...(productName && { productName }),
                ...(costPrice && { costPrice }),
                ...(sellingPrice && { sellingPrice }),
                ...(MRP && { MRP }),
                ...(stockQuantity && { stockQuantity }),
                ...(expiryDate && { expiryDate }),
                ...(unit && { unit }),
                ...(description && { description })
            },
            { new: true }
        );

        if (!updateProduct) {
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
                updateProduct
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

const getAllProductController = async (req, res) => {
    try {

        const allProduct = await productModel.find({});

        return Handler(
            200,
            "Your all Product Fetched : ",
            false,
            true,
            res,
            {
                allProduct
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

export { productAddController, productUpdateController, getAllProductController };