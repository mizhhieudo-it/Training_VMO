import { Repository } from "../shared/CoreRepository/Repository";
import BookModel from "../Models/Book";
import { Request,Response } from "express";
class BookController{
    _bookRepo : Repository<BookModel>;
    constructor() {  
         this._bookRepo = new Repository<BookModel>();   
    }
    createAsync = async(req:Request,res:Response) =>{
        let item = <BookModel>req.body;
        let resultCreate = await this._bookRepo.CreateAsync(item);
        return res.status(200).send(resultCreate)
    }




}
export const Books = new BookController();