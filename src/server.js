import 'dotenv/config';

import app from "./app.js";
import connectDB from "./config/db.js";
import logger from "./utils/logger.js";
import createSuperAdmin from "./utils/createSuperAdmin.js";
import seedServices from "./utils/seedServices.js";
import seedPackages from "./utils/seedPackages.js";

const PORT =
    process.env.PORT || 5000;

const startServer = async () => {
   await connectDB();

   await createSuperAdmin();

   await seedServices();

   await seedPackages();

    app.listen(PORT, () => {
        logger.info(
            `Server running on port ${PORT}`
        );
    });
};

startServer();