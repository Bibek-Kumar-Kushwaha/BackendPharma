import { Router } from "express";
import auth from "../Middleware/auth.js";
import isAdmin from "../Middleware/auth.js";
import { getCreditDataController } from "../Controllers/credit.controller.js";
import { isAuthorized } from "../Middleware/auth.middleware.js";

const creditRouter = Router();

creditRouter.get('/get/all', isAuthorized, isAdmin, getCreditDataController);

export default creditRouter;