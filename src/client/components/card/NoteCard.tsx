import { FC, ReactNode } from "react";
import Link from "next/link";
import { useRouter } from "next/router";

interface NotesProps {
  tableNo: number | string;
  children: ReactNode;
  id: string;
  status: string;
}

const Notes: FC<NotesProps> = ({ tableNo, children, id, status }) => {
  const { query, pathname } = useRouter();
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
