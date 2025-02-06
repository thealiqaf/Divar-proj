const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const userRoutes = require("./api/router/user");
const categoryRoutes = require("./api/router/category");
const cityRoutes = require("./api/router/city");
const authRoutes = require("./api/router/auth");
const adminRoutes = require("./api/router/admin");
const AdRoutes = require('./api/router/ad');
const pendingAdsRoutes = require('./api/router/ad');

dotenv.config();
const app = express();
app.use(express.json());

app.use("/api/users", userRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/cities", cityRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/ads", AdRoutes);
app.use("/api/ads", pendingAdsRoutes);

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error(err));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
