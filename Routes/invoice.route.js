import {Router} from 'express';
import { getAllInvoiceController, invoiceCreateController } from '../Controllers/invoice.controller.js';
import isAdmin from '../Middleware/admin.js';
import auth from '../Middleware/auth.js';

const invoiceRouter = Router();

invoiceRouter.post('/create',invoiceCreateController);
invoiceRouter.get('/get/all',auth,isAdmin,getAllInvoiceController);

export default invoiceRouter;