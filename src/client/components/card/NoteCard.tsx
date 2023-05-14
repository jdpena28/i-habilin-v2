import { FC, ReactNode } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import Tippy from "@tippyjs/react/headless";

interface NotesProps {
  tableNo: number | string;
  children: ReactNode;
  id: string;
  status: string;
  estimatedTime?: number;
}

const Notes: FC<NotesProps> = ({
  tableNo,
  children,
  id,
  status,
  estimatedTime,
}) => {
  const { query, pathname } = useRouter();
  if (status === "Preparing" && query?.sortPreparingBy === "Preparation Time") {
    return (
      <Tippy
        render={(attrs) => (
          <div
            className="rounded-lg bg-highlight p-2 font-poppins text-white"
            tabIndex={-1}
            {...attrs}>
            Est Time: {estimatedTime} mins
          </div>
        )}>
        <Link
          href={{
            pathname: `${pathname}/[id]`,
            query: { ...query, id, status },
          }}
          className="font-tertiary z-10 h-[10.5rem] w-full space-y-1 truncate bg-secondary p-2 drop-shadow-xl md:h-52"
          id="note">
          <h3 className="text-lg font-bold md:text-xl">Table No: {tableNo}</h3>
          <div className="max-h-[10.5rem] truncate text-sm md:text-base">
            {children}
          </div>
        </Link>
      </Tippy>
    );
  }
  return (
    <Link
      href={{
        pathname: `${pathname}/[id]`,
        query: { ...query, id, status },
      }}
      className="font-tertiary z-10 h-[10.5rem] w-full space-y-1 truncate bg-secondary p-2 drop-shadow-xl md:h-52"
      id="note">
      <h3 className="text-lg font-bold md:text-xl">Table No: {tableNo}</h3>
      <div className="max-h-[10.5rem] truncate text-sm md:text-base">
        {children}
      </div>
    </Link>
  );
};
export default Notes;
