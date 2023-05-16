require('dotenv').config();

import express, { Application } from "express";
import bodyParser from "body-parser";

import router from "./routes/routes";

const cookieSession = require("cookie-session");
const cors = require("cors");
const port = 3000;

const app: Application = express();

app.use(cors());

app.use(bodyParser.json());

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
