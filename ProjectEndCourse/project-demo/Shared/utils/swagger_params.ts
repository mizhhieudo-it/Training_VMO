export function swaggerParamsExample(example) {
    let {name, type,description,required} = example;
    return {
        name : name , 
        type : type , 
        description :description , 
        required : required
    };
}