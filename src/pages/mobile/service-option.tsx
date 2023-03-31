import Dinein from "@public/public/dinein";
import Takeout from "@public/public/takeout";

const selection = () => {
  return (
    <section className=" via-orange mx-auto flex  h-[100vh] items-center bg-gradient-to-r from-primary to-secondary">
      <div className="mx-auto gap-10 space-y-5  text-center ">
        <p className="font-poppins text-6xl font-extrabold text-white ">
          Choose
        </p>
        <div className="rounded-md bg-gray-100  p-20 drop-shadow-lg">
          <Dinein />
          <p className=" font-poppins text-xl font-bold">Dine-in</p>
        </div>
        <div className="mt-10 rounded-md bg-gray-100 p-20 drop-shadow-lg">
          <Takeout />
          <p className="mt-3 font-poppins text-xl font-bold">Take out</p>
        </div>
      </div>
    </section>
  );
};

export default selection;
