import * as dotenv from "dotenv";
dotenv.config();
import express from "express";
import dbConnect from "./DB/connection.js";
import ApiError from "./utils/ApiError.js";
import globalError from "./middleware/globalError.js";
import * as allRoutes from "./routes/index.routes.js";

const app = express();

app.use(express.json());

dbConnect();

app.use("/api/v1/auth", allRoutes.authRouter);
app.use("/api/v1/post", allRoutes.postRouter);

app.all("*", (req, res, next) => {
  next(new ApiError(`Can't find this route: ${req.originalUrl}`, 400));
});

app.use(globalError);

app.listen(process.env.PORT, () =>
  console.log(`App running on port ${process.env.PORT}`)
);
