import { FC } from "react";
import { useRouter } from "next/router";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import Image from "next/image";

interface CategorybuttonProps {
  icon: string | null;
  text: string;
  id: string;
}

const SortableCategoryButton: FC<CategorybuttonProps> = ({
  icon,
  text,
  id,
}) => {
  const { push, query, pathname } = useRouter();
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
      onClick={() =>
        push({
          pathname,
          query: {
            category: id,
            stall: query.stall,
          },
        })
      }
      role="button"
      aria-hidden
      className={`${
        query?.category === id ? "active-category-button" : "category-button"
      }`}>
      {icon && icon?.length < 24 ? (
        icon
      ) : (
        <Image
          className="p-1"
          src={`${icon}/-/resize/32x32/`}
          alt={text}
          height={32}
          width={32}
        />
      )}
      <span className="truncate font-poppins">{text}</span>
    </div>
  );
};
export default SortableCategoryButton;
