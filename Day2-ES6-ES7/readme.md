
# Tìm hiểu về ES6 - ES7 trong JS:chart_with_upwards_trend:


Mục lục :mag: 
1. ES6/ES7 là gì ?
2. Strict mode
3. Default Parameters
4. Destructuring
5. Spread operator
6. Template LiteralsMulti-line String
7. Arrow Functions
8. Scope, let, var, const...
9. Classs
### 1. ES6/ES7 trong JS là gì ? 
![enter image description here](images/js-j4f.png)

ES6, ES7 **là hai trong số những phiên bản của chuẩn ECMAScript**. Rõ ràng hơn thì ECMAScript là tiêu chuẩn còn Javascript là ngôn ngữ lập trình. ES6 được ra đời vào năm 2015 nên nó có thêm cái tên là ES2015. Tương tự như vậy ES7 hay còn gọi là ES2016.
### 2. Strict mode 
#### 2.1 Lịch sử ra đời
-   12/2009: Ra mắt phiên bản thứ năm, ES5.  **Đây chính là phiên bản đánh dấu sự xuất hiện của Strict Mode**
#### 2.2 Stric mode là gì ? 
**Strict** hiểu đơn giản theo nghĩa tiếng Việt là "nghiêm ngặt, nghiêm khắc". Strict Mode là tổ hợp một số  quy tắc nghiêm ngặt của Javascript
#### 2.3 Tại sao phải sử dựng Strict mode .
Theo đánh giá cá nhân , JS là một ngôn ngữ có rất nhiều tính năng rất dễ gây nhầm lẫn. Việc có một khuôn mẫu quy tắc sẽ giúp JS trở thành một ngôn ngữ hoàn hảo hơn . 
#### 2.4 Cách sử dụng Strict mode .
đặt `"use strict";` ở đầu file, phạm vi của Strict Mode sẽ là toàn bộ file đó.Việc định nghĩa như vậy được gọi dưới một cái tên là `directive prologue`.
Example : 

		"use strict"; 
		 function  foo()
		 { 
		  var bar =  0;
		  return bar; 
		  }
#### 2.5 Tổng hợp một số quy tắc của Strict mode 
##### 2.5.1 Không thể sử dụng một biến mà không khái báo 
		"use strict"; 
		 function  foo()
		 { 
		  bar =  0; // bar is not defined
		  return bar; 
		  }
		
- Giảm thiểu lỗi sai không khi gõ nhầm tên biến . thay vì gán bar = 0 ta lại gõ bas = 0 => chương trình vẫn chạy => sai logic 
- Giảm thiểu lỗi cách dùng biến global ngoài ý muốn 
#### 2.5.2 Báo lỗi ở những assignments vốn không thể thực hiện
Bình thường, với một property của object mà có `writable` là `false` thì đương nhiên bạn vẫn sẽ không thể ghi đè dữ liệu lên thuộc tính đó. Nhưng vấn đề là code vẫn cứ chạy. Còn trong Strict Mode, sẽ có lỗi được thông báo.

	NaN  =  "lol";  // Nothing happen  
	var obj =  {}; 
	Object.defineProperty(obj,'prop',{value:  2, writable:false});
	obj.prop;  // => 2 			   
	obj.prop =  10;
	obj.prop;  // => 2
Trong OOP một object mà chỉ có getter mà không có setter thì chỉ có thể đọc mà không thể gán giá trị . Trong JS việc gán giá trị cho một object chỉ có `writable` sẽ vẫn thực thi nhưng không lại không được gán . Strict mode ngăn chặn việc này bằng cách không cho phép
#### 2.5.3  Báo lỗi khi  delete những thứ không thể xoá

	"use strict";
	var foo = 1;
	function bar() {};
	delete foo; // Uncaught SyntaxError: Delete of an unqualified identifier in Strict Mode.
	delete bar;

	var obj = {};
	Object.defineProperty(obj, "baz", {
	    value: 1,
	    configurable: false
	});
	delete obj.baz; // Uncaught TypeError: Cannot delete property 'baz' of #<Object>

