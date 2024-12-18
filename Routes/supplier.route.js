import { Router } from "express";
import { supplierController } from "../Controllers/supplier.controller.js";

const supplierRouter = Router();

supplierRouter.get('/get',supplierController);

export default supplierRouter;