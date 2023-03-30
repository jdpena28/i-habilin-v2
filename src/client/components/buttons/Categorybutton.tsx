import { FC, ReactNode } from "react";

interface CategorybuttonProps {
  icon: ReactNode;
  text: string;
}

const Categorybutton: FC<CategorybuttonProps> = ({ icon, text }) => {
  return (
    <button className="-mx-3 md:-mx-2">
      <div className="flex rounded-full bg-secondary px-8 py-2">
        <div className="pr-2">{icon}</div>
        <div className="font-poppins">{text}</div>
      </div>
    </button>
  );
};
export default Categorybutton;
