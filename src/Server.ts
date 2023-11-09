import bodyParser from "body-parser";
import cors from "cors";
import express, { Application } from "express";
import session from "express-session";

import CONFIG_FILE from "./config/Config";
import router from "./routes/Routes";

const port = CONFIG_FILE.SERVER_PORT;
const app: Application = express();

app.use(bodyParser.json());
app.use(cors());
app.use(
  session({
    name: "app-session",
    secret: CONFIG_FILE.SESSION_COOKIE_SECRET_KEY,
    resave: false,
    saveUninitialized: false,
  })
);

// routes router
app.use("/", router);

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
