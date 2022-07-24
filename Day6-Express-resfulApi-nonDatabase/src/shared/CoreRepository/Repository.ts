import CoreRepo from "./IRepository";
import autoGenKeys from "../../Common/AutoGenKeys";
import fs from "fs";
import path from "path";
import HandleJson from "../../Services/HandlerStringJson";
export class Repository<T> implements CoreRepo<T>  {
    pathDB = path.join(__dirname,"../../database/Database.json");
    objList:any = {}
    database:any = {}
    CreateAsync(item: T): Promise<T> {
        let idKeys = autoGenKeys(10) ;
        this.objList[idKeys] = item ;
        let customizeObject = HandleJson(JSON.stringify(this.objList)) ;
        this.database = customizeObject
        fs.appendFileSync(this.pathDB,this.database);
        return Promise.resolve(this.objList)
    }
    UpdateAsync(item: T): Promise<T> {
        throw new Error("Method not implemented.");
    }
    RemoveAsync(id: string): Promise<any> {
        throw new Error("Method not implemented.");
    }
    GetAllAsync(): Promise<T[]> {
        throw new Error("Method not implemented.");
    }
}