
import { Express } from "express";
import BooksRoute from "./SubRoutes/BookRoutes";
export async function Route(app: Express) {
  await app.use("/api/book", BooksRoute);
}