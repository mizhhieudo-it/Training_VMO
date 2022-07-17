import * as http from "http";
import * as fs from "fs";
import { htmlServies } from "../services/htmlServices";
import ServiceMail from "../services/mailServies";
import * as formidable from "formidable";
import AutoGenId from "../services/randomService";
import typeMail from "../shared/mail";
class Demo {
  index = async (req: http.IncomingMessage, res: http.ServerResponse) => {
    try {
      let resultReadHTML = await htmlServies.readFileLayoutIndexAsync();
      res.writeHead(200, { "Content-Type": "text/html" });
      res.write(resultReadHTML);
      return res.end();
    } catch (error: any) {
      res.write(error.message);
      return res.end();
    }
  };
  LayoutCreateProfiles = async (
    req: http.IncomingMessage,
    res: http.ServerResponse
  ) => {
    try {
      let resultReadHTML = await htmlServies.readFileLayoutCreateAsync();
      res.writeHead(200, { "Content-Type": "text/html" });
      res.write(resultReadHTML);
      return res.end();
    } catch (error: any) {
      res.write(error.message);
      return res.end();
    }
  };
  WriteFileProfiles = (req: http.IncomingMessage, res: http.ServerResponse) => {
    let body = "";
    req.on("data", (chunk) => {
      body += chunk.toString(); // convert Buffer to string
    });
    req.on("end", () => {
      const datCustomize: any = {};
      const dataJson: any = {};
      //let convertDataToArry = body.split("&");
      console.log(body);
      const convertData = body.toString().split("&");
      convertData.forEach((x) => {
        let converDataChild = x.toString().split("=");
        dataJson[converDataChild[0]] = converDataChild[1];
      });
      let id = AutoGenId(8);
      datCustomize[id] = dataJson;
      //  console.log(dataJson);
      fs.appendFile(
        "database.txt",
        "#" + JSON.stringify(datCustomize),
        function (err) {
          if (err) throw err;
          console.log("Saved!");
        }
      );
      res.statusCode = 200;
      res.end("handler Sucess !");
    });
  };
  SendMai = (req: http.IncomingMessage, res: http.ServerResponse) => {
    let mailOption: typeMail = {
      from: "mailnaysinhradetest369@gmail.com",
      to: "minhhieudo.it@gmail.com",
      subject: "nick cua may da bi hack",
      text: "gui ngay 1nghin do",
    };
    let resultSend = ServiceMail(mailOption);
    res.write(resultSend);
    res.end();
  };
}
export const DemoContoller = new Demo();
