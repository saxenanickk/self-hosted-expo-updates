import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import assetsRoute from "./routes/assets";
import manifestRoute from "./routes/manifest";
import applicationsRoute from "./routes/applications";

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  res.send("<h1>OTA Updates Service is up and running.</h1>");
});

app.use("/api/manifest", manifestRoute);
app.use("/api/assets", assetsRoute);
app.use("/api/applications", applicationsRoute);

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
