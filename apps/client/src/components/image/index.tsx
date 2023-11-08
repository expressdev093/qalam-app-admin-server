import { Image, ImageProps, Typography } from "antd";
import { Utils } from "../../common/utils";

export const ImageView: React.FC<{ path?: string } & ImageProps> = ({
  path,
  ...rest
}) => {
  return path ? (
    <Image
      style={{ maxWidth: "100px" }}
      src={Utils.getFullUrl(path)}
      crossOrigin="anonymous"
      {...rest}
    />
  ) : (
    <Typography.Paragraph>No Image</Typography.Paragraph>
  );
};
