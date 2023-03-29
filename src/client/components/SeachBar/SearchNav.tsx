import SeacrIcon from "@public/SearchIcon";

const SearchNav = () => {
  return (
    <div className="relative mx-auto pt-2">
      <input
        className="w-[22rem] rounded-[14px] border-gray-300 p-4 font-poppins text-lg "
        type="search"
        name="search"
        placeholder="Search for something tasty..."
      />
      <button type="submit" className="absolute right-0 top-2 ">
        {" "}
        <SeacrIcon />{" "}
      </button>
    </div>
  );
};

export default SearchNav;
