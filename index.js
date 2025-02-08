import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import postRoutes from "./routes/posts.js"; 

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.use("/posts", postRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});