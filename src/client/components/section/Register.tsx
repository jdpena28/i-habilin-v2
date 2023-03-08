import Link from "next/link";
import RegisterOrdering from "../../../../public/receipt-ordering";
import StatisticalDashboard from "../../../../public/statistical-dashboard";

const Register = () => {
  return (
    <section className="flex min-h-screen flex-col-reverse items-center justify-center md:flex-row">
      <div className="flex flex-col items-center gap-y-5  text-center md:items-start  md:text-left">
        <h3 className="text-primary">Enjoy all the great features</h3>
        <p className=" w-4/5">
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
      <div className="relative mx-10 w-full pr-14">
        <RegisterOrdering />
        <div className="absolute -top-[4.3rem] right-0">
          <StatisticalDashboard />
        </div>
      </div>
    </section>
  );
};

export default Register;
