const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const patientRoutes = require("./routes/patientRoutes"); // Import patient routes

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

// Use patient routes
app.use("/api/patients", patientRoutes);

// Default route
app.get("/", (req, res) => {
  res.send("Hospital Manager Backend");
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});