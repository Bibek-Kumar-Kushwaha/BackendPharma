import { Router } from "express";
import auth from "../Middleware/auth.js";
import isAdmin from "../Middleware/admin.js";
import { getAllUserController, userAddController, userUpdateController } from "../Controllers/user.controller.js";

const userRouter = Router();

userRouter.post('/add',auth,isAdmin,userAddController);
userRouter.put('/update/:id', auth, isAdmin, userUpdateController);
userRouter.get('/get/all',auth,isAdmin,getAllUserController);

export default userRouter;