chú ý rằng ở normal mode, bạn cũng sẽ **không thể** thực hiện được các thao tác trên. Tuy nhiên code vẫn sẽ chạy bình thường mà không có lỗi gì được báo ra.
Còn ở strict mode thì sẽ báo lỗi 
#### 2.5.4 Các tham số của một hàm không được phép trùng nhau
	"use strict";
	function foo(bar, baz, bar) { 
	// Uncaught SyntaxError: Duplicate parameter name not allowed in this context
	}
	foo(1, 2, 3);
ở mode bình thường, bạn sẽ có các parameters bị trùng tên khi khai báo function. Và đương nhiên, giá trị của cái đằng sau sẽ đè lên cái trước đó.
ở strict mode : không cho phép => báo lỗi :// Uncaught SyntaxError: Duplicate parameter name not allowed in this context
#### 2.5.5 Không sử dụng được cách viết số thuộc hệ bát phân với tiền tố là  `0`
	"use strict";
	var foo = 010; // Uncaught SyntaxError: Octal literals are not allowed in Strict Mode.

nếu một số được bắt đầu bằng 0, thì javascript sẽ hiểu đó là hệ cơ số 8. Ví dụ `010 === 8` sẽ trả về giá trị là `true`.

Tuy nhiên, không phải ai cũng biết đến điều đó, và cách viết `010` có thể sẽ khiến nhiều người vẫn hiểu đó là `10`. Chính vì thế ở Strict Mode, nó đã bị coi là một lỗi cú pháp.
 // Uncaught SyntaxError: Octal literals are not allowed in Strict Mode.
 Chú ý : ở ES6, bạn lại có thể dùng cách viết trên, với tiền tố là `0o`. Tức dù là trong Strict Mode, nhưng `var foo = 0o10` vẫn là một cách viết hợp lệ, và `0o10 === 8` sẽ trả ra kết quả là `true`.
 #### 2.5.6 Không thể sử dụng  `with`
	 "use strict";
	var foo = 1;
	var bar = {foo: 2}
	with (bar) {
	  console.log(foo); // Bạn sẽ gặp khó khăn trong việc xác định foo ở đây là biến, hay là thuộc tính của bar.
	}
`with` là một câu lệnh nguy hiểm, có thể gây ra nhầm lẫn trong nhiều trường hợp. Chính vì thế, trong Strict Mode, nó bị loại bỏ hoàn toàn, và nếu bạn cố tình sử dụng `with`, bạn sẽ gặp lỗi Syntax Error.
#### 2.5.7 Không sử dụng được biến được khai báo bên trong  `eval`	
	// Non-Strict Mode
	eval("var foo = 1");
	foo // 1

	// Strict Mode
	"use strict";
	eval("var foo = 1");
	foo // Uncaught ReferenceError: foo is not defined

Bình thường, nếu trong hàm  `eval`  của bạn có khai báo biến thì scope của biến đó sẽ là Global, hoặc là bên trong function, nơi mà  `eval`  được gọi.

Tuy nhiên, ở Strict Mode, khi đã kết thúc  `eval`, bạn sẽ không thể sử dụng được biến nữa.Global
#### 2.5.8 Không thể sử dụng  `eval`  và  `arguments`  như là một  `identifier` 
	"use strict";
	var eval = 1;
	// Syntax Error
	function arguments() { };
	var foo = function eval() { };
	function bar(eval) { };

Trong Strict Mode, bạn sẽ không thể sử dụng được `eval` và `arguments` như là một tên biến, thên function, hay tên paramenter ... Mọi cố gắng để sử dụng 2 từ khoá đó cho mục đích như trên đều sẽ tạo ra Syntax Error.
#### 2.5.9 Thay đổi cách thức hoạt động của  `this`  trong một số trường hợp
	function foo() {
	    return this;
	}

	// Non-Strict Mode
	foo.call(1) === 1; // false.
	// Bởi foo.call(1) sẽ trả ra giá trị là một object, tương đương với `new Number(1)`

	// Strict Mode
	foo.call(1) === 1; // true

