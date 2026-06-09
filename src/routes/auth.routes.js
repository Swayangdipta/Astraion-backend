import express from "express";

import validate from "../middlewares/validate.middleware.js";
import authenticate from "../middlewares/auth.middleware.js";

import {
    registerValidator,
    loginValidator,
    forgotPasswordValidator,
    resetPasswordValidator
} from "../validators/auth.validator.js";

import {
    register,
    login,
    me,
    refresh,
    logout,
    forgotPassword,
    resetPassword,
    sendVerification,
    verifyEmail
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

router.post(
    "/forgot-password",
    validate(
        forgotPasswordValidator
    ),
    forgotPassword
);

router.post(
    "/reset-password/:token",
    validate(
        resetPasswordValidator
    ),
    resetPassword
);

router.post(
    "/send-verification",
    authenticate,
    sendVerification
);

router.get(
    "/verify-email/:token",
    verifyEmail
);

export default router;