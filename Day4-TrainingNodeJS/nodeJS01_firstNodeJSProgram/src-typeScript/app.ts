import * as http from "http";
import * as fs from "fs";
// import * as url from "url";
import { json } from "stream/consumers";
import { DemoContoller } from "./controller/DemoController";
import Cryptr from "cryptr";
import * as urls from "url";
let i = 0;
http
  .createServer(function (req: http.IncomingMessage, res: http.ServerResponse) {
    let url = req.url;
    if (url === "/") {
      DemoContoller.index(req, res);
    } else if (url === "/create-profile.html") {
      DemoContoller.LayoutCreateProfiles(req, res);
    } else if (url == "/fileupload") {
      DemoContoller.WriteFileProfiles(req, res);
    } else if (url === "/sentMail") {
      DemoContoller.SendMai(req, res);
    } else {
      fs.readFile("asset/HTML/index.htm", function (err, data) {
        res.writeHead(200, { "Content-Type": "text/html" });
        res.write(data);
        return res.end();
      });
    }
  })
  .listen(8080, "localhost", () => {
    console.log("SERVER RUNNING PORT 8080");
  });
