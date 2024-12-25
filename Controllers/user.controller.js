import Handler from "../Utils/handler.js"
import userModel from "../Models/user.model.js";

const userAddController = async (req, res) => {
    try {
        const { name, phone, address, role, email } = req.body;

        if (!name || !phone || !address || !role) {
            return Handler(
                400,
                "Provide name, phone, address and role are needed",
                true,
                false,
                res
            )
        }

        const existingUser = await userModel.findOne({ phone: phone });

        if (existingUser) {
            return Handler(
                400,
                "Already Register [Email or Phone]",
                true,
                false,
                res
            )
        }

        const newUser = await userModel.create(
            {
                name,
                phone,
                address,
                role,
                email
            }
        )

        return Handler(
            200,
            "User Added Successfully",
            false,
            true,
            res,
            {
                newUser
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

const userUpdateController = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, phone, email, address, role } = req.body;

        const updateUser = await userModel.findByIdAndUpdate(
            id,
            {
                ...(name && { name }),
                ...(email && { email }),
                ...(phone && { phone }),
                ...(address && { address }),
                ...(role && { role })
            },
            { new: true }
        );

        if (!updateUser) {
            return Handler(
                404,
                "User Not found",
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
                updateUser
            }
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

const getAllUserController = async(req,res) => {
    try {
    
        const allUser = await userModel.find({});
    
        return Handler(
            200,
            "All User Fetched : ",
            false,
            true,
            res,
            {
                allUser
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

export { userAddController, userUpdateController ,getAllUserController};