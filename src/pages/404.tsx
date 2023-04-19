import Image404 from "@public/Image404";

const Page404 = () => {
  return (
    <section>
      <div className="flex h-screen items-center justify-center bg-white">
        <div className="flex  items-center justify-center px-10 text-gray-700 md:flex-row">
          <div className="max-w-md">
            <div className="text-[115px] font-bold text-primary">404!</div>
            <p className="pb-5 text-2xl font-light leading-normal md:text-3xl">
              Sorry we couldnt find this page.{" "}
            </p>
            <p className="mb-5">
              But dont worry, you can find plenty of other things on our
              homepage.
            </p>
            <button className="focus:shadow-outline-blue inline rounded-lg border border-transparent bg-secondary px-4 py-2 text-sm font-medium leading-5 text-white shadow transition-colors duration-150 hover:bg-primary focus:outline-none">
              back to homepage
            </button>
          </div>
          <div className="m-10 max-w-lg">
            <Image404 />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Page404;
