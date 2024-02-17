import Image from "next/image";
export const ImageCard = ({
  src,
  id,
  width = "100%",
  height = "auto",
  borderRadius
}: {
  height?: string | number;
  src: string;
  borderRadius?: number;
  id?: string;
  width?: string | number;
}) => {
  return (
    <Image
      src={src}
      alt="none"
      width={1920}
      height={1080}
      style={{
        width,
        objectFit: "cover",
        objectPosition: "center",
        borderTopLeftRadius: "inherit",
        borderTopRightRadius: "inherit",
        borderRadius,
        height,
      }}
      id={id}
    />
  );
};
