import { ParamDataGetList } from "../../../common/DefineObject/Params/param.const";
import * as mongoose from "mongoose";
export default interface Read<T> {
    AsyncfindById(id: mongoose.ObjectId): Promise<T | null>;
    AsyncGetAll(): Promise<T[] | null>;
    AsyncGet(condition?: ParamDataGetList): Promise<T[] | null>;
    AsyncGetWithCondition(condition: any): Promise<T[] | null>
}