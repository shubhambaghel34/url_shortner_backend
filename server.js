import dotenv from "dotenv";
dotenv.config();

import express from "express"
import urlRoutes from './routes/urlRoutes.js'
import Database from "./config/dbconnection.js";

const app = express();
app.use(express.json());

app.use("/", urlRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));


process.on("SIGINT", () => {
  Database.disconnect();
  process.exit(0);
});
