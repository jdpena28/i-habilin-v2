import { FC, ReactNode } from "react";
import { useRouter } from "next/router";
import { BsArrowLeft, BsSearch } from "react-icons/bs";
import { IoFilter } from "react-icons/io5";

interface StallHeaderProps {
  title: string;
  goBack?: boolean;
  search?: boolean;
  tabs?: boolean;
  filter?: boolean;
  buttonText?: string;
  onClickButton?: () => void;
  children?: ReactNode;
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
}) => {
  const { back } = useRouter();
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
              />
            </div>
          )}
        </div>
      </div>
      <div className="flex  w-full justify-between">
        {tabs && (
          <div className="flex w-full font-brocha">
            <div className="border-b-2 border-secondary p-2 text-secondary">
              All
            </div>
            <div className="border-b-2 border-transparent p-2">Approved</div>
            <div className="border-b-2 border-transparent p-2">Pending</div>
            <div className="border-b-2 border-transparent p-2">Expired</div>
          </div>
        )}
        {filter && (
          <div className="flex items-center gap-x-1 rounded-md bg-white p-2">
            <IoFilter className="h-5 w-5" />
            <select
              className="border-none font-poppins outline-none focus:border-transparent focus:outline-none focus:ring-0"
              name="filter"
              id="filter">
              <option value="" selected>
                Filter
              </option>
            </select>
          </div>
        )}
      </div>
    </header>
  );
};

export default StallHeader;
