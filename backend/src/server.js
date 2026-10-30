import "dotenv/config";
import express from "express";
import cors from "cors";
import http from "node:http";
import mongoose from "mongoose";
import { Server } from "socket.io";
import readingsRouter from "./routes/readings.js";

const app = express();
const server = http.createServer(app);
const allowedOrigins = (process.env.CLIENT_ORIGIN || "http://localhost:5173")
  .split(",")
  .map((origin) => origin.trim());

const io = new Server(server, {
  cors: { origin: allowedOrigins, methods: ["GET", "POST"] }
});

app.set("io", io);
app.use(cors({ origin: allowedOrigins }));
app.use(express.json({ limit: "20kb" }));

app.get("/api/health", (_req, res) => {
  res.json({
    status: "ok",
    service: "EcoTrack API",
    database: mongoose.connection.readyState === 1 ? "connected" : "disconnected",
    time: new Date().toISOString()
  });
});

app.use("/api/readings", (req, res, next) => {
  if (req.method === "POST") {
    const expectedKey = process.env.DEVICE_API_KEY;
    const suppliedKey = req.header("x-device-key");
    if (!expectedKey || suppliedKey !== expectedKey) {
      return res.status(401).json({ message: "Invalid or missing device API key." });
    }
  }
  next();
}, readingsRouter);

app.use((error, _req, res, _next) => {
  console.error(error);
  res.status(500).json({ message: "Internal server error." });
});

const port = Number(process.env.PORT || 5000);
const mongoUri = process.env.MONGODB_URI;

if (!mongoUri) {
  console.error("MONGODB_URI is missing. Copy .env.example to .env and configure it.");
  process.exit(1);
}

try {
  await mongoose.connect(mongoUri);
  server.listen(port, () => {
    console.log(`EcoTrack API running at http://localhost:${port}`);
  });
} catch (error) {
  console.error("Could not connect to MongoDB:", error.message);
  process.exit(1);
}
