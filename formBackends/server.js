const express = require("express");
const app = express();
const mongoose = require("mongoose");
require("dotenv").config();
const routesUrls = require("./routes/routes");
const cors = require("cors");

mongoose.connect(process.env.DATABASE_ACCESS, () => {
  console.log("Database connected");
});

app.use(express.json());
app.use(cors());
app.use("/app", routesUrls);
app.listen(4000, () => console.log("Server is running"));
