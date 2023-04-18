import BoyMonitoring from "../../../../public/public/boy-monitoring";
import InCircle from "../../../../public/incircle";
import StarHighlight from "../../../../public/public/Star-highlight";

const About = () => {
  return (
    <section
      id="about"
      className="flex flex-col-reverse items-center md:h-screen md:flex-row-reverse md:justify-between">
      <div className="md:w-5/12">
        <h3 className="space-y-3 text-center md:text-left ">
          We build bridges
          <br /> between <span className="text-primary">companies </span>
          <br /> <span className="text-primary">and customer.</span>
        </h3>
        <div className="w-full px-2 py-10 text-justify font-neuemachina md:w-full md:pl-0 2xl:w-11/12">
          <div className="relative inline-block font-bold">
            <div className="absolute -top-3 -left-3 h-max w-max">
              <InCircle />
            </div>
            I-Habilin
          </div>
          &nbsp; is an application that aims to modernize the current manual
          process of food ordering using it features
          <div className="relative inline-block font-bold">
            <div className="absolute left-2 -top-3">
              <StarHighlight />
            </div>
            &nbsp; K-means Algorithm.&nbsp;
          </div>
          A suggestion algorithm that will make it easy for users to navigate
          their possible food preferences based on the following factors,{" "}
          <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text font-extrabold text-transparent">
            demographics.{" "}
          </span>
          <blockquote>
            <p className="mt-10 italic">
              <svg
                aria-hidden="true"
                className="h-10 w-10 text-primary"
                viewBox="0 0 24 27"
                fill="none"
                xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M14.017 18L14.017 10.609C14.017 4.905 17.748 1.039 23 0L23.995 2.151C21.563 3.068 20 5.789 20 8H24V18H14.017ZM0 18V10.609C0 4.905 3.748 1.038 9 0L9.996 2.151C7.563 3.068 6 5.789 6 8H9.983L9.983 18L0 18Z"
                  fill="currentColor"
                />
              </svg>
              The developed project focus to modernize the current state of food
              ordering process in some local food courts to make it something
              more engaging and convenient for both customers and entrepreneurs.
            </p>
          </blockquote>
        </div>
      </div>
      <div className="w-full md:w-[21rem] lg:w-[29rem] xl:w-[37rem] ">
        <BoyMonitoring />
      </div>
    </section>
  );
};

export default About;
