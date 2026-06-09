import Service from "../models/Service.js";
import ApiError from "../utils/ApiError.js";

export const createService = async (data) => {
    const exists =
        await Service.findOne({
            slug: data.slug,
        });

    if (exists) {
        throw new ApiError(
            409,
            "Service already exists"
        );
    }

    return await Service.create(
        data
    );
};

export const getServices = async () => {
        return await Service.find();
};

export const getServiceById = async (id) => {
    const service =
        await Service.findById(id);

    if (!service) {
        throw new ApiError(
            404,
            "Service not found"
        );
    }

    return service;
};

export const updateService = async (id, data) => {
    const service =
        await Service.findByIdAndUpdate(
            id,
            data,
            {
                new: true,
                runValidators: true,
            }
        );

    if (!service) {
        throw new ApiError(
            404,
            "Service not found"
        );
    }

    return service;
};

export const deleteService = async (id) => {
    const service =
        await Service.findByIdAndDelete(
            id
        );

    if (!service) {
        throw new ApiError(
            404,
            "Service not found"
        );
    }

    return service;
};