import { adminLoginController, adminLogoutController, adminProfileController, adminRegisterController, adminUpdateController, getAllAdminController, refreshTokenController } from "../Controllers/admin.controller.js";
import { Router } from "express";
import { isAdmin, isAuthorized } from "../Middleware/auth.middleware.js";

const adminRouter = Router();

adminRouter.post('/register', isAuthorized, isAdmin, adminRegisterController);
adminRouter.post('/login', adminLoginController);
adminRouter.post('/logout', isAuthorized, isAdmin, adminLogoutController);
adminRouter.put('/update/:id', isAuthorized, isAdmin, adminUpdateController);
adminRouter.post('/refresh-token', isAuthorized, refreshTokenController);
adminRouter.get('/profile', isAuthorized, isAdmin, adminProfileController);
adminRouter.get('/get/all', isAuthorized, isAdmin, getAllAdminController);

export default adminRouter;