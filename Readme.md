# URL Shortener

A simple URL shortener built with **Node.js, Express, MongoDB, and React**. The backend generates short URLs, and the frontend provides a UI for users to shorten URLs.

## 🚀 Features
- Shorten long URLs
- Redirect to the original URL
- User-friendly interface
- Fully deployed on Vercel

## 📂 Project Structure
```
url-shortener/
│-- backend/         # Express.js backend
│   │-- server.js    # Main server file
│   │-- routes/      # API routes
│   │-- models/      # Database models
│   │-- config/      # Database connection
│-- frontend/        # React frontend
│   │-- src/
│   │-- components/  # UI components
│   │-- hooks/       # Custom hooks
```

## 🛠️ Technologies Used
### Backend (Node.js + Express)
- Express.js
- MongoDB (Mongoose)
- CORS
- dotenv

### Frontend (React + TailwindCSS)
- React.js
- Axios (for API requests)
- TailwindCSS (for styling)

## 🏗️ Installation
### Prerequisites
- Node.js installed
- MongoDB database (local or cloud)

### Backend Setup
1. **Clone the repository:**
   ```bash
   git clone https://github.com/your-repo/url-shortener.git
   cd url-shortener/backend
   ```
2. **Install dependencies:**
   ```bash
   npm install
   ```
3. **Create a `.env` file and add:**
   ```env
   MONGO_URI=your_mongodb_connection_string
   PORT=5000
   ```
4. **Run the server:**
   ```bash
   npm start
   ```
   The backend will start at `http://localhost:5000`.

### Frontend Setup
1. **Go to the frontend directory:**
   ```bash
   cd ../frontend
   ```
2. **Install dependencies:**
   ```bash
   npm install
   ```
3. **Start the frontend:**
   ```bash
   npm run dev
   ```
   The frontend will run at `http://localhost:5173`.

## 🌍 Deployment
### Backend
The backend is deployed on **Vercel** at:
```
https://url-shortner-backend-indol.vercel.app
```

### Frontend
The frontend is deployed on **Vercel** at:
```
https://url-shortener-frontend-orcin-two.vercel.app
```

## 🔄 API Endpoints
| Method | Endpoint          | Description            |
|--------|------------------|------------------------|
| POST   | `/shorten`       | Shortens a given URL  |
| GET    | `/:shortUrl`     | Redirects to original |

## 🛠️ Troubleshooting
### CORS Issues
Ensure that the backend **CORS settings** allow requests from `http://localhost:5173` during development.

If you encounter CORS errors, update `server.js`:
```javascript
const allowedOrigins = [
  "http://localhost:5173",
  "https://url-shortener-frontend-orcin-two.vercel.app"
];
app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, origin);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true
}));
```

## 🎯 Future Improvements
- User authentication
- Click analytics
- Custom short URLs

## 🤝 Contributing
Feel free to open issues and PRs to improve the project!

## 📜 License
MIT License

