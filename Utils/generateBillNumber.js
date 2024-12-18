import counterModel from "../Models/billCounter.model.js"; 

const generateBillNumber = async () => {
    try {
        
        const currentDate = new Date();
        const currentYear = currentDate.getFullYear(); 
        const currentMonth = String(currentDate.getMonth() + 1).padStart(2, "0"); 

        const billCounter = await counterModel.findOneAndUpdate(
            { name: "Customer Invoice" }, 
            { $inc: { seq: 1 } }, 
            { new: true, upsert: true } 
        );

        const sequenceNumber = String(billCounter.seq).padStart(4, "0"); 
        const billNumber = `C${currentYear}${currentMonth}${sequenceNumber}`;

        return billNumber;
    } catch (error) {
        throw new Error("Failed to generate bill number");
    }
};

export default generateBillNumber;
