import Package from "../models/Package.js";
import Service from "../models/Service.js";
import ApiError from "../utils/ApiError.js";

export const createPackage = async (data) => {

    const service = await Service.findById(
        data.service
    );

    if (!service) {
        throw new ApiError(
            404,
            "Service not found"
        );
    }

    const exists = await Package.findOne({
        service: data.service,
        name: data.name,
        billingCycle: data.billingCycle,
    });

    if (exists) {
        throw new ApiError(
            409,
            "Package already exists"
        );
    }

    return await Package.create(data);
};

export const getPackages = async () => {
    return await Package.find()
        .populate(
            "service",
            "name slug"
        );
};

export const getPackageById = async (id) => {

    const packageData =
        await Package.findById(id)
            .populate(
                "service",
                "name slug"
            );

    if (!packageData) {
        throw new ApiError(
            404,
            "Package not found"
        );
    }

    return packageData;
};

export const updatePackage = async (
    id,
    data
) => {

    const packageData =
        await Package.findByIdAndUpdate(
            id,
            data,
            {
                new: true,
                runValidators: true,
            }
        );

    if (!packageData) {
        throw new ApiError(
            404,
            "Package not found"
        );
    }

    return packageData;
};

export const deletePackage = async (
    id
) => {

    const packageData =
        await Package.findByIdAndDelete(
            id
        );

    if (!packageData) {
        throw new ApiError(
            404,
            "Package not found"
        );
    }

    return packageData;
};