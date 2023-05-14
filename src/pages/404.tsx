import Image404 from "@public/Image404";
import Link from "next/link";

const Page404 = () => {
  return (
    <section>
      <div className="flex h-screen items-center justify-center">
        <div className="flex flex-col-reverse items-center justify-center px-10 text-gray-700 md:flex-row">
          <div className="max-w-md space-y-3 text-center">
            <p className="font-sans text-8xl font-bold text-primary">404!</p>
            <p className="text-2xl font-light leading-normal md:text-3xl">
              Sorry we couldnt find this page.{" "}
            </p>
            <p>
              But dont worry, you can find plenty of other things on our
              homepage.
            </p>
            <Link href="/">
              <button className="focus:shadow-outline-blue mt-5 inline rounded-lg border border-transparent bg-secondary px-4 py-2 text-sm font-medium leading-5 text-white shadow transition-colors duration-150 hover:bg-primary focus:outline-none">
                back to homepage
              </button>
            </Link>
          </div>
          <Image404 />
        </div>
      </div>
    </section>
  );
};

export default Page404;
