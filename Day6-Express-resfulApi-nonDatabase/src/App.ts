import { app, eventEmitter } from "./Connection/ServerHttps";
import { Route } from "./Routes/MidRoute";
import { json } from "express";
import * as swaggerUi from "swagger-ui-express";
import * as path from "path";
import * as fs from "fs";
import * as swaggerDocument from "./shared/SwaggerDocument/Swagger.json";
import cors from "cors";
//console.log("=>", path.join(__dirname, "./shared/asset/cssSwagger.css"));

const cssPath = path.join("./shared/asset/cssSwagger.css");
const customCss = fs.readFileSync(cssPath, "utf-8");
app.use(cors());
app.use(
  "/api-docs",
  swaggerUi.serve,
  swaggerUi.setup(swaggerDocument, { customCss })
);
eventEmitter.emit("start-server");
app.use(json());
Route(app);
