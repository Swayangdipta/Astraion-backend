import express from "express";

import validate from "../middlewares/validate.middleware.js";
import authenticate from "../middlewares/auth.middleware.js";

import {
    registerValidator,
    loginValidator,
} from "../validators/auth.validator.js";

import {
    register,
    login,
    me,
    refresh,
    logout
} from "../controllers/auth.controller.js";

const router = express.Router();

router.post(
    "/register",
    validate(registerValidator),
    register
);

router.post(
    "/login",
    validate(loginValidator),
    login
);

router.get(
    "/me",
    authenticate,
    me
);

router.post(
    "/refresh",
    refresh
);

router.post(
    "/logout",
    logout
);

export default router;