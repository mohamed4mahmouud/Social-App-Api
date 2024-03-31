import mongoose from "mongoose";

const dbConnect = async () => {
  return await mongoose
    .connect(process.env.DATABASE_URI)
    .then(() => console.log("DB connection Successful!"))
    .catch(() => "Can't connect to database");
};

export default dbConnect;
