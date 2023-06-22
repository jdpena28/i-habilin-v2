import Link from "next/link";
import GirlOrderingFood from "@public/public/girl-ordering-food";

const Jumbotron = () => {
  return (
    <section
      id="home"
      className="my-32 flex flex-col-reverse items-center justify-center md:-my-20 md:h-screen md:flex-row md:justify-between md:px-8">
      <div className="mt-4 space-y-5">
        <div className="decorated-underline ">
          <h1 className="text-5xl">I-Habilin</h1>
          <div />
        </div>
        <p className="subheading max-w-xl">
          A revolutionize ordering system. An innovative solution that
          transforms the traditional way of ordering in food stalls. Say goodbye
          to long queues and waiting times. Our online platform, ordering from
          multiple stalls in a food court has never been easier.{" "}
        </p>
        <div className="flex gap-x-5">
          <Link
            href="#feature"
            className="rounded-lg bg-primary p-2 font-poppins font-medium tracking-wider text-white lg:p-4">
            See Features
          </Link>
          <Link
            href="/stalls"
            className="rounded-lg bg-secondary p-2 font-poppins font-medium tracking-wider text-black lg:p-4">
            See Stalls
          </Link>
        </div>
      </div>
      <div className="w-full md:w-[37rem]">
        <GirlOrderingFood />
      </div>
    </section>
  );
};

export default Jumbotron;
