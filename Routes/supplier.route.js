import { Router } from "express";
import { supplierAddController, supplierGetController, supplierUpdateController } from "../Controllers/supplier.controller.js";

const supplierRouter = Router();

supplierRouter.post('/add',supplierAddController);
supplierRouter.put('/update',supplierUpdateController);
supplierRouter.get('/get',supplierGetController);

export default supplierRouter;