import { UploadFile } from "antd";
import { TOKEN_KEY } from "../../authProvider";
import { BASE_URL } from "../../common/axios";

export class Utils {
  static getObjectList = <T>(result: any) => {
    const data = (result?.data?.data as any)?.data ?? [];
    return data as T;
  };

  static getFilesList = (response: any, objectImage?: string | null) => {
    const filesList = [];

    if (!response && objectImage) {
      filesList.push({
        url: `${BASE_URL}/${objectImage}`,
        name: objectImage,
        uid: "1",
        crossOrigin: "anonymous",
      });
    }

    if (response?.path) {
      filesList.push({
        url: `${BASE_URL}/${response?.path}`,
        name: response?.path,
        uid: "2",
        crossOrigin: "anonymous",
      });
    }

    return filesList;
  };

  static getFileList = (path?: string) => {
    const defaultFilesList: UploadFile[] = path
      ? [
          {
            uid: "1",
            name: path,
            url: `${BASE_URL}/${path}`,
            status: "done",
            crossOrigin: "anonymous",
          },
        ]
      : [];

    return defaultFilesList;
  };

  static getAuthorizationHeader = () => {
    return {
      Authorization: "Bearer " + localStorage.getItem(TOKEN_KEY),
      "x-api-key": "amir",
    };
  };

  static getFullUrl = (path?: string) => {
    console.log("BASE_URL", BASE_URL, import.meta);
    return `${BASE_URL}/api/file?path=${path}`;
  };
}
