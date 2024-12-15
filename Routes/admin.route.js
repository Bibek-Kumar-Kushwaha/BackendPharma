import { adminLoginController, adminLogoutController, adminProfileController, adminRegisterController, adminUpdateController, refreshTokenController } from "../Controllers/admin.controller.js";
import { Router } from "express";
import auth from "../Middleware/auth.js";
import isAdmin from "../Middleware/admin.js";

const adminRouter = Router();

adminRouter.post('/register', adminRegisterController);
adminRouter.post('/login',adminLoginController);
adminRouter.post('/logout',auth,isAdmin,adminLogoutController);
adminRouter.put('/update',auth,isAdmin,adminUpdateController);
adminRouter.post('/refresh-token',auth,isAdmin,refreshTokenController);
adminRouter.get('/profile',auth,isAdmin,adminProfileController)

export default adminRouter;