import Joi from "joi";

export const createPackageValidator = Joi.object({
    service: Joi.string()
        .required(),

    name: Joi.string()
        .required(),

    price: Joi.number()
        .min(0)
        .required(),

    billingCycle: Joi.string()
        .valid(
            "MONTHLY",
            "YEARLY"
        )
        .required(),

    trialDays: Joi.number()
        .min(0),

    features: Joi.array()
        .items(
            Joi.string()
        ),

    featureFlags: Joi.object(),
});