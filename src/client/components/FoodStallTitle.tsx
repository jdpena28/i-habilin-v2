import { FC } from "react";

interface FoodStallTitleProps {
  text: string | undefined;
}

const FoodStallTitle: FC<FoodStallTitleProps> = ({ text }) => {
  return (
    <div className="flex items-center py-1 pl-2">
      <h6 className="font-brocha text-base sm:text-lg">{text}</h6>
    </div>
  );
};

export default FoodStallTitle;
