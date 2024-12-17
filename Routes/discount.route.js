import { Router } from "express";
import auth from "../Middleware/auth.js";
import isAdmin from "../Middleware/auth.js";
import { discountAddController, discountUpdateController, getAllDiscountController } from "../Controllers/discount.controller.js";

const discountRouter = Router();

discountRouter.post('/add', auth, discountAddController);
discountRouter.put('/update/:id', auth, discountUpdateController);
discountRouter.get('/get/all',auth,isAdmin,getAllDiscountController);
export default discountRouter;