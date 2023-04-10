import Image from "next/image";
import { FC } from "react";

interface StallCardProps {
  src: string;
  text: string;
  alt: string;
}

const StallCard: FC<StallCardProps> = ({ src, text, alt }) => {
  return (
    <div className="m-3 rounded-lg border-2  border-secondary bg-white p-2 shadow-lg">
      <div className=" h-32 w-auto font-semibold">
        <Image
          className="mx-auto mt-2 bg-white"
          src={src}
          width={100}
          height={100}
          alt={alt}
        />
        <div className="mt-1 text-center ">
          <p className="font-bold">{text}</p>
        </div>
      </div>
    </div>
  );
};
export default StallCard;
