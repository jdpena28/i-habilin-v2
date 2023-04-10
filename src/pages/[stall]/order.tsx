import { CategoryButton } from "@/client/components/buttons";
import { CardHolder } from "@/client/components/itemHolder";
import BreadIcon from "@public/bread-icon";
import SeacrIcon from "@public/SearchIcon";

const order = () => {
  return (
    <section className="bg-white">
      <div id="bg_order">
        <div className="mt-0 flex justify-center pt-12  text-white lg:items-center ">
          <div className=" text-8xl font-extrabold">
            <span className="text-5xl ">Hello,</span> <br />
            THERE!
          </div>
        </div>
        <div className="absolute left-1/2 top-40 -translate-x-1/2 translate-y-20 ">
          <div className="relative mx-auto pt-2">
            <input
              className="w-80 rounded-[14px] border-gray-300 font-poppins text-lg "
              type="search"
              name="search"
              placeholder="Search for something tasty..."
            />
            <button type="submit" className="absolute right-0 top-0 ">
              {" "}
              <SeacrIcon />{" "}
            </button>
          </div>
        </div>
        <div className="pt-32">
          <p className=" m-4 font-bold uppercase">Top Categories </p>
          <div className="mx-5 flex items-start gap-x-3 overflow-x-auto pb-5">
            <CategoryButton icon={<BreadIcon />} text="Bread" />
            <CategoryButton icon={<BreadIcon />} text="Bread" />
            <CategoryButton icon={<BreadIcon />} text="Bread" />
            <CategoryButton icon={<BreadIcon />} text="Bread" />
            <CategoryButton icon={<BreadIcon />} text="Bread" />
            <CategoryButton icon={<BreadIcon />} text="Bread" />
            <CategoryButton icon={<BreadIcon />} text="Bread" />
            <CategoryButton icon={<BreadIcon />} text="Bread" />
            <CategoryButton icon={<BreadIcon />} text="Bread" />
            <CategoryButton icon={<BreadIcon />} text="Bread" />
            <CategoryButton icon={<BreadIcon />} text="Bread" />
            <CategoryButton icon={<BreadIcon />} text="Bread" />
            <CategoryButton icon={<BreadIcon />} text="Bread" />
          </div>
          <div className=" mt-2">
            <p className=" m-4 font-bold uppercase">Recommended for you</p>
          </div>
          <div className="gap-2 md:grid lg:grid-cols-6 ">
            <CardHolder
              text="Sisig"
              price={55}
              src="/.././public/Sisig.png"
              alt="Sisig na may pusa"
            />
            <CardHolder
              text="Sisig"
              price={55}
              src="/.././public/Sisig.png"
              alt="Sisig na may pusa"
            />
            <CardHolder
              text="Sisig"
              price={55}
              src="/.././public/Sisig.png"
              alt="Sisig na may pusa"
            />
            <CardHolder
              text="Sisig"
              price={55}
              src="/.././public/Sisig.png"
              alt="Sisig na may pusa"
            />
            <CardHolder
              text="Sisig"
              price={55}
              src="/.././public/Sisig.png"
              alt="Sisig na may pusa"
            />
            <CardHolder
              text="Sisig"
              price={55}
              src="/.././public/Sisig.png"
              alt="Sisig na may pusa"
            />
            <CardHolder
              text="Sisig"
              price={55}
              src="/.././public/Sisig.png"
              alt="Sisig na may pusa"
            />
            <CardHolder
              text="Sisig"
              price={55}
              src="/.././public/Sisig.png"
              alt="Sisig na may pusa"
            />
          </div>
        </div>
      </div>
    </section>
  );
};
export default order;