Trong strict mode :
-   `this`  sẽ không còn bị chuyển thành Global object (`window`) nếu nó là  `null`  hay  `undefined`
-  `this`  sẽ không bị ép thành object nữa.
#### 2.5.10  Hạn chế sử dụng các property  `caller`,  `callee`  và  `arguments`  trong một số trường hợp
	function foo(bar, baz) {
	    "use strict";
	    // Uncaught TypeError: 'caller', 'callee', and 'arguments' properties may not be accessed on Strict Mode
	    // functions or the arguments objects for calls to them
	    console.log(arguments.callee);
	    console.log(foo.caller);
	    console.log(foo.arguments);
	    }
Ở Strict Mode, bạn sẽ không thể gọi ra `.caller` hay `.arguments` từ tên hàm, hay cũng không thể gọi `arguments.callee`.
#### 2.5.11 Không thể định nghĩa function bên trong một statement hay một block
	"use strict";
	function foo() {
	    function bar() { }; // OK
	}

	if (aVariable) {
	    var baz = function () { return true }; // OK
	}

	{
	    function qux() { return true }; // SyntaxError
	}
Strict Mode chỉ cho phép bạn định nghĩa một function ở ngoài cùng của file script, hay ngay bên trong một function khác. Bạn sẽ không thể định nghĩa một function bên trong một hàm `if`, hàm `for`, hay một block `{}`.
#### 2.5.12  Không thể sử dụng một số từ khoá được "giữ chỗ" trước cho những phiên bản ES sau này
Việc ECMAScript phát triển để phù hợp với những yêu cầu của một ngôn ngữ hiện đại là điều tất yếu. Thế nên ngay từ ES5, với Strict Mode, một cái tên "có thể sẽ được sử dụng" trong tương lai với tư cách là keyword đã không thể sử dụng như là identifier được nữa.

Đó là những từ:

-   `implements`
-   `interface`
-   `let`
-   `package`
-   `private`
-   `protected`
-   `public`
-   `static`
-   `yield`
### 3. Default Parameters 
#### 3.1 Default Parameters là gì ? 
**Default Parameter** là giá trị mặc định của tham số khi truyền vào các function
#### 3.2 Sử dụng Default Parameters như thế nào ? 
Cách viết này được sử dụng bắt đầu tử es6 

	function  zoo(params = 'if param null then get this value') {
			return  params;
	}
	// sử dụng
	zoo();
	zoo("Holo bla!!!") ;
	
### 4.  Destructuring trong JavaScript 
#### 4.1 Destructuring là gì ?
- **Destructuring** là một cú pháp cho phép bạn gán các thuộc tính của một Object hoặc một Array. 
- Có hai loại **Destructuring**: 
	- Destructuring Objects 
	- Destructuring Arrays.
- Ví dụ chúng về Destructuring :
#### 4.2 Ví dụ về  Destructuring Objects  và Destructuring Arrays và phân tích
- Destructuring Objects

		const  {a, b,  ...c}  =  {a:  1, b:  2,  c:  ()  =>  3, d:  4}
		console.log(a, b, c)// 1, 2, { c: () => 3, d: 4}
- Destructuring Arrays

		const  [a, b,  ...c]  =  [1,  2,  3,  4,  5] 
		console.log(a, b, c)  ;  //1, 2, [3, 4, 5]
		chú thích : ...c : rest ES6 	

Trên đây là 2 ví dụ về Destructuring cho cả Object và Arrrays . Vậy tại sao phải sử dụng Destructuring ? 
##### 4.2.1 **- Variable assignment**
	Quay trở lại với ví dụ : 
	
	const  [a, b, c]  =  [1,  2,  3,  4,  5] 
	console.log(a, b, c)  ;  //1, 2, 3

