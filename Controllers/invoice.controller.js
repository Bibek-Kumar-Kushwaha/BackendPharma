import invoiceModel from "../Models/invoice.model.js";
import productModel from "../Models/product.model.js";
import userModel from "../Models/user.model.js";
import generateBillNumber from "../Utils/generateBillNumber.js";
import Handler from "../Utils/handler.js";

const invoiceCreateController = async (req, res) => {
    try {
        const { products, phone, name } = req.body;

        // Validate input
        if (!products || !Array.isArray(products) || products.length === 0) {

            return Handler(
                400,
                "Products must be an array with at least one item",
                true,
                false,
                res
            )

        }

        if (!phone && !name) {
            return Handler(
                400,
                "Provide either phone or name to identify the user",
                true,
                false,
                res
            )
        }

        // Fetch user details
        const userDetails = await userModel.findOne({
            $or: [{ phone }, { name }]
        });

        if (!userDetails) {
            return Handler(
                400,
                "User Not Found",
                true,
                false,
                res
            )
        }

        const { name: userName, phone: userPhone, address, _id: userId } = userDetails;

        // Generate a unique bill number
        const billNumber = await generateBillNumber();

        // Process each product
        let grandTotal = 0;
        const productDetailsArray = await Promise.all(
            products.map(async (item, index) => {
                const product = await productModel.findOne({ productName: item.productName });

                if (!product) {
                    throw new Error(`Product not found for name: ${item.productName}`);
                }

                if(product.stockQuantity < item.quantity){
                    return Handler(
                        400,
                        `Shortage of ${item.productName}.We have Only ${product.stockQuantity} item in Stock`,
                        true,
                        false,
                        res
                    )
                }

                // const newStockQuantity = product.stockQuantity - item.quantity;
                // const updateStockQuantity = await productModel.findOne({productName: item.productName},
                //     'product.stockQuantity' : product.newStockQuantity,
                //     {new: true}
                // );
                // console.log(updateStockQuantity)


                const amount = product.sellingPrice * item.quantity;

                grandTotal += amount;

                return {
                    SN: index + 1,
                    productId: product._id,
                    productName: product.productName,
                    quantity: item.quantity,
                    sellingPrice: product.sellingPrice,
                    amount
                };
            })
        );

        // Create the invoice
        const newInvoice = await invoiceModel.create({
            name: userName,
            phone: userPhone,
            address,
            userId,
            billNumber,
            products: productDetailsArray,
            grandTotal
        });

        return Handler(
            200,
            "Invoice Created Successfully",
            false,
            true,
            res,
            {
                newInvoice
            }
        )
    } catch (error) {
        return Handler(
            500,
            `${error.message || error} server Error`,
            true,
            false,
            res
        )
    }
};

const getAllInvoiceController = async (req, res) => {
    try {

        const allInvoice = await invoiceModel.find({});

        return Handler(
            200,
            "All Invoice Fetched : ",
            false,
            true,
            res,
            {
                allInvoice
            }
        )

    } catch (error) {
        return Handler(
            500,
            error.message || error,
            true,
            false,
            res
        )
    }

};   
                                                                                                                                                           
export { invoiceCreateController, getAllInvoiceController };