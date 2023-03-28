import { Categorybutton } from "@/client/components/buttons";
import { CardHolder } from "@/client/components/itemHolder";
import BreadIcon from "@public/bread-icon";
import SeacrIcon from "@public/SearchIcon";
import Image from "next/image";

const order = () => {
  return (
    <section className="bg-white">
      <div id="bg_order">
        <div className="mt-0 flex justify-center pt-0  text-white lg:items-center ">
          <div className=" text-8xl font-extrabold">
            <span className="text-5xl ">Hello,</span> <br />
            THERE!
          </div>
        </div>
        <div className="absolute  left-1/2 top-28 -translate-x-1/2 translate-y-20 ">
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
        <div className="pt-40">
          <p className=" m-4 font-bold uppercase">Top Categories </p>
          <div className="m-5 flex items-start gap-x-3 overflow-x-scroll pb-5">
            <Categorybutton icon={<BreadIcon />} text="" />
            <Categorybutton icon={<BreadIcon />} text="" />
            <Categorybutton icon={<BreadIcon />} text="" />
            <Categorybutton icon={<BreadIcon />} text="" />
            <Categorybutton icon={<BreadIcon />} text="" />
            <Categorybutton icon={<BreadIcon />} text="" />
            <Categorybutton icon={<BreadIcon />} text="" />
          </div>
          <div className=" mt-2">
            <p className=" m-4 font-bold uppercase">Recommended for you</p>
          </div>
          <div className="gap-3 md:grid lg:grid-cols-6 ">
            <CardHolder
              icon={
                <Image
                  className="bg-white"
                  src="/.././public/Sisig.png"
                  width={1980}
                  height={1020}
                  alt="Sisig"
                />
              }
              text="Sisig"
              price={55}
            />
            <CardHolder
              icon={
                <Image
                  className="bg-white"
                  src="/.././public/Sisig.png"
                  width={1980}
                  height={1020}
                  alt="Sisig"
                />
              }
              text="aso"
              price={78}
            />
            <CardHolder
              icon={
                <Image
                  className="bg-white"
                  src="/.././public/Sisig.png"
                  width={1980}
                  height={1020}
                  alt="Sisig"
                />
              }
              text="sausage"
              price={78}
            />
            <CardHolder
              icon={
                <Image
                  className="bg-white"
                  src="/.././public/Sisig.png"
                  width={1980}
                  height={1020}
                  alt="Sisig"
                />
              }
              text="Hotdog"
              price={78}
            />
            <CardHolder
              icon={
                <Image
                  className="bg-white"
                  src="/.././public/Sisig.png"
                  width={1980}
                  height={1020}
                  alt="Sisig"
                />
              }
              text="buto"
              price={78}
            />
            <CardHolder
              icon={
                <Image
                  className="bg-white"
                  src="/.././public/Sisig.png"
                  width={1980}
                  height={1020}
                  alt="Sisig"
                />
              }
              text="Aljur"
              price={78}
            />
          </div>
        </div>
      </div>
    </section>
  );
};
export default order;
