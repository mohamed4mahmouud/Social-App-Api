import * as dotenv from "dotenv";
dotenv.config();
import express from "express";
import dbConnect from "./DB/connection.js";

const app = express();

app.use(express.json());

dbConnect();

app.listen(process.env.PORT, () =>
  console.log(`App running on port ${process.env.PORT}`)
);