Khi làm việc của restFul API . Rõ ràng việc khi báo từng  biến theo kiểu var a = arr[0]  ; var b = arr[1] đúng là một cực hình . Việc sử dụng kiểu viết short hand này rất có lợi cho những trường hợp như thế này .
##### 4.2.2 **Swapping**
Thuật toán kinh điển Swapping nếu triển khai ra kiểu như thế này 
	
	var a =  1;  var b =  2;  var temp; 
	temp = a;
	 a = b; 
	 b = temp; 
	 console.log(a, b)  ;//2, 1
Nhưng khi triển khai bằng Destructuring thì trông nó như thế này 

	var a = 1;
	var b = 2;
	[a, b] = [b, a]
	console.log(a, b) ;//2, 1
với kiểu viết Destructuring ta sẽ không tốn bộ nhớ để lưu một biến cơ làm chung gian
##### 4.2.3 **Ignoring values**
	
	const res = () => [1, 2, 3] 
	const [a, ,b] = res() // lưu ý : bỏ qua 1 phần tử thì dùng dấu , , vị trí được bỏ đi sẽ đi theo index
	console.log(a, b) ;//1,3
Loại bỏ giá trị dư thừa cũng sẽ đơn giản hơn rất nhiều khi ta dùng destructuring 
##### 4.2.4 **Assignment to new variables**
	const res = {blog: 'abc.com', type: 'javascript'}
	const {blog: nameBlog, type: newType} = res;
	console.log(nameBlog, newType);//abc.com, javascript
Có thể nếu dùng chưa quên cách viết này lúc đọc sẽ rất khó chịu , nhưng khi đã quen rồi thì ta sẽ thấy nó  rất tiện cho người viết . Thay vì phải gán các properties của một object cho từng biến thì ta có thể viết gộp luôn vào . Lưu ý nếu các biến gán compare vớitên thuộc tính trong object mà trùng thì chúng tự động gán trị cho biến luôn 

	const res = {blog: 'abc.com', type: 'javascript'}
	const {blog,type} = res;
	console.log(blog, blog);//abc.com, javascript
#### 4.2.5 **Nested object and array destructuring**
	const blogs = {
		anonystick: [
	  	{
	      pageFacebook: 'Tip javascript Viet Nam',
	      likes: 4789,
	      daily: 1323
	    }
	  ]
	}

	const {
	  anonystick: [
	  	{
	  	  pageFacebook: namePage,
	      likes: numLikes,
	      daily: numDaily
	    }
	  ]
	} = blogs;

	console.log(namePage, numLikes, numDaily );//Tip javascript Viet Nam, 4789, 1323

Có thể nó là destructuring là một công cụ rất mạnh để  , thay vì phải chọc vào từng index trong array để lấy value thì dùng destructuring có thể lấy được luôn :fire: 
### 5. Spread operator
#### 5.1 Spread operator là gì ?
Spread operator là một cách rất hữu dụng và ngắn gọn để dùng trong các thao tác với mảng như thêm phần tử vào mảng, kết hợp mảng (hoặc object), truyền tham số mảng vào function, ...
#### 5.2 Tại sao phải sử dụng spread operator  ?
	(1)Math.max(1,3,5) // output: 5
	(2)Math.max([1,3,5]) // output: NaN

Ta mong muốn line 2 sẽ  cho kết quả bằng 5 nhưng rõ ràng Math.max hiểu [1,3,5] chỉ được tính là một phần tử . Vậy đã tới lúc phải dùng tới spread operator 

	Math.max(...[1,3,5]) // output: 5
