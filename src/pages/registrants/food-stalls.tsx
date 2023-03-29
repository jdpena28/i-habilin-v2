import { CardHolder } from "@/client/components/itemHolder";
import SearchNav from "@/client/components/SeachBar/SearchNav";

const foodStall = () => {
  return (
    <div>
      <section className="bg-white">
        <div id="bg_order2">
          <div className="mt-0 flex justify-center pt-16 pb-0  text-white lg:items-center ">
            <div className=" text-7xl font-extrabold">Welcome!</div>
          </div>
          <div className="absolute  left-1/2 top-16 -translate-x-1/2 translate-y-20 ">
            <SearchNav />
          </div>
          <div className="pt-28">
            <div className=" mt-2">
              <p className=" m-4 ml-7 font-bold uppercase">Food Stall </p>
            </div>
            <div className="min-[320px]: md: mx-6 grid grid-cols-2 gap-2 lg:grid-cols-6 ">
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
    </div>
  );
};

export default foodStall;
