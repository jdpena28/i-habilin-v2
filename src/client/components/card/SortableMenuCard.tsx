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
  total: number;
  price: number;
  description: string | null;
  imageUrl: string;
  id: string;
  handleEdit: () => void;
  handleDelete: () => void;
  featured: boolean;
  discount: number;
  status: string;
}

const SortableMenuCard: FC<SortableMenuCardProps> = ({
  title,
  total,
  price,
  description,
  imageUrl,
  id,
  handleEdit,
  handleDelete,
  featured,
  discount,
  status,
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
      className={`relative col-span-1 aspect-video h-[288px] w-full rounded p-4 shadow-lg lg:h-[432px] ${
        featured && "ring-4 ring-primary ring-offset-4"
      }`}>
      {isHover ? (
        <div className="absolute top-2 right-2 z-40 flex flex-row space-x-2">
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
      {discount > 0 && status === "Available" && (
        <div className="absolute -top-4 -left-0 flex h-14 w-14 flex-col items-center justify-center rounded-full bg-red-500 font-poppins font-medium text-white">
          <span className="text-xs">Sale</span>
          <span className="text-sm">{discount}%</span>
        </div>
      )}
      {status === "Not Available" && (
        <div className="absolute z-30 flex h-full w-full items-center justify-center backdrop-blur-sm">
          <div className="h-max w-max rounded-md bg-red-500 p-2 font-poppins font-medium tracking-wider text-white">
            Not Available
          </div>
        </div>
      )}
      <Image
        className="mx-auto"
        src={`${imageUrl}/-/crop/16:9/`}
        alt={title}
        height={576 * 0.5}
        width={720 * 0.5}
      />
      <div className="px-6 py-4">
        <div className="mb-2 text-xl font-bold">{title}</div>
        <div>
          {discount > 0 && (
            <span className="line-through">{FormatCurrency(price)}</span>
          )}
          {discount > 0 && ` - `}
          {FormatCurrency(total)}
        </div>
        <p className="text-ellipsis text-gray-700">{description}</p>
      </div>
    </div>
  );
};

export default SortableMenuCard;
