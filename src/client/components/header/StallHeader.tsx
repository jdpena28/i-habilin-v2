import { FC, ReactNode, KeyboardEvent } from "react";
import { omit } from "lodash";
import { useRouter } from "next/router";
import Link from "next/link";
import { BsArrowLeft, BsSearch } from "react-icons/bs";
import { Filter } from "../filtering-sorting";

interface StallHeaderProps {
  title: string;
  goBack?: boolean;
  search?: boolean;
  tabs?: boolean;
  filter?: boolean | ReactNode;
  buttonText?: string;
  onClickButton?: () => void;
  children?: ReactNode;
  filterQuery?: string;
}

const StallHeader: FC<StallHeaderProps> = ({
  title,
  goBack,
  search,
  tabs,
  filter,
  onClickButton,
  buttonText,
  children,
  filterQuery,
}) => {
  const FILTER_OPTION = ["Active", "Used", "Expired"];
  const { back, query, pathname, push } = useRouter();
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
        <div className="flex gap-x-3">
          {buttonText && (
            <button
              className="bg-secondary p-2 text-black"
              type="button"
              onClick={onClickButton}>
              {buttonText}
            </button>
          )}
          {children}
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
            <Link
              href={{
                pathname,
                query: {
                  ...omit(query, ["status"]),
                },
              }}
              className={`border-b-2 p-2 ${
                !query.status && "border-secondary text-secondary"
              }`}>
              All
            </Link>
            {FILTER_OPTION.map((item) => {
              return (
                <Link
                  className={`border-b-2 p-2 ${
                    query.status === item && "border-secondary text-secondary"
                  }`}
                  href={{
                    pathname,
                    query: {
                      ...query,
                      status: item,
                    },
                  }}>
                  {item}
                </Link>
              );
            })}
          </div>
        )}
        {!tabs && filter && <div className="invisible" />}
        {filter && <Filter sortQuery={filterQuery as string}>{filter}</Filter>}
      </div>
    </header>
  );
};

export default StallHeader;
