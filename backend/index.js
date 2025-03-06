import express from "express";
import mongoose from "mongoose";
import authRoute from "./routes/auth.route.js";
import userRoute from "./routes/user.route.js";
import packageRoute from "./routes/package.route.js";
import ratingRoute from "./routes/rating.route.js";
import bookingRoute from "./routes/booking.route.js";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import path from "path";
import cors from "cors";
const app = express();
dotenv.config();

const __dirname = path.resolve();

// mongoose
//   .connect(process.env.MONGO_URL)
//   .then(() => {
//     console.log("MongoDB Connected");
//   })
//   .catch((err) => console.log(err));




mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true, 
    useUnifiedTopology: true,
    serverSelectionTimeoutMS: 5000, // 5 seconds timeout
    socketTimeoutMS: 45000,
  })
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.error("❌ MongoDB Connection Error:", err));

app.use(
  cors({
    origin: process.env.SERVER_URL,
  })
);
// app.use(express.json());
app.use(express.json({ limit: "10mb" })); // Set a reasonable size limit (e.g., 10MB)
app.use(express.urlencoded({ extended: true, limit: "10mb" }));
app.use(cookieParser());

app.use("/api/auth", authRoute);
app.use("/api/user", userRoute);
app.use("/api/package", packageRoute);
app.use("/api/rating", ratingRoute);
app.use("/api/booking", bookingRoute);

if (process.env.NODE_ENV_CUSTOM === "production") {
  //static files
  app.use(express.static(path.join(__dirname, "/client/dist")));

  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "client", "dist", "index.html"));
  });
} else {
  // //rest api
  app.use("/", (req, res) => {
    res.send("Welcome to travel and tourism app");
  });
}

//port
app.listen(8000, () => {
  console.log("listening on 8000");
});





// import express from "express";
// import mongoose from "mongoose";
// import authRoute from "./routes/auth.route.js";
// import userRoute from "./routes/user.route.js";
// import packageRoute from "./routes/package.route.js";
// import ratingRoute from "./routes/rating.route.js";
// import bookingRoute from "./routes/booking.route.js";
// import cookieParser from "cookie-parser";
// import dotenv from "dotenv";
// import path from "path";
// import cors from "cors";

// // Load environment variables
// dotenv.config();

// const app = express();
// const PORT = process.env.PORT || 8000;
// const __dirname = path.resolve();

// // ✅ Improved MongoDB Connection with Better Error Handling
// mongoose
//   .connect(process.env.MONGO_URL, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//     serverSelectionTimeoutMS: 5000, // Prevents connection hangups
//     socketTimeoutMS: 45000, // Allows longer queries if needed
//   })
//   .then(() => console.log("✅ MongoDB Connected"))
//   .catch((err) => {
//     console.error("❌ MongoDB Connection Error:", err);
//     process.exit(1);
//   });

// // ✅ Enable query logging in non-production mode
// mongoose.set("debug", process.env.NODE_ENV !== "production");

// // ✅ Middleware
// app.use(
//   cors({
//     origin: process.env.SERVER_URL || "*", // Allows all if not specified
//     credentials: true, // Supports cookies
//   })
// );
// app.use(express.json({ limit: "10mb" })); // Prevents large payload attacks
// app.use(express.urlencoded({ extended: true, limit: "10mb" }));
// app.use(cookieParser());

// // ✅ API Routes
// app.use("/api/auth", authRoute);
// app.use("/api/user", userRoute);
// app.use("/api/package", packageRoute);
// app.use("/api/rating", ratingRoute);
// app.use("/api/booking", bookingRoute);

// // ✅ Serve Static Files in Production
// if (process.env.NODE_ENV_CUSTOM === "production") {
//   app.use(express.static(path.join(__dirname, "client", "dist")));
//   app.get("*", (req, res) => {
//     res.sendFile(path.join(__dirname, "client", "dist", "index.html"));
//   });
// } else {
//   app.get("/", (req, res) => {
//     res.send("Welcome to the Travel & Tourism App API!");
//   });
// }

// // ✅ Start Server
// app.listen(PORT, () => {
//   console.log(`🚀 Server running on port ${PORT}`);
// });
