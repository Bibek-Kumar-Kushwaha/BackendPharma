import express from 'express';
import dotenv from 'dotenv';
import connectDb from './Config/connectDb.js';
import cors from 'cors'
import cookieParser from 'cookie-parser';
import adminRouter from './Routes/admin.route.js';
import userRouter from './Routes/user.route.js';
import productRouter from './Routes/product.route.js';
import categoryRouter from './Routes/category.route.js';
import discountRouter from './Routes/discount.route.js';
import invoiceRouter from './Routes/invoice.route.js';
import billCounter from './Routes/billCounter.route.js';
import creditRouter from './Routes/credit.route.js';
import supplierRouter from './Routes/supplier.route.js';
import employeeRouter from './Routes/employee.route.js';

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(
    cors({
      origin: ['http://localhost:5173', 'http://192.168.1.4:5173'],
      credentials: true,
    })
  );
  
app.get('/',(req,res)=> {
    res.send("I am serving......")
})

//router
app.use('/api/admin',adminRouter);
app.use('/api/user',userRouter);
app.use('/api/product',productRouter);
app.use('/api/category',categoryRouter);
app.use('/api/discount',discountRouter);
app.use('/api/invoice',invoiceRouter);
app.use('/api/bill',billCounter);
app.use('/api/credit',creditRouter);
app.use('/api/supplier',supplierRouter);
app.use('/api/employee',employeeRouter);


//connect to database
connectDb();

app.listen(PORT, ()=> {
    console.log(`server listing on http://localhost:${PORT}`);
})