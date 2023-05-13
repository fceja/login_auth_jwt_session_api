import express, { Application } from "express";
import router from "./routes/routes";
import dbConn from "./utils/dbConnect";

const app: Application = express();
const port = 3000;

app.use("/", router);

dbConn.connect((err) => {
  if (err) {
    console.error("Connection error");
  } else {
    console.log("Connected to db");
  }
});

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
