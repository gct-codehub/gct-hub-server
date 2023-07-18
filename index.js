import mongoose from "mongoose";
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import bodyParser from "body-parser";
import authRoute from "./routes/authRoute.js";
import userRoute from "./routes/userRoute.js";

dotenv.config();

//express server
const app = express();
app.use(cors());
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));

//configure multer
app.use(express.static("public"));
app.use("/profilePhotos", express.static("profilePhotos"));

//establish connection to database
mongoose
  .connect(process.env.MongodbUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() =>
    app.listen(process.env.PORT, () => {
      console.log("listening to port");
    })
  )
  .catch((error) => console.log(error));

app.use("/auth", authRoute);
app.use("/user", userRoute);
