import { IPagination, IPaginateParamsBase } from "./Interfaces/IPagination";
import * as mongoose from "mongoose";
export class Pagination<T extends mongoose.Document> implements IPagination<T>, IPaginateParamsBase {
    dataSource: mongoose.Aggregate<T>;
    page: number;
    pageSize: number;
    totalPage: number;
    totalItem: number;
    next?: string;
    hashNext?: boolean;
    previous?: string;
    hashPrevious?: boolean;

    constructor(_dataSource: mongoose.Aggregate<T>) {
        this.dataSource = _dataSource;
        this.pageSize = this.pageSize ?? 50;
        this.page = this.page ?? 1;
    }


    //demo updating........
    Paging = async () => {
        if (this.pageSize < 50) {
            this.pageSize = 50;
        }
        if (this.page < 1) {
            this.page = 1;
        }
        let skipDocument: number =
            (Number(this.page) - 1) * Number(this.pageSize);
        let data = await this.dataSource.skip(skipDocument).limit(this.pageSize).exec();

        const resultPaging: any = {
            datalist: data,
            pagesize: this.pageSize,
            pageNumber: this.page,
        };
        return resultPaging;

    }


}