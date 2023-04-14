import { FC } from "react";

interface FoodStallTitleProps {
  text: string;
}

const FoodStallTitle: FC<FoodStallTitleProps> = ({ text }) => {
  return (
    <div className="flex items-center pl-2">
      <h6 className="font-brocha text-lg">{text}</h6>
    </div>
  );
};

export default FoodStallTitle;
