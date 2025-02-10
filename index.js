import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import postRoutes from "./routes/posts.js"; 
import sequelize from "./db.js"; 
dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

e
app.use(cors());
app.use(express.json());


app.use("/posts", postRoutes);


const startServer = async () => {
  try {
    await sequelize.sync(); e
    console.log(" Database synced successfully");

    app.listen(PORT, () => {
      console.log(`🚀 Server is running on port ${PORT}`);
    });

  } catch (error) {
    console.error("❌ Database sync error:", error);
  }
};

startServer();