import mongoose from "mongoose";

export default function ConnectDb() {
  const url = process.env.MONGO_URL as string;
  const dbName = process.env.MONGO_DB_NAME as string;
  mongoose
    .connect(url, {
      dbName,
    })
    .then(() => {
      console.log("mongoose connected");
    })
    .catch((e) => {
      console.log("failed to connect mongoose", e);
    });
}
