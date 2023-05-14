import Image from "next/image";
import Link from "next/link";
import { FC } from "react";
import { motion } from "framer-motion";

interface StallCardProps {
  src: string;
  text: string;
  slug: string;
  alt: string;
  isClosed: boolean;
}

const StallCard: FC<StallCardProps> = ({ src, text, alt, slug, isClosed }) => {
  if (isClosed) {
    return (
      <div className="relative rounded-lg border-2 border-secondary bg-white p-2 shadow-lg">
        <div className="h-32 w-auto font-semibold">
          <Image
            className="mx-auto mt-2 bg-white"
            src={src}
            width={100}
            height={100}
            alt={alt}
          />
          <div className="mt-1 text-center">
            <p className="truncate text-sm font-bold">{text}</p>
          </div>
        </div>
        <div className="absolute inset-0 z-10 flex h-full w-full items-center justify-center backdrop-blur-[2px]">
          <div className="h-max w-max rounded-md bg-red-500 p-2 font-poppins font-medium tracking-wider text-white">
            Closed
          </div>
        </div>
      </div>
    );
  }
  return (
    <Link href={`/stalls/${slug}/menu`}>
      <motion.div
        whileTap={{
          scale: 0.7,
        }}
        className="rounded-lg border-2 border-secondary bg-white p-2 shadow-lg">
        <div className=" h-32 w-auto font-semibold">
          <Image
            className="mx-auto mt-2 bg-white"
            src={src}
            width={100}
            height={100}
            alt={alt}
          />
          <div className="mt-1 text-center">
            <p className="truncate text-sm font-bold">{text}</p>
          </div>
        </div>
      </motion.div>
    </Link>
  );
};
export default StallCard;
