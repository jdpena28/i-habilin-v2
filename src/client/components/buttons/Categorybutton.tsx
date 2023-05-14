import { FC } from "react";
import Image from "next/image";
import { useRouter } from "next/router";

interface CategoryButtonProps {
  icon: string | null;
  text: string;
  id: string;
}

const CategoryButton: FC<CategoryButtonProps> = ({ icon, text, id }) => {
  const { push, pathname, query } = useRouter();
  return (
    <div
      onClick={() =>
        push({
          pathname,
          query: {
            ...query,
            category: id,
          },
          hash: "menu",
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
          className="h-4 w-4 lg:h-8 lg:w-8 lg:p-1"
          src={`${icon}/-/resize/32x32/`}
          alt={text}
          height={32}
          width={32}
        />
      )}
      <span className="truncate font-poppins text-xs lg:text-base">{text}</span>
    </div>
  );
};
export default CategoryButton;
