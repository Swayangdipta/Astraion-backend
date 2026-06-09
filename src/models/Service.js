import mongoose from "mongoose";

const serviceSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
        },

        slug: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
        },

        description: {
            type: String,
            default: "",
        },

        logo: {
            url: String,
            publicId: String,
        },

        apiBaseUrl: {
            type: String,
            required: true,
        },

        provisionEndpoint: {
            type: String,
            required: true,
        },

        isActive: {
            type: Boolean,
            default: true,
        },

        frontendRoute: {
            type: String,
            default: "/",
        },

        currentVersion: {
            type: String,
            default: "1.0.0",
        },
    },
    {
        timestamps: true,
    }
);

const Service = mongoose.model(
    "Service",
    serviceSchema
);

export default Service;