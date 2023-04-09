/* eslint-disable no-unused-vars */
/* eslint-disable @next/next/no-img-element */
import { FormatCurrency } from "@/client/lib/TextFormatter";
import { FC, useState } from "react";
import Image from "next/image";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { AiFillEdit, AiFillDelete } from "react-icons/ai";

interface SortableMenuCardProps {
  title: string;
  price: number;
  description: string | null;
  imageUrl: string;
  id: string;
  handleEdit: () => void;
  handleDelete: () => void;
}

const SortableMenuCard: FC<SortableMenuCardProps> = ({
  title,
  price,
  description,
  imageUrl,
  id,
  handleEdit,
  handleDelete,
}) => {
  const [isHover, setIsHover] = useState(false);
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id });
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };
  return (
    <div
      ref={setNodeRef}
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
      style={style}
      {...attributes}
      {...listeners}
      className="relative col-span-1 aspect-video h-[288px] w-full overflow-hidden rounded p-4 shadow-lg lg:h-[432px]">
      {isHover ? (
        <div className="absolute top-2 right-2 flex flex-row space-x-2">
          <button
            type="button"
            className="rounded-md bg-primary p-2 hover:bg-secondary"
            onClick={handleEdit}>
            <AiFillEdit className="fill-white" size={18} />
          </button>
          <button
            type="button"
            className="rounded-md bg-primary p-2 hover:bg-secondary"
            onClick={handleDelete}>
            <AiFillDelete className="fill-white" size={18} />
          </button>
        </div>
      ) : null}
      <Image
        className="mx-auto"
        src={imageUrl}
        alt={title}
        height={576 * 0.5}
        width={720 * 0.5}
      />
      <div className="px-6 py-4">
        <div className="mb-2 text-xl font-bold">{title}</div>
        <div>{FormatCurrency(price)}</div>
        <p className="text-ellipsis text-gray-700">{description}</p>
      </div>
    </div>
  );
};

export default SortableMenuCard;
