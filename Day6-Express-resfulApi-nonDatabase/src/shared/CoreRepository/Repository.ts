import CoreRepo from "./IRepository";
import autoGenKeys from "../../Common/AutoGenKeys";
import fs from "fs";
import path from "path";
import HandleJson from "../../Services/HandlerStringJson";
export class Repository<T> implements CoreRepo<T>  {
    pathDB = path.join(__dirname,"../../database/Database.json");
    objList:any = {}
    database:any = {}
    _modelName : string = "" ;
    constructor(modelName:string){
        this._modelName = modelName
    }
    CreateAsync = async (item: T): Promise<T> => {
        let idKeys = autoGenKeys(10) ;
        this.objList[idKeys] = item ;
        let db = await fs.readFileSync(this.pathDB,'utf-8'); 
        if(db ==''){
            this.database[this._modelName] = this.objList;
            fs.appendFileSync(this.pathDB,JSON.stringify(this.database));
        }else{
            let convertDBToJson = JSON.parse(db);
            let readContentObj = convertDBToJson[this._modelName] ;     
            this.database[this._modelName] = readContentObj ; 
            this.database[this._modelName] = this.objList;          
            await fs.writeFileSync(this.pathDB,JSON.stringify(this.database));   
        }        
        return Promise.resolve(this.objList)
    }
    UpdateAsync= async (item: T,id:string): Promise<T> => {
        let db = await fs.readFileSync(this.pathDB,'utf-8');
        let resultWithModelName = JSON.parse(db)[this._modelName];
        resultWithModelName[id] = item;
        this.database[this._modelName] =resultWithModelName
        await fs.writeFileSync(this.pathDB,JSON.stringify(this.database));  
        return Promise.resolve(item);
    }
    RemoveAsync= async (id: string): Promise<any> =>{
        let db = await fs.readFileSync(this.pathDB,'utf-8');
        let resultWithModelName = JSON.parse(db)[this._modelName];
        delete resultWithModelName[id];
        this.database[this._modelName] =resultWithModelName
        await fs.writeFileSync(this.pathDB,JSON.stringify(this.database));  
        return Promise.resolve("item deleted !");
    }
    GetAllAsync= async (): Promise<object> => {
        let db = await fs.readFileSync(this.pathDB,'utf-8');
        let result = JSON.parse(db)[this._modelName];
        return Promise.resolve(result)
    }
}