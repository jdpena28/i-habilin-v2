import { FC, ReactNode } from "react";

interface CategorybuttonProps {
  icon: ReactNode;
  text: string;
}

const CategoryButton: FC<CategorybuttonProps> = ({ icon, text }) => {
  return (
    <div className="flex h-10 w-full max-w-[170px] items-center justify-center gap-x-1 rounded-full bg-secondary p-2">
      {icon}
      <span className="truncate font-poppins">{text}</span>
    </div>
  );
};
export default CategoryButton;
