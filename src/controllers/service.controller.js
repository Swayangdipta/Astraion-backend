import ApiResponse from "../utils/ApiResponse.js";
import catchAsync from "../utils/catchAsync.js";

import * as serviceService
from "../services/service.service.js";

export const create = catchAsync(async (req, res) => {
    const service =
        await serviceService.createService(
            req.body
        );

    return res.status(201).json(
        new ApiResponse(
            true,
            "Service created",
            service
        )
    );
});

export const getAll = catchAsync(async (req, res) => {
    const services =
        await serviceService.getServices();

    return res.json(
        new ApiResponse(
            true,
            "Services fetched",
            services
        )
    );
});

export const getOne = catchAsync(async (req, res) => {
    const service =
        await serviceService.getServiceById(
            req.params.id
        );

    return res.json(
        new ApiResponse(
            true,
            "Service fetched",
            service
        )
    );
});

export const update = catchAsync(async (req, res) => {
    const service =
        await serviceService.updateService(
            req.params.id,
            req.body
        );

    return res.json(
        new ApiResponse(
            true,
            "Service updated",
            service
        )
    );
});

export const remove = catchAsync(async (req, res) => {
    await serviceService.deleteService(
        req.params.id
    );

    return res.json(
        new ApiResponse(
            true,
            "Service deleted"
        )
    );
});