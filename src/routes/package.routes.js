import express from "express";

import authenticate
from "../middlewares/auth.middleware.js";

import authorize
from "../middlewares/role.middleware.js";

import validate
from "../middlewares/validate.middleware.js";

import {
    createPackageValidator,
} from "../validators/package.validator.js";

import * as packageController
from "../controllers/package.controller.js";

const router = express.Router();

router.post(
    "/",
    authenticate,
    authorize("SUPER_ADMIN"),
    validate(
        createPackageValidator
    ),
    packageController.create
);

router.get(
    "/",
    packageController.getAll
);

router.get(
    "/:id",
    packageController.getOne
);

router.put(
    "/:id",
    authenticate,
    authorize("SUPER_ADMIN"),
    packageController.update
);

router.delete(
    "/:id",
    authenticate,
    authorize("SUPER_ADMIN"),
    packageController.remove
);

export default router;