import Handler from "../Utils/handler.js";

const isAdmin = (req, res, next) => {
    try {
        const admin = req.Admin;
    
        // Check if the admin exists and has the "ADMIN" role
        if (!admin || admin.role !== "ADMIN") {
            return Handler(
                403, // Use 403 for forbidden access
                "You are not authorized",
                true,
                false,
                res
            );
        }

        next();
    } catch (error) {
        return Handler(
            500,
            `Admin Authorization error: ${error.message || error}`,
            true,
            false,
            res
        );
    }
};

export default isAdmin;
