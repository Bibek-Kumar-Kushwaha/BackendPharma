import adminModel from "../Models/admin.model.js";
import generateAccessToken from "../Utils/generateAccessToken.js";
import generateRefreshToken from "../Utils/generateRefreshToken.js";
import Handler from "../Utils/handler.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const adminRegisterController = async (req, res) => {

    try {
        const { name, phone, email, password, role } = req.body;

        if (!name || !phone || !email || !password || !role) {
            return Handler(
                400,
                "Provide name, email, phone, role and password",
                true,
                false,
                res
            );
        }

        const existingUser = await adminModel.findOne({
            $or: [{ phone: phone }, { email: email }],
        });

        if (existingUser) {
            return Handler(
                400,
                "You have already Register",
                true,
                false,
                res
            )
        }

        const saltRound = 10;
        const hashedPassword = await bcrypt.hash(password, saltRound);

        //check is want to register without any premission of admin
        if (role === "ADMIN") {
            return Handler(
                400,
                "You haven't register. Only Admin can Add you",
                true,
                false,
                res
            )
        }

        const newAdmin = await adminModel.create({
            name,
            email,
            password: hashedPassword,
            phone
        })

        return Handler(
            201,
            "User registered successfully",
            false,
            true,
            res,
            {
                id: newAdmin._id,
                name: newAdmin.name,
                email: newAdmin.email,
                phone: newAdmin.phone
            },
        );
    } catch (error) {

        return Handler(
            500,
            `Internal Server Error: ${error.message}`,
            true,
            false,
            res
        );
    }
};

const adminLoginController = async (req, res) => {
    try {
        const { phone, email, password } = req.body;

        if (!phone && !email) {
            return Handler(
                400,
                "Provide Phone or Email and Password",
                true,
                false,
                res
            )
        }

        if (!password) {
            return Handler(
                400,
                "Provide Phone or Email and Password",
                true,
                false,
                res
            )
        }

        const existingUser = await adminModel.findOne({
            $or: [{ phone }, { email }]
        });

        if (!existingUser) {
            return Handler(
                400,
                "You Haven't register ",
                true,
                false,
                res
            )
        }

        const isCorrectPassword = await bcrypt.compare(password, existingUser.password);


        if (!isCorrectPassword) {
            return Handler(
                400,
                "Your Credentials do not match",
                true,
                false,
                res
            )
        }

        const accessToken = await generateAccessToken(existingUser._id);
        const refreshToken = await generateRefreshToken(existingUser._id);

        const cookiesOption = {
            httpOnly: true,
            secure: true,
            sameSite: "None"
        }

        res.cookie('accessToken', accessToken, cookiesOption);
        res.cookie('refreshToken', refreshToken, cookiesOption);

        return Handler(
            200,
            "Successfully Logged in",
            false,
            true,
            res,
            {
                accessToken,
                refreshToken
            }
        )

    } catch (error) {
        return Handler(
            400,
            `Error on Login: ${error.message}`,
            true,
            false,
            res
        )
    }
}

const adminLogoutController = async (req, res) => {
    try {

        const adminId = req.adminId;

        if (!adminId) {
            return Handler(
                400,
                "User ID not found. Unauthorized request.",
                true,
                false,
                res
            )
        }

        const cookiesOption = {
            httpOnly: true,
            secure: true,
            sameSite: "None",
        };

        res.clearCookie("accessToken", cookiesOption);
        res.clearCookie("refreshToken", cookiesOption);

        const removeRefreshToken = await adminModel.findByIdAndUpdate(adminId, {
            refreshToken: "",
        });

        if (!removeRefreshToken) {
            return Handler(
                400,
                "Failed to log out. User not found.",
                true,
                false,
                res
            )
        }

        return Handler(
            200,
            "Logout Successfully",
            false,
            true,
            res
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

const adminUpdateController = async (req, res) => {
    try {
        const adminId = req.adminId;
        const { name, phone, email, password } = req.body;

        let hashedPassword = "";

        if (password) {
            const saltRound = 10;
            hashedPassword = await bcrypt.hash(password, saltRound)
        }

        const updateAdmin = await adminModel.findByIdAndUpdate(
            adminId,
            {
                ...(name && { name }),
                ...(email && { email }),
                ...(phone && { phone }),
                ...(password && { password: hashedPassword })
            },
            { new: true }
        )

        if (!updateAdmin) {
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
                updateAdmin
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

const refreshTokenController = async (req, res) => {
    try {
        const refreshToken = req.cookies.refreshToken || req?.hearders?.authorization?.split(" ")[1];
        if (!refreshToken) {
            return Handler(
                400,
                "Invalid Token",
                true,
                false,
                res
            )
        }

        const verifyToken = await jwt.verify(refreshToken, process.env.SECRET_KEY_REFRESH_TOKEN);

        if (!verifyToken) {
            return Handler(
                400,
                "Token is expired",
                true,
                false,
                res
            )
        }

        const adminId = verifyToken?._id;
        const newAccessToken = await generateAccessToken(adminId);

        const cookiesOption = {
            httpOnly: true,
            secure: true,
            sameSite: "None"
        }

        res.cookie('accessToken', newAccessToken, cookiesOption)

        return Handler(
            200,
            "New Access Token Generated",
            false,
            true,
            res,
            newAccessToken
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

const adminProfileController = async (req, res) => {
    try {
        const admin = req.adminId;

        if (!admin) {
            return Handler(
                400,
                "Admin not found. Please log in again.",
                true,
                false,
                res
            );
        }

        return Handler(
            200,
            "Admin profile fetched successfully",
            false,
            true,
            res,
            {
                id: admin._id,
                name: admin.name,
                email: admin.email,
                role: admin.role,
                phone: admin.phone,
                avatar: admin.avatar,
                createdAt: admin.createdAt,
                updatedAt: admin.updatedAt,
            }
        );
    } catch (error) {
        return Handler(
            500,
            `Error fetching admin profile: ${error.message || error}`,
            true,
            false,
            res
        );
    }
};

const getAllAdminController = async(req,res) => {
    try {
    
        const allAdmin = await adminModel.find({});
    
        return Handler(
            200,
            "All Admin Fetched : ",
            false,
            true,
            res,
            {
                allAdmin
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

export { adminRegisterController, adminLoginController, adminLogoutController, adminUpdateController, refreshTokenController, adminProfileController, getAllAdminController };
