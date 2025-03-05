
import mongoose from "mongoose";
const urlSchema = new mongoose.Schema({
  originalUrl: { type: String, required: true },
  shortUrl: { type: String, required: true, unique: true },
  clicks: { type: Number, default: 0 }, 
  createdAt: { type: Date, default: Date.now }, 
  expiresAt: { type: Date, default: () => new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) } 
});

urlSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 }); // Auto-delete expired URLs

const Url = mongoose.model("Url", urlSchema);

export default Url;
