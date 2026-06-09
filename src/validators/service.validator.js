import Joi from "joi";

export const createServiceValidator = Joi.object({
    name: Joi.string()
        .required(),

    slug: Joi.string()
        .required(),

    description: Joi.string()
        .allow(""),

    apiBaseUrl:
        Joi.string()
            .uri()
            .required(),

    provisionEndpoint:
        Joi.string()
            .uri()
            .required(),

    currentVersion:
        Joi.string(),
});