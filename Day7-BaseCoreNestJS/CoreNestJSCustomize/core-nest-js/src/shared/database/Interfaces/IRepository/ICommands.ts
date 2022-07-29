import * as mongoose from "mongoose";
export default interface ICommands<T> {
    createAsync(item: T): Promise<T | null>;
    updateAsync(id: mongoose.ObjectId, item: T): Promise<T | null>;
    deleteAsync(id: mongoose.ObjectId): Promise<T | null>;
}