# Tìm hiểu NodeJS

![enter image description here](https://trankyphat.com/wp-content/uploads/2015/05/nodejs-logo.png)

Mục lục :mag: : 

-  NodeJS là gì ? Version của node 
- Ưunhược điểm
- những loại projects phù hợp để dùng nodejs
- IDEs phổ biến để code
- Môi trường phát triển, cài đặt và xây dựng ứng dụng đầu tiên
- Demo 
#### 1. **Nodejs là gì?**
Nodejs là một nền tảng được phát triển độc lập trên V8 JavaScript Engine – trình thông thực thi mã JavaScript
Node vẫn còn đang được hoàn thiện để hoàn hảo hơn vì vậy các Version của NodeJS cập nhập liên tục.  
#### 1.1 Version của NodeJS-
- Ở thời điểm hiện tại ( 15/7/2022) NodeJS đã đc cập nhật đến version 18.6.0 
- Mỗi version của nodeJS sẽ như một bản vá fix các lỗi và hỗ trợ dev như : 
	- bản nâng cấp version NodeJS 12 :
		- V8 updated to version 7.4
		-  Async stack traces
		-  Public class fields
		- Private class fields
		- llhttp` parser in Node.js 12
		- Diagnostic Reports
	- bản nâng cấp version NodeJS 14 : 
	  -  V8 updated to version V8 8.1
	  - Node Streams đã được update
	  - Modules Warning được loại bỏ 
	  - Diagnostic Reporting sử dụng ổn định
	- bản nâng cấp version NodeJS 16 : 
		- timers promises API sử dụng ổn định 
		- V8 JavaScript engine update version 9.0 
		- Toolchain and compiler được cập nhật
	- bản nâng cấp version NodeJS 18.0 cập nhật thêm các tính năng :
		-   Experimental fetch API
		-  Web Streams API
		-  HTTP Timeouts
		-  Experimental test runner   
		- V8 JavaScript engine update v10.1 
#### 2 .  Ưu,nhược điểm của nodeJS
-	Ưu điểm : 
	-	1.  Đặc điểm nổi bật của Node.js là nó nhận và xử lý nhiều kết nối chỉ với một single-thread. Điều này giúp hệ thống tốn ít RAM nhất và chạy nhanh nhất khi không phải tạo thread mới cho mỗi truy vấn giống PHP. Ngoài ra, tận dụng ưu điểm non-blocking I/O của Javascript mà Node.js tận dụng tối đa tài nguyên của server mà không tạo ra độ trễ như PHP
	-	2. JSON APIs Với cơ chế event-driven, non-blocking I/O(Input/Output) và mô hình kết hợp với Javascript là sự lựa chọn tuyệt vời cho các dịch vụ Webs làm bằng JSON
	-	3.  Ứng dụng trên 1 trang( Single page Application) Nếu bạn định viết 1 ứng dụng thể hiện trên 1 trang (Gmail?) NodeJS rất phù hợp để làm. Với khả năng xử lý nhiều Request/s đồng thời thời gian phản hồi nhanh. Các ứng dụng bạn định viết không muốn nó tải lại trang, gồm rất nhiều request từ người dùng cần sự hoạt động nhanh để thể hiện sự chuyên nghiệp thì NodeJS sẽ là sự lựa chọn của bạn.
	- 4.  Shelling tools unix NodeJS sẽ tận dụng tối đa Unix để hoạt động. Tức là NodeJS có thể xử lý hàng nghìn Process và trả ra 1 luồng khiến cho hiệu xuất hoạt động đạt mức tối đa nhất và tuyệt vời nhất.
	-	5. Streamming Data (Luồng dữ liệu) Các web thông thường gửi HTTP request và nhận phản hồi lại (Luồng dữ liệu). Giả xử sẽ cần xử lý 1 luồng giữ liệu cực lớn, NodeJS sẽ xây dựng các Proxy phân vùng các luồng dữ liệu để đảm bảo tối đa hoạt động cho các luồng dữ liệu khác.
	-	6.  Ứng dụng Web thời gian thực Với sự ra đời của các ứng dụng di động & HTML 5 nên Node.js rất hiệu quả khi xây dựng những ứng dụng thời gian thực (real-time applications) như ứng dụng chat, các dịch vụ mạng xã hội như Facebook, Twitter,…-

- Nhược điểm : 
- 1.  Ứng dụng nặng tốn tài nguyên Nếu bạn cần xử lý các ứng dụng tốn tài nguyên CPU như encoding video, convert file, decoding encryption… hoặc các ứng dụng tương tự như vậy thì không nên dùng NodeJS (Lý do: NodeJS được viết bằng C++ & Javascript, nên phải thông qua thêm 1 trình biên dịch của NodeJS sẽ lâu hơn 1 chút ). Trường hợp này bạn hãy viết 1 Addon C++ để tích hợp với NodeJS để tăng hiệu suất tối đa !
#### 3. Khi nào thì sử dụng NodeJS 
-   Node.js thực sự tỏa sáng trong việc xây dựng RESTful API (json). Gần như không có ngôn ngữ nào xử lý JSON dễ dàng hơn Javascript, chưa kể các API server thường không phải thực hiện những xử lý nặng nề nhưng lượng concurrent request thì rất cao. Mà Node.js thì xử lý non-blocking. Chẳng còn gì thích hợp hơn Node.js trong trường hợp này!
    
-   Những ứng dụng đòi hỏi các giao thức kết nối khác chứ không phải chỉ có http. Với việc hỗ trợ giao thức tcp, từ nó bạn có thể xây dựng bất kỳ một giao thức custom nào đó một cách dễ dàng.
    
-   Những ứng dụng thời gian thực: Khỏi phải nói vì Node.js dường như sinh ra để làm việc này!
    
-   Những website stateful. Node.js xử lý mọi request trên cùng một process giúp cho việc xây dựng các bộ nhớ đệm chưa bao giờ đơn giản đến thế: Hãy lưu nó vào một biến global, và thế là mọi request đều có thể truy cập đến bộ nhớ đệm đó. Caching sẽ không còn quá đau đầu như trước đây, và bạn có thể lưu cũng như chia sẻ trạng thái của một client với các client khác ngay trong ngôn ngữ, chứ bạn không cần thông qua các bộ nhớ ngoài!
#### 4. IDEs phổ biến để code : 
TOP 5 IDE phổ biến để code : 
- #### **1. Visual Studio**
- **2.Cloud 9**
- #### **3. WebStorm**
- #### **4 . Komodo IDE**
- #### **5. IntelliJ**
#### 5. Hướng dẫn cài nodeJS
Cài nodeJS theo hướng dẫn sau [Click to here!!](https://phoenixnap.com/kb/install-node-js-npm-on-windows)
#### 6.Demo first app nodeJS
Xem chi tiết tại [đây](https://github.com/mizhhieudo-it/Training_VMO/tree/theory/Day4-TrainingNodeJS/nodeJS01_firstNodeJSProgram/src)