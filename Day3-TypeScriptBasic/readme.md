
# Tìm hiểu về Typescript :rocket:

![TypescriptLogo](https://www.jamviet.com/upload/2021/09/typescript-1024x538.png)

## Mục Lục :mag:

  

1.Typescript và lịch sử

  

2.Interface:

  

- interface là gì? khác gì với Type

- các built-in Type primitives

- các common built-in JS Object

- Generics

- Overloads

- Get $ Set

- Extension via merging

- Class Comformance

  

3.Type

- Object literal type

- Tuple type

- Union type

- Intersecsion type

- Type indexing

- Mapped type

- Conditional type

4.Class

- Generics class

- các từ khóa `protected`  `static`  `public`  `private`

## Nội dung

### 1.Typescript(TS) là gì ? và lịch sử của TS

#### 1.1 Typescript là gì ?

TypeScript là một ngôn ngữ lập trình được phát triển và duy trì bởi Microsoft. Nó là một tập hợp siêu cú pháp nghiêm ngặt của JavaScript và thêm tính năng nhập tĩnh tùy chọn vào ngôn ngữ. Nó được thiết kế để phát triển các ứng dụng lớn và chuyển đổi sang JavaScript. Vì nó là một tập hợp siêu JavaScript nên các chương trình JavaScript hiện có cũng là các chương trình TypeScript hợp lệ.

#### 1.2 Lịch sử của TS

- TypeScript được công bố lần đầu tiên vào tháng 10 năm 2012 (ở phiên bản 0.8)

- TypeScript 0.9, được phát hành vào năm 2013, đã thêm hỗ trợ cho generic.

- TypeScript 1.0 được phát hành tại hội nghị nhà phát triển Build (hội nghị nhà phát triển)") của Microsoft vào năm 2014.

- Vào tháng 7 năm 2014, nhóm phát triển đã công bố một trình biên dịch TypeScript mới, đạt hiệu suất gấp 5 lần

- Vào ngày 22 tháng 9 năm 2016, TypeScript 2.0 đã được phát hành; nó đã giới thiệu một số tính năng, bao gồm khả năng cho các lập trình viên tùy ý ngăn các biến được gán giá trị `null`

- TypeScript 3.0 được phát hành vào ngày 30 tháng 7 năm 2018,mang đến nhiều bổ sung ngôn ngữ như bộ giá trị trong tham số phần còn lại và biểu thức trải rộng, tham số phần còn lại với các loại tuple, tham số rest chung, v.v.

- TypeScript 4.0 được phát hành vào ngày 20 tháng 8 năm 2020.Mặc dù 4.0 không giới thiệu bất kỳ thay đổi đột phá nào, nhưng nó đã bổ sung các tính năng ngôn ngữ như Hệ thống JSX tùy chỉnh và kiểu Tuple Đa dạng

### 2.Interface trong TS

#### 2.1 Interface là gì ?

Interface là cách để định nghĩa một cấu trúc mà bất cứ Class nào khi sử dụng nó đều phải tuân thủ các biến và phương thức có trong interface

Ví dụ :

Ta có một interface IPerson

```ts

interface  IPerson {

firstName:string,

lastName:string,

sayHi: ()=>string

}

```

Lớp customer sử interface IPerson vì vậy sẽ phải tuân thủ theo đúng nguyên tắc có trong interface IPerson

```ts

var  customer:IPerson = {

firstName:"Tom",

lastName:"Hanks",

sayHi: ():string  =>{return  "Hi there"}

}

  

console.log("Customer Object ")

console.log(customer.firstName)

console.log(customer.lastName)

console.log(customer.sayHi())

  

var  employee:IPerson = {

firstName:"Jim",

lastName:"Blakes",

sayHi: ():string  =>{return  "Hello!!!"}

}

console.log("Employee Object ")

console.log(employee.firstName);

console.log(employee.lastName);

```

#### 2.2 Các cách sử dụng Interface trong TS thông dụng

##### 2.2.1 **Interface định nghĩa cấu trúc cho function**

```ts

interface  KeyValueProcessor

{

(key:  number, value:  string):  void;

};

  

function  addKeyValue(key:number, value:string):void {

console.log('addKeyValue: key = '  +  key  +  ', value = '  +  value)

}

  

function  updateKeyValue(key:  number, value:string):void {

console.log('updateKeyValue: key = '+  key  +  ', value = '  +  value)

}

let  kvp:  KeyValueProcessor = addKeyValue;

kvp(1, 'Bill'); //Output: addKeyValue: key = 1, value = Bill

  

kvp = updateKeyValue;

kvp(2, 'Steve'); //Output: updateKeyValue: key = 2, value = Steve

```

Có thể thấy interface `KeyValueProcessor` đặt ra một số quy tắc cho fucntion nào sử dụng nó như :

- phải truyền 2 param

- param thứ nhất phải có kiểu dữ liệu là number

- param 2 phải có kiểu string

- kiểu trả về của function là void

##### 2.2.2 Interface định nghĩa cấu trúc cho Array

```ts

interface  IStringList {

[index:string]:string

}

  

let  strArr  :  IStringList;

strArr["TS"] = "TypeScript";

strArr["JS"] = "JavaScript";

```

bất kì list nào sử dụng interface IStringList đều phải tuân thủ đúng quy tắc:

- key là string

- value là string

##### 2.2.3 **Tham số tuỳ chọn**

```ts

interface  IEmployee {

empCode:  number;

empName:  string;

empDept?:string;

}

  

let  empObj1:IEmployee = { // true

empCode:1,

empName:"Steve"

}

  

let  empObj2:IEmployee = { // true

empCode:1,

empName:"Bill",

empDept:"IT"

}

let  empObj3:IEmployee = { // false

empCode:'2',

empName:"Steve"

}

```

Vẫn theo đúng quy tắc cũ nhưng ta có thể dùng dấu `?` trong property empDept biểu thị rằng nó có thể null .

#### 2.2.4 **Tham số chỉ được phép đọc - ReadOnly**

```ts

interface  Citizen {

name:  string;

readonly  SSN:  number;

}

  

let  personObj:  Citizen = { SSN:  110555444, name:  'James Bond' }

  

personObj.name = 'Steve Smith'; // OK

personObj.SSN = '333666888'; // Compiler Error

```

Trong Interface sẽ có những thuộc tính mà ta chỉ cho phép class dùng nó được đọc mà không được thay đổi giá trị.

#### 2.2.5 **Kế thừa Interface**

```ts

interface  IPerson {

name:  string;

gender:  string;

}

  

interface  IEmployee  extends  IPerson {

empCode:  number;

}

  

let  empObj:IEmployee = {

empCode:1,

name:"Bill",

gender:"Male"

}

```

Chúng ta có thể kế thừa một hoặc nhiều interface để sử dụng lại như ví dụ bên trên

#### 2.2.6 **Implement Interface**

TypeScript Interface cũng cho phép một class cài đặt nó. Chúng ta sử dụng từ khoá implements.

```ts

interface  IEmployee {

empCode:  number;

name:  string;

getSalary:(number)=>number;

}

  

class  Employee  implements  IEmployee {

empCode:  number;

name:  string;

  

constructor(code:  number, name:  string) {

this.empCode = code;

this.name = name;

}

  

getSalary(empCode:number):number {

return  20000;

}

}

  

let  emp = new  Employee(1, "Steve");

```

Khi đã implememt một interface nghĩa là bạn phải triển khai hết không được bỏ qua bất cứ cái gì .

#### 2.3 built-in Type primitives

| Tên | Mô tả |Ví dụ |
|--|-------|-----|
| string | đại diện cho kiểu dữ liệu văn bản |let name:string='Nguyễn Văn A'|
|number|đại diện cho kiểu số|let number1:number=1 // số nguyên  let number2:number=0b100 // số nhị phân etc...|
|boolean|giá trị trả về `true` hoặc `false`|let isContainInString:boolean=true|
|null|trả về giá trị `null`|let objectA = null|
|undifined|trả về một đối tượng,thuộc tính chưa được gán giá trị|const objectA = {hairColor:'black'} <br  /> objectA.skinColor => undefined|
|symbol|đại diện cho giá trị hằng số|let sym2 = Symbol("key");|

### 2.4 các common built-in JS Object

#### 2.4.1 kiểu dữ liệu any

##### 2.4.1.1 any là ?

any: Đây là kiểu dữ liệu tích hợp sẵn trong TypeScript giúp mô tả kiểu biến mà chúng tôi không chắc chắn trong khi viết mã

```ts

var  x:  any;

// sau đó x có thể gán với bất kì kiểu dữ liệu gì mà bạn muốn , number , string , boolean

```

tính năng :

- Kiểu dữ liệu này có thể được sử dụng khi không có định nghĩa về kiểu.

- Kiểu dữ liệu 'bất kỳ' có thể được sử dụng để biểu thị bất kỳ giá trị JavaScript nào

#### 2.4.2 unknown Type

Giống như `any` type, `unknown` type có thể assign bất kỳ value nào.

```ts

let  unknownValue:  unknown;

  

unknownValue = Math.random;

unknownValue = 1;

unknownValue = {};

unknownValue = [];

unknownValue = true;

unknownValue = "string";

unknownValue = null;

unknownValue = undefined;

unknownValue = Symbol("type");

```

Nếu như `any` type cho phép thực hiện bất kỳ operation nào mà không check type

thì `uknown` type lại gần như không cho phép thực hiện operation nào.

```ts

let  unknownValue:  unknown;

  

unknownValue.foo().bar(); // Error

unknownValue.toString(); // Error

unknownValue[0]; // Error

```

Chúng ta có thể sử dụng type-checking (narrow type) để có thể thực hiện các operation trên `unknown` type

```js

let  unknownValue:  unknow;

  

if (typeof  value  ===  "number") {

unknownValue  +  1

}

  

if (value  instanceOf  Xyz) {

new  Xyz()

}

  

```

### 2.5 Generics Interface

#### 2.5.1 Gererics là gì ?

Generics về cơ bản là một loại công cụ cho phép bạn tạo các thành phần mã có thể sử dụng lại hoạt động với nhiều type khác nhau thay vì chỉ một type duy nhất.

#### 2.5.2 Tại sao phải phải sử dụng generics ?

```ts

interface  cat {

  

model:  string;

  

}

  

class  Cat {

  

kindsOfCat:  cat[] = [];

  

AddSpeciesCat = (item:  cat) => {

  

this.kindsOfCat.push(item);

  

};

  

ShowListCat() {

  

this.kindsOfCat.forEach((element) => {

  

console.log(`loài ${element}`);

  

});

  

}

  

}

  

  

let  Cats = new  Cat();

  

let  species:  cat = {

  

model:  "Mớp",

  

};

  

Cats.AddSpeciesCat(species);

  

species = {

  

model:  "Anh",

  

};

  

Cats.AddSpeciesCat(species);

  

Cats.ShowListCat();

```

Mọi thứ có vẻ sẽ tuân đúng theo trình tự nếu chỉ dừng ở đây . Nhưng nếu ta cần xây dựng các lớp khác tương tự như class Cat . Mọi thứ bên trong vẫn bên y nguyên nhưng chỉ khác đối tượng . Một điều rất **quan trọng** khi code để tránh việc dòng code thành **rác** đó là việc lặp đi lặp lại các khối code .

  

Theo vì phải tạo ra các class cho Chó , Mèo , Lợn , Gà ta có thể sử dụng kiểu Gererics để tạo ra một lớp chung cho tất cả động vật

```ts

// interface cat {

  

// model: string;

  

// }

  

// class Cat {

  

// kindsOfCat: cat[] = [];

  

// AddSpeciesCat = (item: cat) => {

  

// this.kindsOfCat.push(item);

  

// };

  

// ShowListCat() {

  

// this.kindsOfCat.forEach((element) => {

  

// console.log(`loài ${element}`);

  

// });

  

// }

  

// }

  

  

// let Cats = new Cat();

  

// let species: cat = {

  

// model: "Mớp",

  

// };

  

// Cats.AddSpeciesCat(species);

  

// species = {

  

// model: "Anh",

  

// };

  

// Cats.AddSpeciesCat(species);

  

// Cats.ShowListCat();

  

  

interface  MeoowType {

  

model:  string;

  

name:  string;

  

}

  

interface  DogTypes {

  

model:  string;

  

name:  string;

  

}

  

class  Animal<T> {

  

kindsOfAnimal:  T[] = [];

  

AddSpeciesAnimal = (item:  T) => {

  

this.kindsOfAnimal.push(item);

  

};

  

ShowListAnimal() {

  

this.kindsOfAnimal.forEach((element) => {

  

console.log(`loài ${element}`);

  

});

  

}

  

}

  

  

let  MeoowlList = new  Animal<MeoowType>();

  

let  species:  MeoowType = {

  

model:  "Mớp",

  

name:  "mèo",

  

};

  

MeoowlList.AddSpeciesAnimal(species);

  

let  DogList = new  Animal<DogTypes>();

  

let  dogs:  DogTypes = {

  

model:  "Cảnh khuyển",

  

name:  "Chó",

  

};

  

DogList.AddSpeciesAnimal(dogs);

  

DogList.ShowListAnimal();

  

MeoowlList.ShowListAnimal();

  

```

#### 2.5.3 Generics và Interface

Interface đã được nói rất kĩ ở bài biết trước . Bài viết này sẽ nói về ứng dụng của gerenic vào interface.

##### 2.5.3.1 Dưới đây là một ví dụ rất cơ bản về Generics

* ứng dụng Generic và Interface thông thường .

```ts

interface  IProcessor<T>

{

result:T;

process(a:  T, b:  T) =>  T;

}

```

* ứng dụng Gereneric với Interface với kiểu dữ liệu

```ts

interface  KeyPair<T, U> {

key:  T;

value:  U;

}

  

let  kv1:  KeyPair<number, string> = { key:1, value:"Steve" }; // OK

let  kv2:  KeyPair<number, number> = { key:1, value:12345 }; // OK

```

Như bạn có thể thấy trong ví dụ trên, bằng cách sử dụng generics làm kiểu dữ liệu, chúng ta có thể chỉ định kiểu dữ liệu của khóa và giá trị

* Generic Interface với Function Type

```ts

interface  KeyValueProcessor<T, U>

{

(key:  T, val:  U):  void;

};

  

function  processNumKeyPairs(key:number, value:number):void {

console.log('processNumKeyPairs: key = '  +  key  +  ', value = '  +  value)

}

  

function  processStringKeyPairs(key:  number, value:string):void {

console.log('processStringKeyPairs: key = '+  key  +  ', value = '  +  value)

}

let  numKVProcessor:  KeyValueProcessor<number, number> = processNumKeyPairs;

numKVProcessor(1, 12345); //Output: processNumKeyPairs: key = 1, value = 12345

  

let  strKVProcessor:  KeyValueProcessor<number, string> = processStringKeyPairs;

strKVProcessor(1, "Bill"); //Output: processStringKeyPairs: key = 1, value = Bill

```

Ở bài viết interface ta có thể thấy , nếu khi sử dụng interface để định dạng một function thì kiểu dữ liệu của param1 và param2 đang bị hardcode kiểu dữ liệu . Việc sử dụng generic làm cho việc sử dụng param giờ đây rất linh động

  

Tuy nhiên các triên vẫn chưa thật sự tối ưu .Có một vấn đề là type param của `KeyValueProcessor` phải trùng với param `processNumKeyPairs` , vẫn có cái gì đó rất của hardcode . Chúng ta có thể viết lại kết hợp interface Gereric và function gerenic khiến các function của chúng ta chặt chẽ và `ảo diệu` hơn rất nhiều .

```ts

interface  KeyValueProcessor<T, U>

{

(key:  T, val:  U):  void;

};

  

function  processKeyPairs<T, U>(key:T, value:U):void {

console.log(`processKeyPairs: key = ${key}, value = ${value}`)

}

  

let  numKVProcessor:  KeyValueProcessor<number, number> = processKeyPairs;

numKVProcessor(1, 12345); //Output: processKeyPairs: key = 1, value = 12345

  

let  strKVProcessor:  KeyValueProcessor<number, string> = processKeyPairs;

strKVProcessor(1, "Bill"); //Output: processKeyPairs: key = 1, value = Bill

```

* Imlement gereric interface

```ts

interface  IKeyValueProcessor<T, U>

{

process(key:  T, val:  U):  void;

};

  

class  kvProcessor  implements  IKeyValueProcessor<number, string>

{

process(key:number, val:string):void {

console.log(`Key = ${key}, val = ${val}`);

}

}

  

let  proc:  IKeyValueProcessor<number, string> = new  kvProcessor();

proc.process(1, 'Bill'); //Output: processKeyPairs: key = 1, value = Bill

```

#### 2.6 Overloading

##### 2.6.1 Overloading là gì ?

TypeScript cung cấp khái niệm nạp chồng hàm( Overloading).Bạn có thể có nhiều hàm có cùng tên nhưng kiểu tham số và kiểu trả về khác nhau. Tuy nhiên, số lượng các tham số phải giống nhau

##### 2.6.2 Sử dụng Overloading như thế nào

```ts

function  add(a:string, b:string):string;

  

function  add(a:number, b:number):  number;

  

function  add(a:  any, b:any):  any {

return  a  +  b;

}

  

add("Hello ", "Steve"); // returns "Hello Steve"

add(10, 20); // returns 30

```

- Quy tắc :

- cùng tên hàm

- cùng số lượng param

- khác kiểu tham số

- khác kiểu trả về

#### 2.7 Getter và Setter trong TS

Getter và Setter trong TS khác giống với trong JS

```ts

class  Person {

private  _age:  number;

private  _firstName:  string;

private  _lastName:  string;

  

public  get  age() {

return  this._age;

}

  

public  set  age(theAge:  number) {

if (theAge  <=  0  ||  theAge  >=  200) {

throw  new  Error('The age is invalid');

}

this._age = theAge;

}

  

public  getFullName():  string {

return  `${this._firstName}  ${this._lastName}`;

}

}`

```

việc sử dụng `gettter` và `setter` sẽ giúp che dấu được tên của properties cũng như check được validate đầu vào

```ts

let  person = new  Person();

person.age = 10;

```

Step thực hiện :

- private properties

- public function getter hoặc setter

- vì là function nên bạn có thể check logics nếu muốn

#### 2.8 Extension via merging

##### 2.8.1 Declaration Merging là gì ?

Declaration Merging là khái niệm duy nhất trong TypeScript mô tả hình dạng của các đối tượng JavaScript ở các kiểu cấp độ

##### 2.8.2 Declaration Merging làm gì ?

Nó là một tính năng cho phép gộp các Namespace , Type và Value lại với nhau khi chúng trùng tên .

  

![enter image description here](images/merge-declaration.png)

##### 2.8.3.1 Merging Interfaces

Kiểu khai báo hợp nhất đơn giản nhất và có lẽ là phổ biến nhất là hợp nhất interface. Ở cấp độ cơ bản nhất, hợp nhất kết hợp một cách máy móc các thành viên của cả hai khai báo thành một giao diện duy nhất có cùng tên

```ts

interface  Box {

  

height:  number;

  

width:  number;

  

}

  

interface  Box {

  

scale:  number;

  

}

  

let  box:  Box = { height:  5, width:  6, scale:  10 };

```

Đối với function member, mỗi member có cùng tên được coi là mô tả của cùng một chức năng. Một lưu ý nữa là trong trường hợp hợp nhất giao diện `A`với giao diện sau này `A`thì giao diện thứ hai sẽ được ưu tiên hơn so với giao diện đầu tiên.

  

ví dụ

```ts

interface  Cloner {

  

clone(animal:  Animal):  Animal;

  

}

  

interface  Cloner {

  

clone(animal:  Sheep):  Sheep;

  

}

  

interface  Cloner {

  

clone(animal:  Dog):  Dog;

  

clone(animal:  Cat):  Cat;

  

}

  

```

Kết quả sau khi merge xong sẽ kiểu như thế này

```ts

interface  Cloner {

  

clone(animal:  Dog):  Dog;

  

clone(animal:  Cat):  Cat;

  

clone(animal:  Sheep):  Sheep;

  

clone(animal:  Animal):  Animal;

  

}

```

Có một ngoại lệ nữa là quy tắc nếu pram truyền vào của function là chuỗi sẽ được ưu tiên trước . Ví dụ :

  

```ts

interface  Document {

  

createElement(tagName:  any):  Element;

  

}

  

interface  Document {

  

createElement(tagName:  "div"):  HTMLDivElement;

  

createElement(tagName:  "span"):  HTMLSpanElement;

  

}

  

interface  Document {

  

createElement(tagName:  string):  HTMLElement;

  

createElement(tagName:  "canvas"):  HTMLCanvasElement;

  

}

```

Sau khi merge sẽ được kết quả

```ts

interface  Document {

  

createElement(tagName:  "canvas"):  HTMLCanvasElement;

  

createElement(tagName:  "div"):  HTMLDivElement;

  

createElement(tagName:  "span"):  HTMLSpanElement;

  

createElement(tagName:  string):  HTMLElement;

  

createElement(tagName:  any):  Element;

  

}

```
#### 2.9 class comformance
2.9.1 **Class là gì ?**
Cũng giống như các ngôn ngữ lập trình Java, C#. Trong Typescript cũng hỗ trợ Class.
Một Class thì gồm các phần như constructor, thuộc tính và phương thức.
Ví dụ một class Employee trong Typescript
Ví dụ về một class trong TS 
```ts
class Employee {
    empCode: number;
    empName: string;

    constructor(code: number, name: string) {
            this.empName = name;
            this.empCode = code;
    }

    getSalary() : number {
        return 10000;
    }
}
```
compile nó sẽ dịch ra Javascript sẽ như thế này 
```js
var Employee = (function () {
    function Employee(name, code) {
        this.empName = name;
        this.empCode = code;
    }
    Employee.prototype.getSalary = function () {
        return 10000;
    };
        return Employee;
}());
```
2.9.2  **Constructor**
Constructor là một hàm đặc biệt nó được gọi khi chúng ta tạo đối tượng. Constructor được khai báo bằng từ khoá constructor.
```ts
class Employee {

    empCode: number;
    empName: string;
    // class có thể không cần contructor . có thể tùy chỉnh ở file tsconfig
    constructor(empcode: number, name: string ) {
        this.empCode = empcode;
        this.name = name;
    }
}
```
2.9.3 **Tạo một đối tượng từ Class ta sử dụng toán tử new.**
```ts 
class Employee {

    empCode: number;
    empName: string;
    
    constructor(empcode: number, name: string ) {
            this.empCode = empcode;
            this.name = name;
    }
}

let emp = new Employee(100,"Steve");
```
### 3.Type in TS
#### 3.1 **Object literal type là gì ?**
```json
{
"name":"Traing TS",
"startDate":"10/7/2022",
"nameTrainer":"Duy Tran"
}
```
Đây là chuỗi JSON . Danh sách các cặp key - value ngăn cách nhau bởi dấu phẩy thì được gọi là một Object Literal
#### 3.1.2 Một vài cách để định nghĩa một Object literal . 
##### 3.1.2.1 Định nghĩa một Object literal với `No type`
```ts
let person = {
name:"Johnny Deep",
age:32,
}
console.log(person.name) // => Johnny Deep 
console.log(person.age) // => 32  
person.codeBank = 1231243123423; //  => error because codeBank dose not contain object...
console.log(person.codeBank) //
```
- Với cách định nghĩa này sẽ có ưu điểm là rất nhanh nhưng khuyết điểm là điều này cũng có nghĩa là bạn không sử dụng TypeScript vì nó được cho là được sử dụng.

- Khi cố gắng lấy value của property codeBank sẽ bị lỗi vì nó chưa được định nghĩa 
##### 3.1.2.2 Định nghĩa một Object literal với `any`
```ts
let person:any = {
name:"Johnny Deep",
age:32,
}
console.log(person.name) // => Johnny Deep 
console.log(person.age) // => 32  
person.codeBank = 1231243123423; //  => passed case
console.log(person.codeBank) // => 1231243123423
```
Ở cách định nghĩa một Object literal với kiểu any như thế này ta đã hoàn toàn fix được sử hạn chế của `no type` . Ta hoàn toàn truy cập được một thuộc tính không tồn tại nhưng đổi lại nếu sử dụng thế này thì chẳng có một quy chuẩn nào cả . Các kiểu dữ liệu đều không còn ý nghĩa gì nữa .
#### 3.1.2.3  Định nghĩa một Object literal với `type Record<string, any>`
```ts
{
let user:Record<any,string> = {
idUser:"12312qdeqwet23e1",
name:"Nguyễn Văn A"
}
console.log(user.name) // => Nguyễn Văn A 
console.log(user.numberPhone) // => underfined 
user.address = "Hà Nội ,VN"
console.log(user.address) // => Hà Nội , VN 
```
cũng như ví dụ trước , khi đã dùng kiểu any thì sẽ không có quy chuẩn nào ở đây cả . Tuy nhiên cái gì quá cũng không tốt :) Hãy thử giới hạn kiểu dữ liệu đầu vào nhé 
```ts
{
let user:Record<string,string> = {
idUser:"12312qdeqwet23e1",
name:"Nguyễn Văn A"
}
console.log(user.name) // => Nguyễn Văn A 
console.log(user.numberPhone) // => underfined 
user.IDPostCard = 3214234412342 // false because type 'Number' not assign type 'string'
console.log(user.address) // => Hà Nội , VN 
```
Điều này sẽ làm nên đoạn code của bạn chặt chẽ hơn .
#### 3.1.2.4 Customize type trong declaration
```ts
let order : {productName:string,productPrice:number,amount:number} = {
productName : "T shirt Zara ",
productPrice : 333333,
amount:3
}
// console.log(order.productName) // => T shirt Zara 
order.createAt = new Date('20-1-2020') ; // false because dosen't exist property 'createAt'
```
Nếu bạn đã xác định được structure rồi thì bạn có thể sử dụng customize type như thế này để kiểm soát đầu vào 
#### 3.1.2.5 Customize with Interfaces
```ts
interface orderDetail{
name : string , 
price : number , 
amount : number , 
createAt ? : string 
}
const Order1 : orderDetail = {
name : "sản phẩm 1",
price : 1234 , 
amount : 3 
}
const Order2 : orderDetail = {
name : "sản phẩm ",
price : 1234 , 
amount : 3 ,
createAt : '12/12/2020'
}
``` 
Cá nhân tôi thích kiểu customize này nhất , nó giúp người dùng xác định được structure , tái sử dụng được . 
#### 3.1.2.6 Tuple type
##### 3.1.2.6.1 Tuple type là gì ? 
Tuple là một kiểu TypeScript hoạt động giống như một mảng với một số cân nhắc đặc biệt:
-	Số phần tử của mảng là cố định
-	Loại của các phần tử đã biết
-	Kiểu của các phần tử của mảng không được giống nhau
##### 3.1.2.6.2 Tuple type kết hợp với một số kiểu dữ liệu 
1. Tuple type basic 
```ts
var employee: [number, string] = [1, "Steve"];
var person: [number, string, boolean] = [1, "Steve", true];

var user: [number, string, boolean, number, string];// declare tuple variable
user = [1, "Steve", true, 20, "Admin"];// initialize tuple variable
```
chúng ta áp dụng đúng 3 nguyên tắc trên sẽ tạo ra một tuple type cơ bản .
2.kết hợp Tuple và array 
```ts
var employee: [number, string][];
employee = [[1, "Steve"], [2, "Bill"], [3, "Jeff"]];
```
TypeScript tạo một mảng trong JavaScript cho biến tuple
3.truy cập phần tử trong Tuple 
```ts
var employee: [number, string] = [1, "Steve"];
employee[0]; // returns 1
employee[1]; // returns "Steve"
```
Ta truy cập các phần tử trong tuple bình thường như Arrray
2. Thêm một phần tử vào tuple 
```ts
var employee: [number, string] = [1, "Steve"];
employee.push(2, "Bill"); 
console.log(employee); //Output: [1, 'Steve', 2, 'Bill']
```
3. Sử dụng Arrray method
```ts
var employee: [number, string] = [1, "Steve"];

// retrieving value by index and performing an operation 
employee[1] = employee[1].concat(" Jobs"); 
console.log(employee); //Output: [1, 'Steve Jobs']

```
#### 3.1.4 Union Types
##### 3.1.4.1 Union là gì ?
Union là một kiểu dữ liệu mà TypeScript cho phép chúng ta sử dụng nhiều hơn một kiểu dữ liệu cho một biến hoặc một tham số hàm.
#### 3.1.4.2 Tại sao phải sử dụng Union ? 
```ts
function  padLeft(value: string, padding: any) {

if (typeof  padding === "number") {

return  Array(padding + 1).join(" ") + value;

}

if (typeof  padding === "string") {

return  padding + value;

}

throw  new  Error(`Expected string or number, got '${typeof  padding}'.`);

}

padLeft("Hello world", 4);
```
Đôi khi, bạn sẽ gặp phải một thư viện yêu cầu một tham số là một số hoặc một chuỗi. Việc phải check kiểu đầu vào như này rất tốn thời gian gian vì vậy union ra đời để giải quyết việc này . 
Chúng ta có thể viết lại như thế này . 
```ts
function padLeft(value: string, padding: string | number) {
		console.log(value + padding)
}

padLeft(1,2)
```
Mọi thứ có vẻ sẽ nhẹ nhàng hơn 

Lưu ý : giải sử trong thuộc type có property riêng thì sẽ không thể gọi được 
```ts
interface  Bird {

fly(): void;

layEggs(): void;

}

interface  Fish {

swim(): void;

layEggs(): void;

}

declare  function  getSmallPet(): Fish | Bird;

let  pet = getSmallPet();

pet.layEggs();

// Only available in one of the two possible types

pet.swim();
```
Nếu muốn sử dụng thì ta phải check type chính xác trước
#### 3.1.5 Intersection types trong TS
##### 3.1.5.1 Intersection type là gì ?
intersection là kiểu dữ liệu giúp chúng ta tạo một type bao gồm các type mà chúng ta đã tạo trước đó.
##### 3.1.5.2 Cách sử dụng Intersection Type
```ts
interface BusinessPartner {
    name: string;
    credit: number;
}

interface Identity {
    id: number;
    name: string;
}

interface Contact {
    email: string;
    phone: string;
}
type Employee = Identity & Contact;

let e: Employee = {
    id: 100,
    name: 'John Doe',
    email: 'john.doe@example.com',
    phone: '(408)-897-5684'
};

```
Sử dụng Intersection type khá đơn giản , ta chỉ việc gộp các type hoặc interface bằng & 
Tóm lại : 
- Intersection type kết hợp hai hoặc nhiều loại để tạo ra một loại mới có tất cả các thuộc tính của các loại hiện có.
- Thứ tự type không quan trọng khi bạn kết hợp type
#### 3.1.6 index types in TypeScript
##### 3.1.6.1 index types là gì ? 
Trong TypeScript, bạn có thể tham chiếu kiểu thuộc tính đối tượng bằng cách sử dụng ký hiệu dấu ngoặc vuông.
#### 3.1.6.2 sử dụng index types 
##### 3.1.6.2.1 index types với object
```js
type Foo = {
   a: string;
   b: number;
   1: null;
}

type A = Foo["a"]; //string 
type B = Foo["b"]; //number
type ObjOne = Foo[1]; //null;
```
##### 3.1.6.2.2 index types và Mảng
```ts
type MyArray = [string, number, string];

type Zero = MyArray[0]; //string 
type One = MyArray[1]; //number
```
`keyof`từ khóa trả về kiểu liên hợp của tất cả các khóa có thể đó, cũng bao gồm các phương thức Array.prototype, chẳng hạn như `reduce`, `map`v.v.

```ts
type Reduce = MyArray["reduce"]; //type Reduce = {    (callbackfn: (previousValue: 0 | "one" | ..... 
type Length = MyArray["length"] //3
```
Điều này cũng hoạt động cho các đối tượng thông thường, nhưng không có nhiều phương thức gốc hữu ích tồn tại trên nguyên mẫu của đối tượng
```ts
type ToString = Foo["toString"]; //() => string
type Values = Foo["values"]; //Property 'values' does not exist on type 'Foo'.(2339)
```
#### 3.1.7  Mapped Types 
##### 3.1.6.1 Mapped Types là gì ? 
Mapped Types là kiểu  sử dụng liên hợp các PropertyKey (thường được tạo thông qua keyof) để lặp qua các khóa nhằm tạo kiểu . 
ví dụ : 
```ts
type  OnlyBoolsAndHorses = {

[key: string]: boolean | Horse;

};

const  conforms: OnlyBoolsAndHorses = {

del:  true,

rodney:  false,

};
```

##### 3.1.6.2 Mappper Type kết hợp với Generic 
```ts
type  OptionsFlags<Type> = {

[Property  in  keyof  Type]: boolean;

};type  OptionsFlags<Type> = {

[Property  in  keyof  Type]: boolean;

};
```
`OptionsFlags` sẽ lấy tất cả các thuộc tính từ kiểu` Type` và thay đổi giá trị của chúng thành boolean.
```ts

type  FeatureFlags = {

darkMode: () =>  void;

newUserProfile: () =>  void;

};

type  FeatureOptions = OptionsFlags<FeatureFlags>;


type FeatureOptions = { darkMode: boolean; newUserProfile: boolean; }
```
##### 3.1.6.3 Mapping Modifiers
Có hai công cụ sửa đổi bổ sung có thể được áp dụng trong quá trình ánh xạ: chỉ đọc và? ảnh hưởng đến tính đột biến và tính tùy chọn tương ứng. 
Bạn có thể xóa hoặc thêm các bổ ngữ này bằng cách thêm tiền tố - hoặc +. Nếu bạn không thêm tiền tố, thì + được giả định.
```ts
// Removes 'readonly' attributes from a type's properties

type  CreateMutable<Type> = {

-readonly [Property  in  keyof  Type]: Type[Property];

};

type  LockedAccount = {

readonly  id: string;

readonly  name: string;

};
type  UnlockedAccount = CreateMutable<LockedAccount>;

type UnlockedAccount = { id: string; name: string; }
// Removes 'optional' attributes from a type's properties
type  Concrete<Type> = {

[Property  in  keyof  Type]-?: Type[Property];

};

type  MaybeUser = {

id: string;

name?: string;

age?: number;

};

type  User = Concrete<MaybeUser>;

type User = { id: string; name: string; age: number; }
```
#### 3.1.8 Conditional type 
Trọng tâm của hầu hết các chương trình ,chúng ta phải đưa ra quyết định dựa trên đầu vào. Các chương trình JavaScript không có gì khác biệt, nhưng với thực tế là các giá trị có thể dễ dàng xem xét bên trong, những quyết định đó cũng dựa trên các loại đầu vào. Các loại điều kiện giúp mô tả mối quan hệ giữa các loại đầu vào và đầu ra.
```ts
interface  Animal {

live(): void;

}

interface  Dog  extends  Animal {

woof(): void;

}

type  Example1 = Dog  extends  Animal ? number : string;

type Example1 = number

type  Example2 = RegExp  extends  Animal ? number : string;

type Example2 = string
```
#### 3.1.8.1 Error handling example
Giả sử chúng ta có hai loại lỗi trong ứng dụng.
 1) Lỗi ứng dụng - Lỗi dành riêng cho ứng dụng 
 2) Lỗi - lỗi javascript thông thường.
 ```ts
abstract class ApplicationError {
    abstract status: number;
    abstract message: string;
}
```
```ts
class ServerError extends ApplicationError {
    status = 500;
    constructor(public message: string) {
        super();
    }
}
```
tạo một loại có điều kiện để xác định loại lỗi
```ts
type ErrorType<T extends {error: ApplicationError | Error}> = T['error'] extends ApplicationError ? ApplicationError : Error;

```
Bây giờ nếu bạn cố gắng chuyển một đối tượng có lỗi mở rộng ApplicationError, chúng tôi sẽ nhận được loại ApplicationError, nếu không chúng tôi sẽ nhận được loại lỗi
#### 3.1.8 Callback?
##### 3.1.8.1 Call back là gì ? 
Callback function có thể được hiểu nôm na như sau: callback tức là ta truyền một đoạn code **(Hàm A)** này vào một đoạn code khác **(Hàm B)**. Tới một thời điểm nào đó, Hàm A sẽ được hàm B gọi lại (**callback**)**.**
##### 3.1.8.2 Callback function hoạt động như thế nào?
Ta có thể truyền function như là một biến và return nó trong một function khác. Khi ta truyền callback function như là một tham số tới một function khác, ta chỉ truyền định nghĩa. Nó sẽ được thực thi khi ta truyền cả function dưới dạng tham số.

Và chúng ta đã có định nghĩa của function callback dưới dang tham số, ta có thể thực thi bất kì lúc nào trong function chứa nó.

**Chú ý:**  Function Callback không được thi thức thi. Nó có tên là “Callback” mà nhỉ nên chỉ được thực thi khi function chứa nó gọi đến callback function.
##### 3.1.8.3 Callback function là Closure
Khi ta truyền Callback function dưới dạng tham số tới một function khác, callback được thực thi trong body của function chứa nó với cái tên ta đặt ở nơi nhận tham số truyền vào. Như chúng ta đã biết, Closure có thể truy cập đến scope của function, cho nên Callback function có thể sử dụng các biến của function chứa nó hay thậm chí global scope.
##### 3.1.9.4 Giải thích về CallBack
Chi tiết triển khai về callback sẽ được giải thích trong bài viết [Này](https://github.com/mizhhieudo-it/LearnJavascript/tree/theory/JS018_CallBack)
##### 3.1.9.5 Giải thích vể Promise
Chi tiết triển khai về callback sẽ được giải thích trong bài viết [này](https://github.com/mizhhieudo-it/LearnJavascript/tree/theory/JS019_Promise)
##### 3.1.9.5 Giải thích về Async/Await 
Chi tiết triển khai về callback sẽ được giải thích trong bài viết [này](https://github.com/mizhhieudo-it/LearnJavascript/tree/theory/JS020_Async_Await)
:rotating_light: Cần đọc đúng theo trình tự theo Callback=>Promise=>Async/Await để hiểu rõ vấn đề mối quan hệ của 3 tính năng này . 
Updating Event-loop ...............
