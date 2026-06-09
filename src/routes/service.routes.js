import express from "express";

import authenticate
from "../middlewares/auth.middleware.js";

import authorize
from "../middlewares/role.middleware.js";

import validate
from "../middlewares/validate.middleware.js";

import {
    createServiceValidator
} from "../validators/service.validator.js";

import * as serviceController
from "../controllers/service.controller.js";

const router = express.Router();

router.post(
    "/",
    authenticate,
    authorize("SUPER_ADMIN"),
    validate(
        createServiceValidator
    ),
    serviceController.create
);

router.get(
    "/",
    serviceController.getAll
);

router.get(
    "/:id",
    serviceController.getOne
);

router.put(
    "/:id",
    authenticate,
    authorize("SUPER_ADMIN"),
    serviceController.update
);

router.delete(
    "/:id",
    authenticate,
    authorize("SUPER_ADMIN"),
    serviceController.remove
);

export default router;