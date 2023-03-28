import { FC, ReactNode } from "react";

interface CategorybuttonProps {
  icon: ReactNode;
  text: string;
}

const Categorybutton: FC<CategorybuttonProps> = ({ icon, text }) => {
  return (
    <div className="flex-none  rounded-full bg-secondary">
      <div className=" flex h-11 w-32 items-center justify-center">
        {icon} <span className="font-poppins">{text}</span>
      </div>
    </div>
  );
};
export default Categorybutton;
