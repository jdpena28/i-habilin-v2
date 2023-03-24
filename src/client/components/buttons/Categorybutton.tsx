import { FC, ReactNode } from "react";

interface CategorybuttonProps {
  icon: ReactNode;
  text: string;
}

const Categorybutton: FC<CategorybuttonProps> = ({ icon, text }) => {
  return (
    <div className="flex h-10 w-32 items-center justify-center rounded-full bg-secondary">
      {icon} <span className="font-poppins">{text}</span>
    </div>
  );
};
export default Categorybutton;
