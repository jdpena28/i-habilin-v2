import { StallHolder } from "@/client/components/itemHolder";
import { SideNav } from "@/client/components/nav";
import { SearchNav } from "@/client/components/SeachBar";
import BurgerMenu from "@public/burger-menu";
import ShoppingCart from "@public/Shopping-Cart";

const foodStall = () => {
  return (
    <section>
      <div className=" relative md:flex ">
        <SideNav />
        <div className="flex-1 bg-white ">
          <div id="bg_order2">
            <div className="flex justify-between md:hidden ">
              <BurgerMenu />
              <div className="block p-0">
                <ShoppingCart />
              </div>
            </div>
            <div className="mt-0 flex justify-center pt-7 text-white lg:items-center">
              <div className=" text-7xl font-extrabold">Welcome!</div>
            </div>
            <div className="md:relative">
              <div className="absolute left-1/2 top-20 -translate-x-1/2 translate-y-20 md:-top-20 ">
                <SearchNav />
              </div>
            </div>
            <div className="pt-24 md:pt-40">
              <div className="mt-1">
                <p className="ml-10 font-bold ">Food Stalls* </p>
              </div>
              <div className="mx-5 grid grid-cols-2 gap-1 md:grid-cols-3 lg:grid-cols-6 ">
                <StallHolder
                  src="/.././public/SampleImg.png"
                  text="Mcdollibee"
                  alt="stall"
                />
                <StallHolder
                  src="/.././public/SampleImg.png"
                  text="Mcdollibee"
                  alt="stall"
                />
                <StallHolder
                  src="/.././public/SampleImg.png"
                  text="Mcdollibee"
                  alt="stall"
                />
                <StallHolder
                  src="/.././public/SampleImg.png"
                  text="Mcdollibee"
                  alt="stall"
                />
                <StallHolder
                  src="/.././public/SampleImg.png"
                  text="Mcdollibee"
                  alt="stall"
                />
                <StallHolder
                  src="/.././public/SampleImg.png"
                  text="Mcdollibee"
                  alt="stall"
                />
                <StallHolder
                  src="/.././public/SampleImg.png"
                  text="Mcdollibee"
                  alt="stall"
                />
                <StallHolder
                  src="/.././public/SampleImg.png"
                  text="Mcdollibee"
                  alt="stall"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default foodStall;
