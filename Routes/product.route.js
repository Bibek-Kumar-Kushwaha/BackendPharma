import { Router } from "express";
import auth from "../Middleware/auth.js";
import { productAddController, productUpdateController } from "../Controllers/product.controller.js";

const productRouter = Router();

productRouter.post('/add',auth,productAddController);
productRouter.put('/update/:id',auth,productUpdateController);
export default productRouter;