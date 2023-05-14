import { FC, ReactNode, ChangeEvent } from "react";
import { useRouter } from "next/router";

import { IoFilter } from "react-icons/io5";

interface FilterProps {
  children: ReactNode;
  sortQuery: string;
}

const Filter: FC<FilterProps> = ({ children, sortQuery }) => {
  const { query, push, pathname } = useRouter();
  const handleSortBy = (e: ChangeEvent<HTMLSelectElement>) => {
    const orderBy = e.target.value;
    query[sortQuery] = orderBy;
    if (orderBy === "default") {
      delete query[sortQuery];
    }
    push({
      pathname,
      query,
    });
  };
  return (
    <div className="flex items-center gap-x-1 rounded-md bg-white p-1">
      <IoFilter className="h-5 w-5" />
      <select
        className="border-none font-poppins outline-none focus:border-transparent focus:outline-none focus:ring-0"
        onChange={handleSortBy}
        name="filter"
        id="filter">
        {children}
      </select>
    </div>
  );
};

export default Filter;
