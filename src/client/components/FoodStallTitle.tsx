import Image from "next/image";
import { FC } from "react";

interface FoodStallTitleProps {
  src: string;
  alt: string;
  text: string;
}

const FoodStallTitle: FC<FoodStallTitleProps> = ({ src, alt, text }) => {
  return (
    <div className="flex items-center pl-2">
      <Image className="bg-white" src={src} width={25} height={25} alt={alt} />
      <h6 className="pl-4 font-brocha text-lg">{text}</h6>
    </div>
  );
};

export default FoodStallTitle;
