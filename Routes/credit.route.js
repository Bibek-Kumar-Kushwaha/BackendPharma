import { Router } from "express";
import { getCreditDataController } from "../Controllers/credit.controller.js";

const creditRouter = Router();

creditRouter.get('/get',getCreditDataController);

export default creditRouter;