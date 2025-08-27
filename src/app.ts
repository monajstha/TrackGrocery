import express, { Express } from "express";
import { errorHandler } from "./middlewares/errorHandler";
import itemRoutes from "./routes/itemRoutes";

const app = express();
app.use(express.json());

// Routes
app.use("/api/items", itemRoutes);

// Global error handler
app.use(errorHandler);

export default app;
