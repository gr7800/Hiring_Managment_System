import express from "express";
import mongoose from "mongoose";
import jobRoutes from "./src/routes/jobRoutes.js"; 
import applicationRoutes from "./src/routes/applicationRoutes.js"; 
import userRoutes from "./src/routes/userRoutes.js"; 
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((error) => console.log("MongoDB connection error:", error));

app.use("/jobs", jobRoutes);
app.use("/applications", applicationRoutes);
app.use("/users", userRoutes);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

export default app