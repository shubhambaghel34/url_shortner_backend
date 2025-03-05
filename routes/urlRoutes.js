import express from 'express'
import Url from '../model/url.js';
import { nanoid } from "nanoid";

const router = express.Router();

// Shorten URL
router.post("/shorten", async (req, res) => {
    try {
        const { originalUrl } = req.body;
    
        if (!originalUrl) {
          return res.status(400).json({ error: "Original URL is required" });
        }
    
        // ✅ Check if the URL already exists in the database
        const existingUrl = await Url.findOne({ originalUrl });
        if (existingUrl) {
          return res.status(200).json(existingUrl); // Return existing short URL
        }
    
        // ✅ Generate a unique short URL
        const shortUrl = nanoid(6);
        const newUrl = new Url({ originalUrl, shortUrl });
    
        await newUrl.save();
        return res.status(201).json(newUrl);
      } catch (error) {
        console.error("Error creating short URL:", error);
        return res.status(500).json({ error: "Server error" });
      }
});

// Redirect short URL
router.get("/:shortUrl", async (req, res) => {
    try {
      const { shortUrl } = req.params;
      const foundUrl = await Url.findOne({ shortUrl });
  
      if (!foundUrl) {
        return res.status(404).json({ error: "Short URL not found" });
      }
  
      // Redirect to original URL
      res.redirect(foundUrl.originalUrl);
    } catch (error) {
      console.error("Error during redirection:", error);
      res.status(500).json({ error: "Server error" });
    }
  });

export default router;
