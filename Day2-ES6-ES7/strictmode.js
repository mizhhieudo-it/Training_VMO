"use strict";
function foo() {
    bar = 1;
}

foo();
console.log(bar) // 1
// default Param 
function zoo(params = 'if param null then get this value') {
    return params;
}
// sử dụng
zoo();
zoo("Holo bla!!!"); 
