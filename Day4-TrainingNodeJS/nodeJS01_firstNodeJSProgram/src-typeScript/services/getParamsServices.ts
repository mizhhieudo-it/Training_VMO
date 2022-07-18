import * as url from "url";
export default function getParamsSerive(url: string) {
  let urlPram = url?.split("/");
  if (url?.includes("?") === true) {
    if (urlPram) {
      let param = urlPram[2].replace("?", "");
      if (urlPram[2].includes("&") == true) {
        let paramsList = urlPram[2].split("&");
        console.log(paramsList);
      }
      console.log(param);
    }
  }
}
