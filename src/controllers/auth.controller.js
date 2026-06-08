import bcrypt from "bcryptjs";
import User from "../models/User.js";

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