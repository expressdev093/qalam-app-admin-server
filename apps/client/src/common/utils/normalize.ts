import { UploadFile } from "antd/lib/upload/interface";
import { BASE_URL } from "../../common/axios";

interface UploadResponse {
  fileUrl: string;
}
interface EventArgs<T = UploadResponse> {
  file: UploadFile<T>;
  fileList: Array<UploadFile<T>>;
}

export const normalizeFile = (event: EventArgs) => {
  const { fileList } = event;

  return fileList.map((item) => {
    let { url } = item;
    const { uid, name, response, type, size, percent, status } = item;

    if (response) {
      url = (response as any).path;
    }

    return {
      uid,
      name: url,
      url: `${BASE_URL}/${url}`,
      type,
      size,
      percent,
      status,
      crossOrigin: "anonymous",
    };
  });
};