#### 5.3 Các tính năng của spread operator :
Các tính năng của spread operator gồm có : 
-   Sao chép một mảng
-   Tách hoặc kết hợp một hay nhiều mảng
-   Sử dụng mảng như danh sách các argument
-   Thêm một item vào một list
-   Thao tác với state trong React
-   Kết hợp các objects
-   Chuyển NodeList thành một array
#### 5.4 Làm rõ các tính năng của spread operator 
##### 5.4.1 Sao chép một mảng 
	const fruits = ['🍏','🍊','🍌','🍉','🍍']
	//sao chép mảng fruits sang mảng moreFruits
	const moreFruits = [...fruits]; 
	console.log(moreFruits) // Array(5) [ "🍏", "🍊", "🍌", "🍉", "🍍" ]
Spread operator cho phép copy một mảng rất dễ dàng . 
##### 5.4.2 Sử dụng mảng như danh sách các tham số
trở lại ví dụ : 

	Math.max(...[1,3,5]) // output: 5

Spread operator sẽ tách một mảng thành danh sách các tham số rồi truyền nó vào như một param
##### 5.4.3 Thêm phần tử vào mảng
	const fewFruit = ['🍏','🍊','🍌']
	const fewMoreFruit = ['🍉', '🍍', ...fewFruit] 
	//thêm các phần tử của mảng fewFruit vào mảng fewMoreFruit
	console.log(fewMoreFruit) //  Array(5) [ "🍉", "🍍", "🍏", "🍊", "🍌" ]
Thay vì phải push từng phần từ vào mảng ,ta hoàn toàn có tạo ra một mảng mới và truyền các phần tử ta muốn rồi  copy cả mảng cũ vào .
##### 5.4.4 Kết hợp 2 hay nhiều object với nhau
	const objectOne = {hello: "🤪"}
	const objectTwo = {world: "🐻"}

	// Kết hợp objectOne, objectTwo lại trong objectThree và thêm thuộc tính laugh
	const objectThree = {...objectOne, ...objectTwo, laugh: "😂"}
	console.log(objectThree) 
	// Object 
	{ 
	hello: "🤪",
	world: "🐻",
	laugh: "😂" 
	}

### 6.  Template LiteralsMulti-line String
#### 6.1 Template LiteralsMulti-line String là gì ? 
Template Literals hay còn gọi là Template Strings là một cú pháp mới để khai báo String trong Javascript được giới thiệu trong ES2015/ES6.Cho phép chúng ta sử dụng  sử dụng biến, biểu thức, hàm bên trong string mà không phải thông qua phép cộng string.
#### 6.2 Sử dụng Template LiteralsMulti-line String như thế nào ? 

	var cat =  `Con mèo`; 
	 var embededVar =  `${cat} đang bay?`;  // Con mèo đang bay?
#### 6.3 Tính năng  Tagged template của Template Literals
Tính năng này cho phép chúng ta truyền một template literals vào 1 hàm tag bằng cách viết tên hàm này trước dấu back-tick bắt đầu 1 template literal.

```js
const func = (arr, expr1, expr2) => {
  console.log(arr); // (1)
  console.log(expr1, expr2); // (2)
  return { x: "1" };
};

// expression
const a = 1;
const b = 2;

// tagged template
const result = func`${a} and then ${b}`;

// kết quả
console.log(result); // (3)

// (1) - mảng các string: ["", " and then ", ""]
// (2) - các expression: 1 2
// (3) - kết quả: { x: "1" }
```
### 7.  Arrow Functions
#### 7.1 Arrow Functions là gì ? 
Arrow function là một hàm vô danh và nó thay đổi cách `this` bind đến function. 
Ví dụ về Arrow Functions : 
```js
var hello = (name, message) => {
    console.log("Chào " + name + ", bạn là " + message);
};
 
hello('Cường', 'admin freetuts.net');
```
#### 7.2  Arrow Functions và các trường hợp sử dụng
#####  7.2.1  Trường hợp một tham số:
```js
var hello = message => {
    console.log(message);
};
     
hello('Chào mừng bạn đến với freetuts.net');
```
Trường hợp này bỏ dấu ()
##### 7.2.2 Trường hợp không tham số 

