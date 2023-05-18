import bodyParser from "body-parser";
import cookieSession from "cookie-session"
import cors from "cors";
import dotenv from "dotenv";
import express, { Application } from "express";

import router from "./routes/routes";

const port = 3000;
const app: Application = express();

dotenv.config()

app.use(bodyParser.json());
app.use(cors());
app.use(
  cookieSession({
    name: "app-session",
    secret: process.env.COOKIE_SECRET,
    httpOnly: true
  })
);

// routes router
app.use("/", router);

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
