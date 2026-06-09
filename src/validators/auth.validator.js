import Joi from "joi";

export const registerValidator = Joi.object({
    name: Joi.string()
        .trim()
        .min(2)
        .max(100)
        .required(),

    email: Joi.string()
        .email()
        .required(),

    phone: Joi.string()
        .allow("", null),

    password: Joi.string()
        .min(6)
        .max(50)
        .required(),
});

export const loginValidator = Joi.object({
    email: Joi.string()
        .email()
        .required(),

    password: Joi.string()
        .required(),
});

export const forgotPasswordValidator = Joi.object({
    email: Joi.string()
        .email()
        .required(),
});

export const resetPasswordValidator = Joi.object({
    password: Joi.string()
        .min(6)
        .max(50)
        .required(),
});