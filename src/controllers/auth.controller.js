import bcrypt from "bcryptjs";
import User from "../models/User.js";
import crypto from "crypto";

import { sendEmail }
from "../services/email.service.js";

import resetPasswordEmail from "../templates/resetPasswordEmail.js";

import ApiResponse from "../utils/ApiResponse.js";

import {
    registerUser,
    loginUser,
} from "../services/auth.service.js";

import {
    generateAccessToken,
    generateRefreshToken,
} from "../utils/generateToken.js";

import jwt from "jsonwebtoken";
import catchAsync from "../utils/catchAsync.js";

import verificationEmail
from "../templates/verificationEmail.js";

export const register = catchAsync(
    async (req, res) => {

        const user = await registerUser(
            req.body
        );

        return res.status(201).json(
            new ApiResponse(
                true,
                "User registered successfully",
                {
                    id: user._id,
                    email: user.email,
                }
            )
        );
    }
);

export const login = catchAsync(
    async (req, res) => {

        const { email, password } =
            req.body;

        const user =
            await loginUser(
                email,
                password
            );

        const accessToken =
            generateAccessToken(
                user._id
            );

        const refreshToken =
            generateRefreshToken(
                user._id
            );

        const refreshTokenHash =
            await bcrypt.hash(
                refreshToken,
                10
            );

        user.refreshTokenHash =
            refreshTokenHash;

        await user.save();

        res.cookie(
            "refreshToken",
            refreshToken,
            {
                httpOnly: true,
                secure:
                    process.env.NODE_ENV ===
                    "production",
                sameSite: "strict",
                maxAge:
                    30 *
                    24 *
                    60 *
                    60 *
                    1000,
            }
        );

        return res.json(
            new ApiResponse(
                true,
                "Login successful",
                {
                    accessToken,
                    user: {
                        id: user._id,
                        name: user.name,
                        email: user.email,
                        role: user.role,
                        isVerified: user.isVerified
                    },
                }
            )
        );
    }
);

export const me = async (
    req,
    res
) => {
    return res.json({
        success: true,
        message:
            "User fetched successfully",
        data: {
            id: req.user._id,
            name: req.user.name,
            email: req.user.email,
            role: req.user.role,
            isVerified: req.user.isVerified,
        }
    });
};

export const refresh = catchAsync(
    async (req, res) => {
        const refreshToken =
            req.cookies.refreshToken;

        if (!refreshToken) {
            return res.status(401).json({
                success: false,
                message:
                    "Refresh token missing",
            });
        }

        const decoded =
            jwt.verify(
                refreshToken,
                process.env
                    .JWT_REFRESH_SECRET
            );

        const user =
            await User.findById(
                decoded.id
            ).select(
                "+refreshTokenHash"
            );

        if (!user) {
            return res.status(401).json({
                success: false,
                message:
                    "User not found",
            });
        }

        const valid =
            await bcrypt.compare(
                refreshToken,
                user.refreshTokenHash
            );

        if (!valid) {
            return res.status(401).json({
                success: false,
                message:
                    "Invalid refresh token",
            });
        }

        const accessToken =
            generateAccessToken(
                user._id
            );

        return res.json({
            success: true,
            message:
                "Token refreshed",
            data: {
                accessToken,
            },
        });
    }
);

export const logout = catchAsync(
    async (req, res) => {
        const refreshToken =
            req.cookies.refreshToken;

        if (refreshToken) {
            const decoded =
                jwt.decode(
                    refreshToken
                );

            if (decoded?.id) {
                await User.findByIdAndUpdate(
                    decoded.id,
                    {
                        refreshTokenHash:
                            null,
                    }
                );
            }
        }

        res.clearCookie(
            "refreshToken"
        );

        return res.json({
            success: true,
            message:
                "Logged out successfully",
        });
    }
);

export const forgotPassword = catchAsync(async (req, res) => {
    const { email } = req.body;

    const user =
        await User.findOne({
            email,
        });

    if (user) {
        const resetToken =
            crypto
                .randomBytes(32)
                .toString("hex");

        const hashedToken =
            crypto
                .createHash("sha256")
                .update(resetToken)
                .digest("hex");

        user.passwordResetToken =
            hashedToken;

        user.passwordResetExpire =
            Date.now() +
            15 * 60 * 1000;

        await user.save();

        const resetUrl =
            `${process.env.FRONTEND_URL}/reset-password/${resetToken}`;

        console.log("Reset URL:", resetUrl);

        const emailResponse = await sendEmail({
            to: user.email,
            subject: "Reset Your Password",
            html: resetPasswordEmail(resetUrl),
        });

            console.log("Email Response:", emailResponse);
    }

    return res.json({
        success: true,
        message:
        "If an account exists, a password reset email has been sent.",
    });
});

export const resetPassword = catchAsync(async (req, res) => {

    const token =
        req.params.token;

    const hashedToken =
        crypto
            .createHash("sha256")
            .update(token)
            .digest("hex");

    const user =
        await User.findOne({
            passwordResetToken:
                hashedToken,

            passwordResetExpire: {
                $gt: Date.now(),
            },
        }).select(
            "+passwordResetToken +passwordResetExpire"
        );

    if (!user) {
        return res.status(400).json({
            success: false,
            message:
                "Invalid or expired token",
            errors: [],
        });
    }

    const hashedPassword =
        await bcrypt.hash(
            req.body.password,
            12
        );

    user.password =
        hashedPassword;

    user.passwordResetToken =
        null;

    user.passwordResetExpire =
        null;

    user.refreshTokenHash =
        null;

    await user.save();

    return res.json({
        success: true,
        message:
            "Password reset successful",
    });
});

export const sendVerification = catchAsync(async (req, res) => {

    const user =
        await User.findById(
            req.user._id
        );

    if (user.isVerified) {
        return res.json({
            success: true,
            message:
                "Email already verified",
        });
    }

    const token =
        crypto
            .randomBytes(32)
            .toString("hex");

    const hashedToken =
        crypto
            .createHash("sha256")
            .update(token)
            .digest("hex");

    user.verificationToken =
        hashedToken;

    user.verificationTokenExpire =
        Date.now() +
        24 *
        60 *
        60 *
        1000;

    await user.save();

    const verificationUrl =
        `${process.env.FRONTEND_URL}/verify-email/${token}`;

    await sendEmail({
        to: user.email,

        subject:
            "Verify Your Email",

        html: verificationEmail(
            verificationUrl
        ),
    });

    return res.json({
        success: true,
        message:
            "Verification email sent",
    });
});

export const verifyEmail = catchAsync(async (req, res) => {

    const token =
        req.params.token;

    const hashedToken =
        crypto
            .createHash("sha256")
            .update(token)
            .digest("hex");

    const user =
        await User.findOne({
            verificationToken:
                hashedToken,

            verificationTokenExpire: {
                $gt: Date.now(),
            },
        }).select(
            "+verificationToken +verificationTokenExpire"
        );

    if (!user) {
        throw new ApiError(
            400,
            "Invalid or expired token"
        );
    }

    user.isVerified = true;

    user.verificationToken =
        null;

    user.verificationTokenExpire =
        null;

    await user.save();

    return res.json({
        success: true,
        message:
            "Email verified successfully",
    });
});