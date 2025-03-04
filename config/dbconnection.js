import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

class Database {
  constructor() {
    this.connect();
  }

  connect() {
    const mongoUri = process.env.MONGO_URI; 

    if (!mongoUri) {
      console.error("❌ MONGO_URI is missing in .env file");
      process.exit(1);
    }

    mongoose
      .connect(mongoUri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      })
      .then(() => console.log("✅ MongoDB Connected"))
      .catch((error) => {
        console.error("❌ MongoDB Connection Error:", error);
        process.exit(1);
      });
  }

  disconnect() {
    mongoose
      .disconnect()
      .then(() => console.log("🔌 MongoDB Disconnected"))
      .catch((error) => console.error("❌ MongoDB Disconnection Error:", error));
  }
}

export default new Database();
