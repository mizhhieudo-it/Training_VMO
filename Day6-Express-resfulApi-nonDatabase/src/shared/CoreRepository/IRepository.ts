export default interface IRepositoriesBase<T>{
    CreateAsync(item:T):Promise<T>;
    UpdateAsync(item:T,id:string):Promise<T>;
    RemoveAsync(id:string):Promise<any>;
    GetAllAsync():Promise<object>;
}