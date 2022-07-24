export default interface IRepositoriesBase<T>{
    CreateAsync(item:T):Promise<T>;
    UpdateAsync(item:T):Promise<T>;
    RemoveAsync(id:string):Promise<any>;
    GetAllAsync():Promise<Array<T>>;
}