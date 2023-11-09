import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import express, { Application } from "express";
import session from "express-session";

import router from "./routes/Routes";

const port = 3000;
const app: Application = express();

dotenv.config();

app.use(bodyParser.json());
app.use(cors());
app.use(
  session({
    name: "app-session",
    secret: process.env.COOKIE_SECRET,
    resave: false,
    saveUninitialized: false,
  })
);

// routes router
app.use("/", router);

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
