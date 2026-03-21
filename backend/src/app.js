const express = require("express");
const cors = require("cors");
const path = require("path");
const fs = require("fs");

const healthRoutes = require("./routes/health");
const peopleRoutes = require("./routes/people");
const donationRoutes = require("./routes/donations");
const volunteerRoutes = require("./routes/volunteers");
const rescueRequestRoutes = require("./routes/rescueRequests");

function createApp() {
  const app = express();

  app.use(
    cors({
      origin: process.env.CORS_ORIGIN ? process.env.CORS_ORIGIN.split(",") : true,
      credentials: true,
    })
  );
  app.use(express.json({ limit: "1mb" }));

  // Ensure uploads directory exists
  const uploadsDir = path.join(process.cwd(), "uploads");
  if (!fs.existsSync(uploadsDir)) fs.mkdirSync(uploadsDir, { recursive: true });
  app.use("/uploads", express.static(uploadsDir));

  app.get("/", (req, res) => {
    res.send("Maa Astha backend is running.");
  });

  app.use("/api", healthRoutes);
  app.use("/api", peopleRoutes);
  app.use("/api", donationRoutes);
  app.use("/api", volunteerRoutes);
  app.use("/api", rescueRequestRoutes);

  // 404
  app.use((req, res) => {
    res.status(404).json({ ok: false, error: "Not found" });
  });

  // Error handler
  // eslint-disable-next-line no-unused-vars
  app.use((err, req, res, next) => {
    const status = Number(err?.status) || 500;
    res.status(status).json({
      ok: false,
      error: status === 500 ? "Internal server error" : err.message,
    });
  });

  return app;
}

module.exports = { createApp };

