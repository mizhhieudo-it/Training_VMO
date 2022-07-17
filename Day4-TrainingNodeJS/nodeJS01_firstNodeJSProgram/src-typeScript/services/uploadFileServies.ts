import * as http from "http";
import * as formidable from "formidable";
import * as fs from "fs";
// function ServicesUploadFile(req: http.IncomingMessage) {
//   let form = new formidable.IncomingForm();

//   //Process the file upload in Node
//   form.parse(req, function (error, fields, file) {
//     let filepath = file.fileupload.filepath;
//     let newpath = 'C:/upload-example/';
//     newpath += file.fileupload.originalFilename;

//     //Copy the uploaded file to a custom folder
//     fs.rename(filepath, newpath, function () {
//       //Send a NodeJS file upload confirmation message
//       res.write('NodeJS File Upload Success!');
//       res.end();
//     });
// })}