```js
var hello = () => {
    console.log("halo");
};
     
hello();

```
##### 7.2.2 Trường hợp nhiều tham số 

```js
var hello = (name, message) => {
    console.log("Chào " + name + ", bạn là " + message);
};
 
hello('Cường', 'admin freetuts.net');
```
#### 7.3 Cách sử dụng và một số ví dụ cơ bản 
##### 7.3.1 Kết hợp với  hàm map
```js
var domain = ["freetuts.net", 'qa.freetuts.net', 'demo.freetuts.net'];
 
domain.map((val, key) => {
    console.log(val.toUpperCase());
});

```
Arrow Functions đóng vài trò là một call back để hứng value . Mục đích cuối cùng là hứng được value . Thay vì phải viết function tường minh thì ta có thể sử dụng arrow functions
##### 7.3.1 Kết hợp với  hàm settimeout 
```js
setTimeout(() => {
    console.log('3 giây đã trôi qua');
}, 3000);
```
##### 7.4 Sự khác biệt của this trong arrow function và function
This là một từ khoá khá quen thuộc trong khá nhiều ngôn ngữ, nó dùng để trỏ tới chính object gọi hàm đó và javasrcipt cũng thế.
```js
const person = {
  name_person:'hue',
  getNamePerson: function() {
    console.log(this.name_person);
  }
};

//Ở đây this sẽ là object person
person.getNamePerson();

$('button').click(person.getNamePerson); //getNamePerson truyền vào như callback
```
Ở đây suốt hiện một vấn đề this ở trong function getNamePerson không chỏ tới person mà chỏ tới button . Để fix việc mập mờ ngữ cảnh thì ta phải sử dụng từ khóa `bind`

	$('button').click(person.getNamePerson.bind(person)); 

Khá rườm già và rắc rối 
ta có thể sử dụng arrow function bởi vì Khác với function thông thường,  **arrow function không có bind**  vì vậy, không định nghĩa lại this. Do đó, this sẽ tương ứng với ngữ cảnh gần nhất của nó.

Và cũng chính bởi nó không định nghĩa this, nên  _**arrow function không phù hợp làm method của object**_, vì vậy nếu định nghĩa method của object, function vẫn là sự lựa chọn đúng đắn
```js
const person = {
  name_person:'hue',
  getNamePerson = () =>{
    console.log(this.name_person);
  }
};

//Ở đây this sẽ là object person
person.getNamePerson();

$('button').click(person.getNamePerson); //getNamePerson truyền vào như callback
```
#### 8. const,let,var và ES6/7 
##### 8.1 Đặc điểm của var

Var có tính chất là dù khai báo ở đâu thì biến đều sẽ được đem lên đầu scope trước khi code được thực hiện.

##### 8.2 Đặc điểm của let

- Một trong những nguyên nhân khiến let có thể thay thế var để xử lý vấn đề nêu trên là vì biến let được khai báo sẽ có scope là **block scoped** => dễ kiểm soát hơn .

- Giống với `var`, `let` cũng có tính **hoisting** - (đẩy lên đầu) tuy nhiên lại khác nhau ở chỗ thay vì `var` được khởi tạo với giá trị là `undefined` thì `let` sẽ không có bất kỳ giá trị khởi tạo nào.

##### 8.3 Đặc điểm của const

