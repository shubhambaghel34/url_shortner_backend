import cors from 'cors';
import express from 'express';
import urlRoutes from './routes/urlRoutes.js';
import Database from './config/dbconnection.js';

const app = express();


Database.connect();

const allowedOrigins = [
  process.env.UI_DEV_URL,// Development
  process.env.UI_BASE_URL// Production
];

app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, origin);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  methods: ["GET", "POST", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true
}));

// Handle Preflight Requests
app.options("*", (req, res) => {
  const origin = req.get("Origin");
  if (allowedOrigins.includes(origin)) {
    res.header("Access-Control-Allow-Origin", origin);
    res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
    res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
    res.header("Access-Control-Allow-Credentials", "true");
    return res.sendStatus(204);
  }
  res.sendStatus(403);
});

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello From Server...");
});


app.use("/", urlRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
