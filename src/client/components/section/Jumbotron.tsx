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
          A revolutionize ordering system. Lorem ipsum dolor sit amet
          consectetur. Non nulla eget eu pharetra at. Dignishsim tortor diam
          ullamcorper eget mi.{" "}
        </p>
        <button type="button" className="bg-primary text-white">
          See Features
        </button>
      </div>
      <div className="w-full md:w-[37rem]">
        <GirlOrderingFood />
      </div>
    </section>
  );
};

export default Jumbotron;
