# Theory JS Basic :rocket:

### 1.Variable 
#### 1.1 Variable là gì ?
Biến là vùng chứa để lưu trữ các giá trị dữ liệu
#### 1.2 Cách khai báo variable .
	Có 3 cách để khai báo variable : 
		- SỬ dụng let 
		- Sử dụng var 
		- Sử dụng const 
#### 1.3 Phạm vi sử dụng của variable (scope)
##### 1.3.1 Đặc điểm của var 
Var có tính chất là dù khai báo ở đâu thì biến đều sẽ được đem lên đầu scope trước khi code được thực hiện.
##### 1.3.2 Đặc điểm của let 
- Một trong những nguyên nhân khiến let có thể thay thế var để xử lý vấn đề nêu trên là vì biến let được khai báo sẽ có scope là **block scoped** => dễ kiểm soát hơn .
- Giống với `var`, `let` cũng có tính **hoisting** - (đẩy lên đầu) tuy nhiên lại khác nhau ở chỗ thay vì `var` được khởi tạo với giá trị là `undefined` thì `let` sẽ không có bất kỳ giá trị khởi tạo nào.
##### 1.3.3 Đặc điểm của const 
- có scope giống như **let** nhưng **const** không cho thay đổi giá trị nhưng đối với **reference** (bao gồm object, array, và function) thì tuy không thể tái khai báo hay cập nhật giá trị của biến nhưng chúng ta vẫn có thể cập nhật giá trị cho thuộc tính của biến đó.
### 2.Loop in JS
#### 2.1 Loop là gì ?
Loop là một tính năng trong lặp trình nói chung , giúp lặp các block code nhiều lần
#### 2.2 Khai báo loop 
	Có cách loại vòng lặp như sau :
		- For : lặp một khối code nhiều lần 
		- For/in : lặp qua các thuộc tính của một object
		- For/of : được sử dụng để lặp qua các iterable objects, lặp lại các giá trị của chúng thay vì các thuộc tính của chúng.
		- while : lặp qua một khối mã trong khi một điều kiện được chỉ định là đúng
		- do/while : cũng lặp lại qua một khối mã trong khi một điều kiện được chỉ định là đúng
#### 3. Function JS 
##### 3.3.1 Function JS là gì ?
 **Function**  (hàm, chức năng), gọi chung là **subprogram (chương trình con)** có thể được gọi ở bên ngoài hoặc bên trong chính nó.

Nó bao gồm tập hợp các câu lệnh gọi là **function** **body.** Các giá trị có thể truyền đến một hàm, và một hàm có thể trả về giá trị.
##### 3.3.2 Các loại function trong JS
	- function declaration: Khi một hàm được định nghĩa độc lập thì đó gọi là "function declaration" .Function Declaration có thuộc tính hoisting
	- function expression : khi một hàm được định nghĩa bên trong một biểu thức, đó gọi là "function expression"
##### 2.3.3 Các cách định nghĩa function 
-  1.Regular function:
		 là việc khai báo một hàm thông thường. Thông thường ở đây có nghĩa là bạn khai báo hàm một lần và sau đó gọi nó ở nhiều nơi khác nhau.
		 **Regular function có bind** => tồn tại con trỏ this
- 2.Arrow Function:
đều là function được giới thiệu trong es6, nhưng cách viết và cách tham chiếu tới bối cảnh (context) khác nhau.
**arrow function không có bind** vì vậy, không định nghĩa lại this
#### 4. Comparison and Logical Operators
##### 4.1 Comparison and Logical Operators là gì ?
 Comparison and Logical Operators là các toán tử để trả về kết quả đúng hoặc sai 
##### 4.2 Toán tử Comparison
 
|Toán tử|Mô tả  |
|--|--|
|==| So sánh bằng : không cần cùng kiểu dữ dữ liệu  |
| === | So sánh bằng : so sánh bằng nhưng cần phải cùngkiểu  dữ liệu   |
|!=|so sánh khác : không cần kiểm tra kiểu dữ liệu|
|!==|so sánh khác: có kiểm tra kiểu dữ liệu|
|>|so sánh lớn hơn|
|<|so sánh nhỏ hơn|
|>=|so sánh lớn hơn bằng |
|<=|so sánh nhỏ hơn bằng | 
##### 4.2.1 Toán tử 3 ngôi 
JavaScript cũng chứa một toán tử điều kiện để gán giá trị cho một biến dựa trên một số điều kiện.
Toán tử 3 ngôi có dạng : (biểu thức logic)?"kết quả đúng":"kết quả sai"
##### 4.2.2 Toán tử logic 
|Toán tử  | mô tả  |
|--|--|
| && | và  |
| \|\| |hoặc |
|!|ngược lại|
#### 5. Condition JS
##### 5.1 Condition JS là gì ? 
Condition là các câu lệnh rẽ nhánh code theo một logic nhất định .
##### 5.2 các kiểu Condition JS 
*  Condition là một hoặc nhiều mệnh đề điều kiện có giá trị trả về **TRUE/FALSE.**
  
        if (condition) { //nếu điều kiện đúng thì thực hiện }
* else: Như ở phía trên mình có nói câu lệnh `if` thực hiện khi mệnh đề đi kèm nó đúng, và mệnh đề else sẽ thực hiện khi điều kiện của mệnh đề if không thỏa mãn.
  
        if (true)
        { // nếu đúng thì chạy code trong này } 
        else
        { //nếu sai thì chạy code trong này }
        else if : kết hợp nhiều điều kiện hơn 
        if (condition) 
        { // đúng thì vào đây } 
        else  if (condition) 
        { // đúng thì vào đây} 
        else
        { // không thì vào đây}
	  
 * Ngoài ra ta có thể thực hiện các lệnh else if lofng 
 ##### 5.2.2 Switch case.
 -Đây là một loại câu lệnh rẽ nhánh( hay còn gọi là câu lệnh điều kiện) có đặc điểm là để giải quyết các bài toán mà có các nhánh là các điều kiện cố định.
 
	 switch (condition) {
	    case value1:
	        //code
	        break;
	    case value2:
	        //code
	        break;
	    default:
	        //code
	        break;
	}
  #### 5.Expressions trong JS
  ##### 5.1 Expressions là gì ?
  Biểu thức chính quy (_regular expressions_ ) là các mẫu dùng để tìm kiếm các bộ kí tự được kết hợp với nhau trong các chuỗi kí tự.
  ##### 5.2 Cách dùng Expressions 
  * Cách 1 :Sử dụng cách mô tả chính quy thuần (regular expression literal):
			
		var re = /ab+c/;
	  
* Cách 2 :Tạo một đối tượng `RegExp` :

			var re = new RegExp("ab+c");
##### 5.3 Bảng tra RegExp :
![RegExp image description ](/Day1/images/regex.jpg)

#### 6 . JavaScript Operators
 ##### 6.1 JavaScript Arithmetic Operators
 
| Toán tử | Mô tả  |
|--|--|
| + | phép cộng  |
|- | phép trừ |
|*| phép nhân|
|/| phép chia |
|%| chia lấy phần dư|
|++|  tăng 1 đơn
|-\-| giảm một đơn vị
##### 6.2  JavaScript Assignment Operators 
|Toán tử | Same  |
|--|--|
| = | phép gán  |
|+=| x = x + y
|-=|x = x - y|
|*=| x = x * y|
|/=|x = x / y|
|%=| x = x % y|


