import mongoose from "mongoose";

const adminSchema = new mongoose.Schema({

    name: {
        type: String,
        required: [true, "Provide your Full Name"]
    },
    email: {
        type: String,
        default: null
    },
    address: {
        type: String,
        default: null
    },
    password: {
        type: String,
        required: [true, "Provide Password"]
    },
    phone: {
        type: String,
        unique: true,
        required: [true, "Provide your phone number"]
    },
    role: {
        type: String,
        enum: ['ADMIN'],
        default: "ADMIN"
    },
    avatar: {
        public_url: {
            type: String,
            default: null
        },
        secure_url: {
            type: String,
            default: null
        }
    },
    refreshToken: {
        type: String,
        default: null
    },
    dbName: {
        type: String,
        unique: true,
        
    }

},
    {
        timestamps: true
    }
);

const adminModel = mongoose.model("Admin", adminSchema);

export default adminModel;