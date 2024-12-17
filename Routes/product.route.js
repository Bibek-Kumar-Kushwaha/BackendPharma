import { Router } from "express";
import auth from "../Middleware/auth.js";
import isAdmin from '../Middleware/admin.js'
import { getAllProductController, productAddController, productUpdateController } from "../Controllers/product.controller.js";

const productRouter = Router();

productRouter.post('/add',auth,productAddController);
productRouter.put('/update/:id',auth,productUpdateController);
productRouter.get('/get/all',auth,isAdmin,getAllProductController);

export default productRouter;