require("dotenv").config();

const { createApp } = require("./app");
const { connectDB } = require("./config/db");

const PORT = Number(process.env.PORT) || 5000;

async function start() {
  await connectDB(process.env.MONGO_URI);
  console.log("MongoDB connected");

  const app = createApp();

  const server = app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
  });

  const shutdown = async (signal) => {
    console.log(`${signal} received, shutting down...`);
    server.close(() => process.exit(0));
  };

  process.on("SIGINT", () => shutdown("SIGINT"));
  process.on("SIGTERM", () => shutdown("SIGTERM"));
}

start().catch((err) => {
  console.error("Failed to start server:", err);
  process.exit(1);
});

