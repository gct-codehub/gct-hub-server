import mongoose from "mongoose";
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import bodyParser from "body-parser";
import authRoute from "./routes/authRoute.js";
import orgRoutes from "./routes/organization.js"

dotenv.config();

//express server
const app = express();
app.use(cors());
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));

//routes

app.use("/auth", authRoute);
app.use('/org', orgRoutes );

//establish connection to database and start server

app.listen(process.env.PORT, () => {
  console.log("[+]listening to port "+process.env.PORT);
  mongoose.connect(process.env.MongodbUrl, {useNewUrlParser: true, useUnifiedTopology: true,})
  .then(() =>
    console.log("[+]DB connected")
  )
.catch((error) => console.log("[+]DB connection error",error));
})