- có scope giống như **let** nhưng **const** không cho thay đổi giá trị nhưng đối với **reference** (bao gồm object, array, và function) thì tuy không thể tái khai báo hay cập nhật giá trị của biến nhưng chúng ta vẫn có thể cập nhật giá trị cho thuộc tính của biến đó. 
##### 8.4 KẾT LUẬN 
tối thiểu số lần sử dụng var ,chỉ dùng khi thật sự cần thiết mà thay và đó dùng let . Hằng số thì dùng const. 
### 9 . Class trong JS  
#### 9.1 Class là gì ? 
Class là một khái niệm trong hướng đối tượng (OOP) .Có thể hiểu đơn giản Class như một `template` để tạo ra các đối tượng .
#### 9.2  Class  và hướng đối tượng (trong JS) 
Hướng đối tượng là một phạm trù rất rộng vì vậy không thể giải thích chi tiết được trong một  bài viết . Tuy nhiên bài viết này hướng tới những đối tượng đã sử dụng OOP ở một ngôn ngữ khác . 
Xem ví dụ sau đây :
```js
//Khai báo một lớp có tên Product

class  Product {

//Hàm khởi tạo

constructor(name, price) {

this.name = name;

this.price = price;

this.infomation = `${name} - ${price}`;

}

//Khai báo một phương thức

checkStore(storeid) {

console.log(this.name  +  ' in store '  +  storeid);

}

//Hàm getter

get  info() {

return  this.infomation;

}

//Hàm setter

set  info(i) {

this.infomation = i;

}

//Phương thức tĩnh

static  convertMoney(m) {

console.log(m);

return  m  +  ' đồng';

}

}

//SỬ DỤNG LỚP

//Tạo một đối tượng từ lớp bằng new

let  sanpham = new  Product('Iphone', 1000);

//truy cập thuộc tính đối tượng sanpham.name

console.log(sanpham.name);

//gọi một phương thức của đối tượng

sanpham.checkStore(100);

//Gọi setter

sanpham.info = 'Thông tin sản phẩm ...';

//Gọi getter

console.log(sanpham.info);

//Gọi một hàm tĩnh

Product.convertMoney(100000);
```
Một số lưu ý khi dùng OOP chuyển đổi ngôn ngữ : 
- Lớp khai báo với từ khóa `class`, bắt buộc có hàm khởi tạo `constructor`, hàm này được gọi khi khởi tạo đối tượng lớp `new Product('Iphone', 1000)`
- Các phương thức (checkStore) khai báo trong lớp giống như khai báo hàm nhưng bỏ đi khóa `function`
- Ở trước phương thức có từ khóa `get` thì nó gọi làm phương thức getter, nó được gọi như cách truy cập thông tin thuộc tính
- Ở trước phương thức có từ khóa  `set`  thì nó là setter, nó được gọi khi bị gán (=)
-  Phương thức tĩnh có keyword  `static`, được gọi qua tên lớp (nó không thể tham khảo đến đối tượng lớp qua  `this`)
##### 9.3 Tính kế thừa của lớp
Giống như nhiều ngôn ngữ lập trình hướng đối tượng, JS cung cấp tạo ra một lớp mới có kế thừa lại thuộc tính, phương thức của một lớp khác. Để tạo ra một lớp con kế từ lớp cha dùng từ khóa `extends`
```js
class  Computer  extends  Product {

constructor(name, price, store) {

super(name, price);

this.store = store;

}

  

set  info(i) {

//super.info(i) - nếu muốn thi hành phương thức của lớp cha

this.infomation = name  +  ':'+i;

}

  

totalInStore() {

console.log('totalInStore');

}

}

  
  

//Sử dụng

let  sanpham = new  Computer('Dell', 2000);

console.log(sanpham.name);

sanpham.checkStore(200);

  

sanpham.info = 'Thông tin sản phẩm ...';

  

console.log(sanpham.info);

sanpham.totalInStore();
```
Lưu ý khi kế thừa : 
- Nếu trong lớp con khai báo một phương thức trùng tên đã có ở lớp cha thì phương thức lớp con được sử dụng mặc định, nếu muốn gọi đến phương thức của lớp cha dùng dùng từ khóa `super` thay cho `this` để tham khảo đến lớp cha
-  Hàm khởi tạo lớp cha có tham số, do vậy bắt buộc phải gọi hàm tạo của lớp cha bằng  `super(..);`  trong  `constructor`  của lớp con 
