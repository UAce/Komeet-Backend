/**
 * Required External Modules
 */
import * as dotenv from "dotenv";
import express, { Request, Response } from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import path from "path";
import { createStream } from "rotating-file-stream";

import { Routes } from "./events/routes";
import { errorHandler, notFoundHandler } from "./middleware/errorMiddleware";

dotenv.config();

/**
 * App Variables
 */
const date: string = new Date()
  .toISOString()
  .split("T")[0]
  .replace(/-/g, "_");
const port: number = process.env.PORT ? Number(process.env.PORT) : 3000;
const app = express(); // Creates Express app

/**
 *  App Configuration
 */

// Third-party Middlewares
app.use(helmet()); // provides you with sensible defaults such as DNS Prefetch Control, Frameguard, Hide Powered-By, HSTS, IE No Open, Don't Sniff Mimetype, and XSS Filter
app.use(cors()); // enables all CORS requests
app.use(express.json()); // parses incoming requests with JSON payloads, which populates the request object with a new body object containing the parsed data
app.use(morgan("dev"));

// setup the logger
app.use(
  morgan("common", {
    stream: createStream(`komeet_${date}.log`, {
      // create a rotating write stream
      interval: "1d", // rotate daily
      path: path.join(path.resolve(__dirname, ".."), "logs")
    })
  })
);

// Routes Middlewares
app.use("/health", (_: Request, res: Response) =>
  res.send("Server is running!")
);
app.use("/api/menu/items", Routes);

// Error Middlewares
app.use(errorHandler);
app.use(notFoundHandler); // Last one is a catch-all

/**
 * Server Activation
 */
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
