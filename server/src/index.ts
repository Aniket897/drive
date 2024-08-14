import express from "express";
import cors from "cors";
import ConnectDb from "./config/db";
import "dotenv/config";
import router from "./routes";

const PORT = process.env.PORT || 8080;
const app = express();

// middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
  })
);
app.use(router);

//listning
app.listen(PORT, () => {
  console.log("Server running on port", PORT);
  ConnectDb();
});
