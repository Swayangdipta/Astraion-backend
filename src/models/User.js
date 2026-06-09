import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
        },

        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
        },

        phone: {
            type: String,
            default: null,
        },

        password: {
            type: String,
            required: true,
            select: false,
        },

        role: {
            type: String,
            enum: [
                "SUPER_ADMIN",
                "ADMIN",
                "CUSTOMER",
            ],
            default: "CUSTOMER",
        },

        isVerified: {
            type: Boolean,
            default: false,
        },

        refreshTokenHash: {
            type: String,
            default: null,
            select: false,
        },
        
        verificationToken: {
            type: String,
            default: null,
            select: false,
        },

        verificationTokenExpire: {
            type: Date,
            default: null,
            select: false,
        },

        passwordResetToken: {
            type: String,
            default: null,
            select: false,
        },

        passwordResetExpire: {
            type: Date,
            default: null,
            select: false,
        },
    },
    {
        timestamps: true,
    }
);

const User = mongoose.model(
    "User",
    userSchema
);

export default User;