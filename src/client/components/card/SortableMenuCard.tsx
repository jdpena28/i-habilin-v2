/* eslint-disable @next/next/no-img-element */
import { FormatCurrency } from "@/client/lib/TextFormatter";
import { FC } from "react";
import Image from "next/image";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

interface SortableMenuCardProps {
  title: string;
  price: number;
  description: string;
  imageUrl: string;
  id: string;
}

const SortableMenuCard: FC<SortableMenuCardProps> = ({
  title,
  price,
  description,
  imageUrl,
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
      className="col-span-1 aspect-video h-[288px] w-full overflow-hidden rounded p-4 shadow-lg lg:h-[432px]">
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
