# Upload file With Multer

## 1. What is Multer ?

Multer is library . Multer play a role like a middleware , it support Express hanle process request multipart/form-data

## 2. How to use Multer ?

Multer attach a object `body` or object `file` (`files` in case multipart files ) in object request .Object body wil contain text in form and object file or files contain file uploaded from form

## 3 . Info params's File Upload

| Properties   | Description                         | Note           |
| ------------ | ----------------------------------- | -------------- |
| fieldname    | description property name in form   |                |
| originalname | file name in client , before upload |                |
| encoding     | Type encoding 's file               |
| mimetype     | mimetype's file                     | image/jpeg,png |
| size         | size's file (bytes)                 |
| destination  | path save file in local server      |
| filename     | filename in destination             |
| path         | Full pack                           |
| buffer       | buffer full file                    |
