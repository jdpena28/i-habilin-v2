import ErrorMsg from "@public/error-msg";

const Maintenance = () => {
  return (
    <section className="flex h-screen w-full items-center justify-center">
      <div className="container mx-auto space-y-5 px-2">
        <ErrorMsg />
        <p className="heading text-center text-xl lg:text-3xl">
          Looks like this page is currently down for Maintenance
        </p>
      </div>
    </section>
  );
};

export default Maintenance;
