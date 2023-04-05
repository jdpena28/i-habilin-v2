import { FC, ReactNode } from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

interface CategorybuttonProps {
  icon: ReactNode;
  text: string;
  id: string;
}

const SortableCategoryButton: FC<CategorybuttonProps> = ({
  icon,
  text,
  id,
}) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id });
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };
  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="flex h-10 w-full max-w-[170px] items-center justify-center gap-x-1 rounded-full bg-secondary p-2">
      {icon}
      <span className="truncate font-poppins">{text}</span>
    </div>
  );
};
export default SortableCategoryButton;
