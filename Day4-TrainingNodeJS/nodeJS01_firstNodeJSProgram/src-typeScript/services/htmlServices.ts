import * as fs from "fs";
import * as path from "path";
class ServicesHTML {
  readFileLayoutIndexAsync = async () => {
    try {
      const filePatch = path.join(__dirname, "../asset/HTML/index.htm");
      const resultReadFile = await fs.readFileSync(filePatch);
      return Promise.resolve(resultReadFile);
    } catch (error: any) {
      return Promise.reject(error.message);
    }
  };
  readFileLayoutCreateAsync = async () => {
    try {
      const filePatch = path.join(
        __dirname,
        "../asset/HTML/create-profile.html"
      );
      const resultReadFile = await fs.readFileSync(filePatch);
      return Promise.resolve(resultReadFile);
    } catch (error: any) {
      return Promise.reject(error.message);
    }
  };
}
export const htmlServies = new ServicesHTML();
