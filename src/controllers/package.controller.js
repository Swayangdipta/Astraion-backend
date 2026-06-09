import ApiResponse from "../utils/ApiResponse.js";
import catchAsync from "../utils/catchAsync.js";

import * as packageService
from "../services/package.service.js";

export const create = catchAsync(async (req, res) => {
    const packageData =
        await packageService.createPackage(
            req.body
        );

    return res.status(201).json(
        new ApiResponse(
            true,
            "Package created successfully",
            packageData
        )
    );
});

export const getAll = catchAsync(async (req, res) => {
    const packages =
        await packageService.getPackages();

    return res.json(
        new ApiResponse(
            true,
            "Packages fetched successfully",
            packages
        )
    );
});

export const getOne = catchAsync(async (req, res) => {
    const packageData =
        await packageService.getPackageById(
            req.params.id
        );

    return res.json(
        new ApiResponse(
            true,
            "Package fetched successfully",
            packageData
        )
    );
});

export const update = catchAsync(async (req, res) => {
    const packageData =
        await packageService.updatePackage(
            req.params.id,
            req.body
        );

    return res.json(
        new ApiResponse(
            true,
            "Package updated successfully",
            packageData
        )
    );
});

export const remove = catchAsync(async (req, res) => {
    await packageService.deletePackage(
        req.params.id
    );

    return res.json(
        new ApiResponse(
            true,
            "Package deleted successfully"
        )
    );
});