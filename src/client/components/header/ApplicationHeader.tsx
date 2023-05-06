import type { ApplicationHeaderProps } from "@/client/types/props";
import { ChangeEvent, FC, KeyboardEvent } from "react";
import { omit } from "lodash";
import { useRouter } from "next/router";
import Link from "next/link";
import { BsArrowLeft, BsSearch } from "react-icons/bs";
import { IoFilter } from "react-icons/io5";

const ApplicationHeader: FC<ApplicationHeaderProps> = ({
  title,
  goBack,
  search,
  tabs,
  filter,
  onClickButton,
  buttonText,
  filterData,
}) => {
  const { back, query, push, pathname } = useRouter();
  const statusOption = ["All", "Active", "Pending", "Denied", "Expired"];
  const handleFilter = (e: ChangeEvent<HTMLSelectElement>) => {
    const { value } = e.target;
    if (value) {
      return push({
        pathname,
        query: {
          ...query,
          orderBy: value,
        },
      });
    }
    return push({
      pathname,
      query: {
        ...omit(query, ["orderBy"]),
      },
    });
  };
  const handleSearch = (e: KeyboardEvent<HTMLInputElement>) => {
    const { value } = e.target as HTMLInputElement;
    if (e.key === "Enter") {
      if (!value)
        return push({
          pathname,
          query: {
            ...omit(query, ["search"]),
          },
        });
      return push({
        pathname,
        query: {
          ...query,
          search: value,
        },
      });
    }
    return null;
  };
  return (
    <header className="sticky top-0 mb-5 w-full space-y-3 border-b-2 border-gray-200 py-5">
      <div className="flex w-full justify-between">
        <div className="flex items-center justify-center gap-x-5">
          {goBack && (
            <BsArrowLeft
              className="h-7 w-7"
              role="button"
              onClick={() => back()}
            />
          )}
          <div className="decorated-underline">
            <h5>{title}</h5>
            <div />
          </div>
        </div>
        <div>
          {buttonText && (
            <button
              className="bg-secondary p-2 text-black"
              type="button"
              onClick={onClickButton}>
              {buttonText}
            </button>
          )}
          {/* Search Icon */}
          {search && (
            <div className="flex items-center gap-x-1 rounded-md bg-white p-2">
              <BsSearch className="h-5 w-5" />
              <input
                className="border-none font-poppins outline-none focus:border-transparent focus:outline-none focus:ring-0"
                type="text"
                placeholder="Search"
                defaultValue={query.search as string}
                onKeyDown={handleSearch}
              />
            </div>
          )}
        </div>
      </div>
      <div className="flex  w-full justify-between">
        {tabs && (
          <div className="flex w-full font-brocha">
            {statusOption.map((i) => {
              return (
                <Link
                  href={
                    i === "All"
                      ? {
                          pathname: "/application/registrants",
                          query: {
                            ...omit(query, ["status"]),
                          },
                        }
                      : {
                          pathname: "/application/registrants",
                          query: {
                            ...query,
                            status: i,
                          },
                        }
                  }
                  className={`border-b-2 p-2 ${
                    !query.status && i === "All"
                      ? "border-secondary text-secondary"
                      : query.status === i && "border-secondary text-secondary"
                  }`}>
                  {i}
                </Link>
              );
            })}
          </div>
        )}
        {!tabs && <div className="invisible" />}
        {filter && (
          <div className="flex items-center gap-x-1 rounded-md bg-white p-2">
            <IoFilter className="h-5 w-5" />
            <select
              className="border-none font-poppins outline-none focus:border-transparent focus:outline-none focus:ring-0"
              name="filter"
              id="filter"
              defaultValue={query.orderBy as string}
              onChange={handleFilter}>
              <option value="" selected>
                Sort By
              </option>
              {filterData &&
                filterData.map((i) => {
                  return <option value={i.value}>{i.label}</option>;
                })}
            </select>
          </div>
        )}
      </div>
    </header>
  );
};

export default ApplicationHeader;
