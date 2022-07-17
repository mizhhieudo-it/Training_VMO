import mailType from "../shared/mail";
import * as nodemailer from "nodemailer";
import Cryptr from "cryptr";

export default function MailServices(contentSend: mailType) {
  const cryptr = new Cryptr("aomacanada");
  const password = cryptr.decrypt(
    "368f8528016c18bb546a333253d91d18c56172031ab176db4a249f5609b9f88fb2c287b72efac243e94eca4d371eb9492276a283c8024efebf179e4e80e5b28ccaa53da456afe8d1d759774a7bb8f6402b024ac641fe140a03b08b12884da2823db0b0c15a5aa17b"
  );
  let mail = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "mailnaysinhradetest369@gmail.com",
      pass: password,
    },
    tls: {
      rejectUnauthorized: false,
    },
  });
  mail.sendMail(contentSend, function (error, info) {
    if (error) {
      return error;
    } else {
      return info.response;
    }
  });
}
