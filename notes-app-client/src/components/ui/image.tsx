import { ImageProps } from "@/lib/types";

const Image = ({
  src,
  alt,
  width,
  height,
  layout = "intrinsic",
  ...rest
}: ImageProps) => {
  return (
    <img
      src={src}
      alt={alt}
      style={{
        objectFit: layout === "fill" ? "cover" : "initial",
        width: layout === "responsive" ? "100%" : width,
        height: layout === "responsive" ? "auto" : height,
      }}
      loading="lazy"
      {...rest}
    />
  );
};

export default Image;
