import express, { Application } from 'express';
import router from "./routes";

const server: Application = express();
const port = 3000;

server.use('/', router);

server.listen(port, () => {
    console.log(`Server started on port ${port}`);
});