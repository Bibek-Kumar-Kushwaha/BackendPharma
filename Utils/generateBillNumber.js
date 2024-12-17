import counterModel from "../Models/billCounter.model.js"; // Ensure this model is available

const generateBillNumber = async () => {
    try {

        // const date = Date.now().getFullyear().getFullMonth();
        // console.log(date);
        
        // Increment the counter for the invoice
        const billCounter = await counterModel.findOneAndUpdate(
            { name: "Invoice" }, // Counter name
            { $inc: { seq: 1 } }, // Increment sequence
            { new: true, upsert: true } // Create if doesn't exist
        );

        // Generate the bill number in the format C202400001
        const billNumber = `C2024${String(billCounter.seq).padStart(6, "0")}`;
        return billNumber;
    } catch (error) {
        throw new Error("Failed to generate bill number");
    }
};

export default generateBillNumber;