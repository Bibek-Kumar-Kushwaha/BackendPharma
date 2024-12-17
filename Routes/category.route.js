import { Router } from "express";
import auth from "../Middleware/auth.js";
import isAdmin from "../Middleware/auth.js";
import { categoryAddController, categoryUpdateController, getAllCategoryController } from "../Controllers/category.controller.js";

const categoryRouter = Router();

categoryRouter.post('/add', auth, categoryAddController);
categoryRouter.put('/update/:id', auth, categoryUpdateController);
categoryRouter.get('/get/all',auth,isAdmin,getAllCategoryController);
export default categoryRouter;