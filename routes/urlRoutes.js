//const express = require("express");
import express from 'express'
//const Url = require("../model/url");
import Url from '../model/url.js';
import { nanoid } from "nanoid";

const router = express.Router();

// Shorten URL
router.post("/shorten", async (req, res) => {
    try {
        const { originalUrl } = req.body;
        if (!originalUrl) return res.status(400).json({ error: "Original URL is required" });
    
        const shortUrl = nanoid(6); // ✅ Generate a short URL
        const newUrl = new Url({ originalUrl, shortUrl });
    
        await newUrl.save();
        res.status(201).json(newUrl);
      } catch (error) {
        console.error("Error creating short URL:", error);
        res.status(500).json({ error: "Server error" });
      }
});

// Redirect short URL
router.get("/:shortId", async (req, res) => {
  const { shortId } = req.params;

  const urlData = await Url.findOne({ shortId });
  if (!urlData) {
    return res.status(404).json({ error: "URL not found" });
  }

  res.redirect(urlData.originalUrl);
});

export default router
//module.exports = router;
