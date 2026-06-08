import dotenv from "dotenv";

dotenv.config();

import app from "./app.js";
import connectDB from "./config/db.js";
import logger from "./utils/logger.js";
import createSuperAdmin from "./utils/createSuperAdmin.js";

const PORT =
    process.env.PORT || 5000;

connectDB();



const startServer = async () => {
   await connectDB();

   await createSuperAdmin();

    app.listen(PORT, () => {
        logger.info(
            `Server running on port ${PORT}`
        );
    });
};

startServer();