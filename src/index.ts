import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import manifestRoute from "./manifest";

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;

app.get("/", (req: Request, res: Response) => {
  res.send("<h1>OTA Updates Service is up and running.</h1>");
});

app.use("/manifest", manifestRoute);

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
