// import express, { Request, Response } from "./node_modules/express";
import express, { Request, Response } from "express";
const app = express();
app.get("/", (req: Request, res: Response) => {
  res.status(200).send("Welcome to NodeJS");
});
app.listen(1234);
