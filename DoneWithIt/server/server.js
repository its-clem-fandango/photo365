import express from "express";
import cors from "cors";
import morgan from "morgan";
import dotenv from "dotenv";
import { PrismaClient } from "@prisma/client";

// Load environment variables from .env file idk why??
dotenv.config();

// Create an instance of the Prisma Client
const prisma = new PrismaClient();

const app = express();

// Middleware for handling CORS
app.use(cors());

// Middleware for logging HTTP requests like method,status code, request/response
app.use(morgan("dev"));

// JSON middleware to parse JSON request bodies
app.use(express.json());

// Import Router file
import router from "./routes.js";
// Set up the router as middleware to handle specific routes
app.use("/", router);

// Start the Express server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
