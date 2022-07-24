import { Router } from "express";
import { Books } from "../../Controllers/BookController";
const routers = Router();
routers.post("/create", Books.createAsync);
export default routers;