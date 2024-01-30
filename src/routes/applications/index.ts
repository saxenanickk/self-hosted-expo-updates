import express, { Request, Response } from "express";
import {
  createApplication,
  getApplication,
  getApplications,
} from "../../database";

const applicationsRoute = express.Router();

applicationsRoute.get("/", async (req: Request, res: Response) => {
  const result = await getApplications();
  res.send(result);
});

applicationsRoute.get("/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  const application = await getApplication(parseInt(id));
  res.send(application);
});

applicationsRoute.post("/", async (req: Request, res: Response) => {
  try {
    const { name, runtimeVersion, updateId } = req.body;

    if (!name || !runtimeVersion || !updateId) {
      return res.status(400).send({ message: "Bad request." });
    } else if (name.length > 50) {
      return res.status(400).send({ message: "Name is too long." });
    } else if (runtimeVersion.length > 50) {
      return res.status(400).send({ message: "Runtime version is too long." });
    } else if (updateId.length > 50) {
      return res.status(400).send({ message: "Update id is too long." });
    } else if (name.length < 3) {
      return res.status(400).send({ message: "Name is too short." });
    } else if (runtimeVersion.length < 3) {
      return res.status(400).send({ message: "Runtime version is too short." });
    } else if (updateId.length < 3) {
      return res.status(400).send({ message: "Update id is too short." });
    } else if (typeof name !== "string") {
      return res.status(400).send({ message: "Name is not a string." });
    } else if (typeof runtimeVersion !== "string") {
      return res
        .status(400)
        .send({ message: "Runtime version is not a string." });
    } else if (typeof updateId !== "string") {
      return res.status(400).send({ message: "Update id is not a string." });
    }

    const result = await createApplication(name, runtimeVersion, updateId);
    console.log(result);
    res.send({ message: "Application was created successfully." });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Internal server error." });
  }
});

export default applicationsRoute;
