import cors from 'cors';
import express from 'express';
import urlRoutes from './routes/urlRoutes.js';
import Database from './config/dbconnection.js';

const app = express();


Database.connect();

const allowedOrigins = [
  process.env.UI_DEV_URL,// Development
  process.env.UI_BASE_URL,
  process.env.UI_API_ROUTE// Production
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("CORS not allowed"));
    }
  },
  methods: ["GET", "POST", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true // If using authentication
}));

// Handle Preflight Requests
app.options("*", (req, res) => {
  res.header("Access-Control-Allow-Origin", req.get("Origin"));
  res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
  res.header("Access-Control-Allow-Credentials", "true");
  res.sendStatus(204);
});

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello From Server...");
});


app.use("/", urlRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
