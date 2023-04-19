import ErrorMsg from "@public/error-msg";

const Maintenance = () => {
  return (
    <section className="bg-white pt-28">
      <p className="mx-5 pt-10 text-center font-brocha text-5xl md:hidden ">
        ERROR 404 !
      </p>
      <div className=" pt-00 flex justify-center">
        <ErrorMsg />
      </div>
      <p className="invisible mx-5 text-center font-brocha text-[70px] md:visible ">
        ERROR 404 !
      </p>
      <div className="texts-center flex justify-center p-6 text-center text-2xl">
        <p>Looks like this page is currently down for Maintenance</p>
      </div>
      <div className="flex items-center justify-center">
        <button className=" focus:shadow-outline-blue  rounded-lg border border-transparent bg-secondary px-4 py-2 text-sm font-medium leading-5 text-white shadow transition-colors duration-150 hover:bg-primary focus:outline-none">
          Back to homepage
        </button>
      </div>
    </section>
  );
};

export default Maintenance;
