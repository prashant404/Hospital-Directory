const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/database");
const hospitalRoutes = require("./routes/hospitalRoutes");
const cors = require("cors");

dotenv.config();

const app = express();


connectDB();

app.use(cors());

app.use(express.json());


app.use("/api/v1/hospitals", hospitalRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
