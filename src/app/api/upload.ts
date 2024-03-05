import axios from "axios";

function upload(file: any, url: string, contentType: string) {
  const promise: any = axios.put(url, file, {
    headers: {
      "Content-Type": `${contentType}`,
    },
  });
  return promise;
}

const uploadService = {
  upload,
};
export default uploadService;
