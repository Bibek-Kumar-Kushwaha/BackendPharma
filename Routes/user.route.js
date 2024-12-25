import { Router } from "express";
import { getAllUserController, userAddController, userUpdateController } from "../Controllers/user.controller.js";
import { isAdmin, isAuthorized } from "../Middleware/auth.middleware.js";

const userRouter = Router();

userRouter.post('/add', isAuthorized, isAdmin, userAddController);
userRouter.put('/update/:id', isAuthorized, isAdmin, userUpdateController);
userRouter.get('/get/all', isAuthorized, isAdmin, getAllUserController);

export default userRouter;