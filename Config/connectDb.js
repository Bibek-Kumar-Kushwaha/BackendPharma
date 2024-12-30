import mongoose from "mongoose";
import dotenv from 'dotenv'

dotenv.config();

const DBNAME = process.env.DBNAME;
const URI = process.env.URI;

const connectDb = async () => {
    try {
        if (!URI || !DBNAME) {
            throw new Error('Database URI or DBNAME is missing in the environment variables')
        }

        await mongoose.connect(URI, {
            dbName: DBNAME
        })

        console.log("Database connection successful")

    } catch (error) {
        console.log("Error on database connection",error.message);
    }
}

export default connectDb;