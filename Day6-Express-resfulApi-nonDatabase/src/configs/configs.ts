import * as dotenv from "dotenv";
import * as path from "path";
import * as winston from "winston";
const pathEnv = path.join(__dirname,"../.env");
console.log("===========>",pathEnv);

const logger = winston.createLogger({
    level: 'info',
    format: winston.format.json(),
    transports: [
      new winston.transports.File({ filename: 'info.log', level: 'info' }),
    ]
  });
const envReadFiles = dotenv.config({path:pathEnv})
export {
    envReadFiles,
    logger
}