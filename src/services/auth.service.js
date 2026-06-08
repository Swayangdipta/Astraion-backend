import bcrypt from "bcryptjs";

import User from "../models/User.js";

export const registerUser = async (
    userData
) => {
    const existingUser =
        await User.findOne({
            email: userData.email,
        });

    if (existingUser) {
        throw new Error(
            "Email already registered"
        );
    }

    const hashedPassword =
        await bcrypt.hash(
            userData.password,
            12
        );

    const user = await User.create({
        ...userData,
        password: hashedPassword,
    });

    return user;
};

export const loginUser = async (
    email,
    password
) => {
    const user = await User.findOne({
        email,
    }).select("+password");

    if (!user) {
        throw new Error(
            "Invalid credentials"
        );
    }

    const isMatch =
        await bcrypt.compare(
            password,
            user.password
        );

    if (!isMatch) {
        throw new Error(
            "Invalid credentials"
        );
    }

    return user;
};