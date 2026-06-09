import mongoose from "mongoose";

const packageSchema = new mongoose.Schema(
    {
        service: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Service",
            required: true,
        },

        name: {
            type: String,
            required: true,
            trim: true,
        },

        price: {
            type: Number,
            required: true,
            min: 0,
        },

        billingCycle: {
            type: String,
            enum: [
                "MONTHLY",
                "YEARLY",
            ],
            required: true,
        },

        trialDays: {
            type: Number,
            default: 0,
        },

        features: [
            {
                type: String,
            },
        ],

        featureFlags: {
            type: Map,
            of: Boolean,
            default: {},
        },

        isActive: {
            type: Boolean,
            default: true,
        },
    },
    {
        timestamps: true,
    }
);

const Package = mongoose.model(
    "Package",
    packageSchema
);

export default Package;