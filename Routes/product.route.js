import { Router } from "express";
import { getAllProductController, productAddController, productUpdateController } from "../Controllers/product.controller.js";
import { isAdmin, isAuthorized } from "../Middleware/auth.middleware.js";

const productRouter = Router();

productRouter.post('/add', isAuthorized, isAdmin, productAddController);
productRouter.put('/update/:id', isAuthorized, isAdmin, productUpdateController);
productRouter.get('/get/all', isAuthorized, isAdmin, getAllProductController);

export default productRouter;