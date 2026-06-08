import bcrypt from "bcryptjs";

import User from "../models/User.js";

const createSuperAdmin = async () => {

    if (
        !process.env.SUPER_ADMIN_EMAIL ||
        !process.env.SUPER_ADMIN_PASSWORD
    ) {
        console.warn(
            "SUPER_ADMIN credentials not configured"
        );
        return;
    }

    const exists = await User.findOne({
        email: process.env.SUPER_ADMIN_EMAIL,
    });

    if (exists) return;

    const password = await bcrypt.hash(
        process.env.SUPER_ADMIN_PASSWORD,
        12
    );

    await User.create({
        name: "Super Admin",
        email: process.env.SUPER_ADMIN_EMAIL,
        password,
        role: "SUPER_ADMIN",
        isVerified: true,
    });

    console.log("SUPER_ADMIN created");
};

export default createSuperAdmin;