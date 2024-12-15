import { Router } from "express";
import auth from "../Middleware/auth.js";
import isAdmin from "../Middleware/admin.js";
import { userAddController, userUpdateController } from "../Controllers/user.controller.js";

const userRouter = Router();

userRouter.post('/add',auth,isAdmin,userAddController);
userRouter.put('/update/:id', auth, isAdmin, userUpdateController);

export default userRouter;