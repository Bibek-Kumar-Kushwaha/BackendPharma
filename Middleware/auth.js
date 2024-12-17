import jwt from 'jsonwebtoken';
import adminModel from '../Models/admin.model.js';
import Handler from '../Utils/handler.js';

const auth = async (req, res, next) => {
    try {
        const token = req.cookies?.accessToken || (req.headers.authorization && req.headers.authorization.split(" ")[1]);

        if (!token) {
            return Handler(
                400,
                "Please login to access this resource",
                true,
                false,
                res
            );
        }

        const decoded = jwt.verify(token, process.env.SECRET_KEY_ACCESS_TOKEN);

        // Fetch the admin user from the database using the decoded ID
        const admin = await adminModel.findById(decoded.id);

        if (!admin) {
            return Handler(
                400,
                "Admin not found",
                true,
                false,
                res
            );
        }

        // Attach the admin object to the request
        req.adminId = admin;

        next();
    } catch (error) {
        return Handler(
            500,
            error.message || "Authentication error",
            true,
            false,
            res
        );
    }
};

export default auth;
