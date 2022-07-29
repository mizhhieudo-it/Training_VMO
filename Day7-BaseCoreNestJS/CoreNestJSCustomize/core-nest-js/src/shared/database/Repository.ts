import ICommands from "./Interfaces/IRepository/ICommands";
import IQueries from "./Interfaces/IRepository/IQueries";
import * as mongoose from "mongoose";
import { ParamDataGetList } from "shared/common/DefineObject/Params/param.const";
import { Pagination } from "./Pagination";
export default class Repository<T extends mongoose.Document> implements ICommands<T>, IQueries<T>{
    private _model: mongoose.Model<T>;
    private _pagination: Pagination<T>;

    constructor(schemaModel: mongoose.Model<T>, paging?: Pagination<T>) {
        this._model = schemaModel;
        this._pagination = paging;
    }
    AsyncfindById = async (id: mongoose.Schema.Types.ObjectId): Promise<T> => {
        if (!id) {
            return Promise.resolve(null);
        } else {
            try {
                let result = await this._model.findById(id);
                return Promise.resolve(result);
            } catch (error) {
                return Promise.reject(error)
            }
        }

    }
    AsyncGetAll = async (): Promise<T[]> => {
        try {
            let result = await this._model.find();
            this._pagination.Paging();
            return Promise.resolve(result);
        } catch (error) {
            return Promise.reject(error)
        }
    }
    AsyncGet = async (condition?: ParamDataGetList): Promise<T[]> => {
        // try {
        //     let result = await this._model.find();


        // } catch (error) {

        // }
        throw new Error("function not implement...........");

    }
    AsyncGetWithCondition(condition: any): Promise<T[]> {
        throw new Error("Method not implemented.");
    }
    createAsync = async (item: T): Promise<T> => {
        try {
            await this._model.create(item);
            return Promise.resolve(item);
        } catch (error) {
            return Promise.reject(item);
        }
    }
    updateAsync = async (id: mongoose.Schema.Types.ObjectId, item: T): Promise<T> => {
        if (!id) {
            return Promise.resolve(null)
        } else {
            let isExistDoc = await this._model.findById(id);
            if (!isExistDoc) {
                return Promise.resolve(null)
            } else {
                try {
                    await this._model
                        .findByIdAndUpdate({ _id: id }, { item })
                        .exec();
                    return Promise.resolve(this._model.findById(id))
                } catch (error) {
                    return Promise.reject(error)
                }
            }
        }
    }
    deleteAsync = async (id: mongoose.Schema.Types.ObjectId): Promise<T> => {
        if (!id) {
            return Promise.resolve(null);
        } else {
            await this._model.findByIdAndRemove(id);
            return Promise.resolve(this._model.findById(id));
        }
    }




}