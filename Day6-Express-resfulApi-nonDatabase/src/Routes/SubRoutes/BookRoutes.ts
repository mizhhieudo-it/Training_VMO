import { Router } from "express";
import { Books } from "../../Controllers/BookController";
const routers = Router();
routers.post("/create", Books.createAsync);
routers.get("/get", Books.getAsync);
routers.put("/update/:id", Books.updateAsync);
routers.put("/delete/:id", Books.deleteAsync);
export default routers;