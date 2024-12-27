import productModel from "../Models/product.model.js";
import supplierModel from "../Models/supplier.model.js";
import categoryModel from "../Models/category.model.js";
import creditModel from "../Models/credit.model.js"
import Handler from "../Utils/handler.js";

// Add New Product
const productAddController = async (req, res) => {
    try {
        const { productName, costPrice, sellingPrice, markPrice, supplierName, categoryName } = req.body;

        if (!productName || !costPrice || !sellingPrice) {
            return Handler(
                400,
                "Provide Product name, costPrice, sellingPrice, markPrice, supplierName, and categoryName",
                true,
                false,
                res
            );
        }

        // Check if the product already exists
        const existingProduct = await productModel.findOne({ name: productName });
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
            markPrice,
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

// Update Product
const productUpdateController = async (req, res) => {
    try {
        const { id } = req.params;

        // Destructure fields from request body
        const {
            productName,
            costPrice,
            sellingPrice,
            markPrice,
            stockQuantity,
            expiryDate,
            unit,
            description,
            supplierName,
            categoryName
        } = req.body;

        // Update the product by ID
        const updateProduct = await productModel.findByIdAndUpdate(
            id,
            {
                ...(productName && { productName }),
                ...(costPrice && { costPrice }),
                ...(sellingPrice && { sellingPrice }),
                ...(markPrice && { markPrice }),
                ...(stockQuantity && { stockQuantity }),
                ...(expiryDate && { expiryDate }),
                ...(unit && { unit }),
                ...(description && { description }),
                ...(supplierName && { supplierName }),
                ...(categoryName && { categoryName }),
            },
            { new: true } // Return the updated document
        );

        if (!updateProduct) {
            return Handler(
                404,
                "Product not found",
                true,
                false,
                res
            );
        }

        // Handle supplier credit logic
        let credit = await creditModel.findOne({ name: updateProduct.supplierName });

        if (!credit) {
            credit = await creditModel.create({
                name: supplierName,
                creditAmount: costPrice * (stockQuantity || 0),
                paidAmount: 0,
                sellAmount: 0,
            });
        } else {
            credit.creditAmount += costPrice * (stockQuantity || 0); // Update credit amount
            await credit.save();
        }

        return Handler(
            200,
            "Product updated successfully",
            false,
            true,
            res,
            {
                updateProduct,
                credit,
            }
        );
    } catch (error) {
        return Handler(
            500,
            error.message || "An error occurred",
            true,
            false,
            res
        );
    }
};

// Get All Product
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

// View All Deatils of Single Product\
const viewProductController = async (req, res) => {
    try {
        const { id } = req.params;
        const product = await productModel.findById(id);

        if (!product) {
            return Handler(
                200,
                'Product Not Found',
                false,
                true,
                res
            )
        }

        return Handler(
            200,
            'You got Your Product',
            false,
            true,
            res,
            {
                product
            }
        )
    } catch (error) {

    }
}

// delete Product
const deleteProductController = async (req, res) => {
    try {
        const { id } = req.params;
        const deleteProduct = await productModel.findByIdAndDelete(id);

        if (!deleteProduct) {
            return Handler(
                400,
                'Product Not Found',
                true,
                false,
                res
            )
        }

        return Handler(
            200,
            `Product deleted successfully`,
            false,
            true,
            res
        );

    } catch (error) {
        return Handler(
            500,
            error.message || error,
            true,
            false,
            res
        )
    }
};

export {
    productAddController,
    productUpdateController,
    getAllProductController,
    deleteProductController,
    viewProductController
};