import { Router } from "express";
import { supplierAddController, supplierGetController, supplierUpdateController } from "../Controllers/supplier.controller.js";
import { isAdmin, isAuthorized } from "../Middleware/auth.middleware.js";

const supplierRouter = Router();

supplierRouter.post('/add', isAuthorized, isAdmin, supplierAddController);
supplierRouter.put('/update/:id', isAuthorized, isAdmin, supplierUpdateController);
supplierRouter.get('/get/all', isAuthorized, isAdmin, supplierGetController);

export default supplierRouter;