import GirlOrderingFood from "@public/girl-ordering-food";

const Jumbotron = () => {
  return (
    <section className="flex h-screen flex-col items-center justify-between md:flex-row">
      <div className="space-y-5">
        <div className="decorated-underline">
          <h1>I-Habilin</h1>
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
      <div>
        <GirlOrderingFood />
      </div>
    </section>
  );
};

export default Jumbotron;
