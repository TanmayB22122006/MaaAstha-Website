const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");
const path = require("path");

// 👇 Saare routes yahan require kiye hain
const personRoutes = require("./routes/personRoutes");
const donationRoutes = require("./routes/donationRoutes");
const volunteerRoutes = require("./routes/volunteerRoutes");
const rescueRequestRoutes = require("./routes/rescueRequestRoutes");
const reportRoutes = require("./routes/reportRoutes"); // ✅ Naya Report Route

dotenv.config();
connectDB();

const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Maa Astha API is running perfectly! 🚀");
});

// 👇 Saare APIs yahan register kiye hain
app.use("/api/persons", personRoutes);
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use("/api/donations", donationRoutes);
app.use("/api/volunteers", volunteerRoutes);
app.use("/api/rescue-requests", rescueRequestRoutes);
app.use("/api/reports", reportRoutes); // ✅ Report API ko sahi jagah lagaya

// 👇 Server Listen aakhiri mein!
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(
    `🚀 Server running in ${process.env.NODE_ENV || 'development'} mode on port ${PORT}`,
  );
});