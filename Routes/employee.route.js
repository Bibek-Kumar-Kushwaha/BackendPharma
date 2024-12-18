import { Router } from "express";
import { employeeUpdateController } from "../Controllers/employee.controller.js";

const employeeRouter = Router();

employeeRouter.put('/update',employeeUpdateController);

export default employeeRouter;