import { Repository } from "../shared/CoreRepository/Repository";
import BookModel from "../Models/Book";
import { Request,Response } from "express";
class BookController{
    _bookRepo : Repository<BookModel>;
    constructor() {  
         this._bookRepo = new Repository<BookModel>("BookCollection");   
    }
    createAsync = async(req:Request,res:Response) =>{
        let item = <BookModel>req.body;
        let resultCreate = await this._bookRepo.CreateAsync(item);
        return res.status(200).send(resultCreate)
    }
    getAsync = async(req:Request,res:Response) =>{
        let resultCreate = await this._bookRepo.GetAllAsync();
        return res.status(200).send(resultCreate)
    }
    updateAsync = async(req:Request,res:Response) =>{
        let id = req.params.id ;
        let item = <BookModel>req.body;
        let resultUpdate = await this._bookRepo.UpdateAsync(item,id);
        return res.status(200).send(resultUpdate)
    }
    deleteAsync = async(req:Request,res:Response) =>{
        let id = req.params.id ;
        let resultUpdate = await this._bookRepo.RemoveAsync(id);
        return res.status(200).send(resultUpdate)
    }




}
export const Books = new BookController();