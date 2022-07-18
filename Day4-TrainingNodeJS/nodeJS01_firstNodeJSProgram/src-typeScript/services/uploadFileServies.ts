import * as http from "http";
import * as formidable from "formidable";
import * as fs from "fs";
import * as path from "path";
export default function ServicesUploadFile(req: http.IncomingMessage) {
  let form = new formidable.IncomingForm();
  const filePatch = path.join(__dirname, "../Uploads");
  //Process the file upload in Node
  form.parse(req, function (error, fields, file: any) {
    let filepath = file.photo.filepath;
    let newpath = filePatch;
    newpath += file.fileupload.originalFilename;

    //Copy the uploaded file to a custom folder
    fs.rename(filepath, newpath, function (err) {
      if (err) {
        console.log(err);
      } else {
        console.log("Save Files Sucess !");
      }
    });
  });
  return true;
}
