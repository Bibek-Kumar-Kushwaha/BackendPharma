import productModel from "../Models/product.model.js";
import supplierModel from "../Models/supplier.model.js";
import categoryModel from "../Models/category.model.js";
import creditModel from "../Models/credit.model.js"
import Handler from "../Utils/handler.js";

const productAddController = async (req, res) => {
    try {
        const { productName, costPrice, sellingPrice, MRP, supplierName, categoryName } = req.body;

        if (!productName || !costPrice || !sellingPrice) {
            return Handler(
                400,
                "Provide Product name, costPrice, sellingPrice, MRP, supplierName, and categoryName",
                true,
                false,
                res
            );
        }

        // Check if the product already exists
        const existingProduct = await productModel.findOne({name: productName });
        if (existingProduct) {
            return Handler(
                400,
                "You have already added this product",
                true,
                false,
                res
            );
        }

        // Fetch supplier and category
        const supplier = await supplierModel.findOne({ supplierName });
    
        if (!supplier) {
            return Handler(
                400,
                "Supplier not found",
                true,
                false,
                res
            );
        }

        const category = await categoryModel.findOne({ categoryName });
        if (!category) {
            return Handler(
                400,
                "Category not found",
                true,
                false,
                res
            );
        }

        // Create a new product
        const newProduct = await productModel.create({
            productName,
            costPrice,
            sellingPrice,
            MRP,
            "supplierName": supplier.supplierName,
            "categoryName": category.categoryName,
        });

        return Handler(
            200,
            "New product added successfully",
            false,
            true,
            res,
            { newProduct }
        );
    } catch (error) {
        return Handler(
            500,
            error.message || "Internal Server Error",
            true,
            false,
            res
        );
    }
};


const productUpdateController = async (req, res) => {
    try {
        const { id } = req.params;
        console.log(`Updating Product with ID: ${id}`);

        const { productName, costPrice, sellingPrice, MRP, stockQuantity, expiryDate, unit, description, supplierName, categoryName } = req.body;

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
                ...(description && { description }),
                ...(supplierName && { supplierName }),
                ...(categoryName && { categoryName })
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

        const supplier = await supplierModel.findOne({ supplierName });
        const credit = await creditModel.findOne({ name: supplierName });

        if (!supplier) {
            return Handler(
                400,
                "Supplier account are not found",
                true,
                false,
                res
            );
        }


        if (!credit) {
            credit = await creditModel.create({
                name: supplierName,
                creditAmount: costPrice * (stockQuantity || 0),
                paidAmount: 0,
                sellAmount: 0,
            });
        } else {
            credit.creditAmount += costPrice * (stockQuantity || 0); // Increment credit based on the cost price and stock quantity
            await credit.save();
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