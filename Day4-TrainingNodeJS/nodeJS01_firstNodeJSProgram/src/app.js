const http = require("http");
const server = http.createServer((req, res) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/html; charset=UTF-8')
    res.write('<h3>welcome to NODEJS </h3>')
    res.end()
})
server.listen(1234, "localhost", () => {
    console.log("Server runing port 1234 ...")
})