import express from "express";
import cors from "cors";
import helmet from "helmet";
import compression from "compression";
import cookieParser from "cookie-parser";
import hpp from "hpp";
import mongoSanitize from "express-mongo-sanitize";
import rateLimit from "express-rate-limit";
import morgan from "morgan";

import errorHandler from "./middlewares/error.middleware.js";
import notFound from "./middlewares/notFound.middleware.js";
import authRoutes from "./routes/auth.routes.js";
import serviceRoutes from "./routes/service.routes.js";
import packageRoutes from "./routes/package.routes.js";

const app = express();

app.use(
    cors({
        origin: process.env.FRONTEND_URL,
        credentials: true,
    })
);

app.use(helmet());

app.use(compression());

app.use(hpp());

// app.use(mongoSanitize());

app.use(express.json());

app.use(
    express.urlencoded({
        extended: true,
    })
);

app.use(cookieParser());

app.use(morgan("dev"));

const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 200,
});

app.use(limiter);

app.get("/api/health", (req, res) => {
    res.status(200).json({
        success: true,
        message: "Astraion API Running",
    });
});

app.use(
    "/api/auth",
    authRoutes
);

app.use(
    "/api/services",
    serviceRoutes
);

app.use(
    "/api/packages",
    packageRoutes
);
    
app.use(notFound);
app.use(errorHandler);

export default app;