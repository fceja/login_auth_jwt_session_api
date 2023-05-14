import express, { Application } from "express";
import router from "./routes/routes";

const app: Application = express();
const port = 3000;

app.use("/", router);

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
