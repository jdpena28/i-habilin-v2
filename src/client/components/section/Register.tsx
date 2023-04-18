import Link from "next/link";
import RegisterOrdering from "../../../../public/public/receipt-ordering";
import StatisticalDashboard from "../../../../public/public/statistical-dashboard";

const Register = () => {
  return (
    <section
      id="register"
      className="flex min-h-screen flex-col-reverse items-center justify-center md:flex-row">
      <div className="flex flex-col items-center gap-y-5  text-center md:items-start  md:text-left 2xl:pl-8">
        <h3 className="text-primary lg:w-4/5 xl:w-full">
          Enjoy all the great features
        </h3>
        <p className="w-11/12 text-center md:text-justify 2xl:w-10/12">
          A revolutionized and modernized ordering system right away to your
          smartphone. You can now apply for the system and enjoy all the great
          features of the I-Habilin.
        </p>
        <Link href="/be-a-stall-owner">
          <button
            type="button"
            className="focus:tertiary bg-secondary text-black hover:bg-primary focus:ring">
            Apply Now
          </button>
        </Link>
      </div>
      <div className="relative right-[7%] flex w-full flex-col items-center justify-center md:right-5 md:w-[80rem] lg:right-7 xl:w-[70%] 2xl:right-10 2xl:w-[65%]">
        <RegisterOrdering />
        <div className="absolute -top-1/4 -right-[10%] w-3/5 md:-right-8 2xl:-right-10">
          <StatisticalDashboard />
        </div>
      </div>
    </section>
  );
};

export default Register;
