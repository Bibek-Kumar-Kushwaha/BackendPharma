import categoryModel from "../Models/category.model.js";
import Handler from "../Utils/handler.js";

const categoryAddController = async (req, res) => {
    try {
        const { categoryName, description } = req.body;

        if (!categoryName || !description) {
            400,
                "Provide CategoryName and Description",
                true,
                false,
                res
        }

        const existingCategory = await categoryModel.findOne({ categoryName });

        if (existingCategory) {
            return Handler(
                400,
                "You have already Added this Category",
                true,
                false,
                res
            )
        }

        const newCategory = await categoryModel.create({
            categoryName,
            description
        })

        return Handler(
            200,
            "New Category Added",
            false,
            true,
            res,
            {
                newCategory
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

const categoryUpdateController = async (req, res) => {
    try {
        const { id } = req.params;
        console.log(`Updating Category with ID: ${id}`);

        const { categoryName, description } = req.body;

        const updateCategory = await categoryModel.findByIdAndUpdate(
            id,
            {
                ...(categoryName && { categoryName }),
                ...(description && { description })
            },
            { new: true }
        );

        if (!updateCategory) {
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
                updateCategory
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

const getAllCategoryController = async(req,res) => {
    try {
    
        const allCategory = await categoryModel.find({});
    
        return Handler(
            200,
            "All Category Fetched : ",
            false,
            true,
            res,
            {
                allCategory
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

export { categoryAddController, categoryUpdateController, getAllCategoryController };