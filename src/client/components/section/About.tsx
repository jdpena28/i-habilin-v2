import BoyMonitoring from "../../../../public/boy-monitoring";
import InCircle from "../../../../public/incircle";
import StarHighlight from "../../../../public/Star-highlight";

const About = () => {
  return (
    <section
      id="about"
      className="flex min-h-screen w-full flex-col-reverse items-center justify-center md:flex-row-reverse">
      <div className="items-center text-justify">
        <h3 className="-ml-2 space-y-2 pl-0 text-center md:items-start md:pl-12 md:text-left">
          We build bridges
          <br /> between <span className="text-primary">companies </span>
          <br /> <span className="text-primary">and customer.</span>
        </h3>
        <div className="m-10 w-4/5 pb-10 font-neuemachina ">
          <div className="relative inline-block font-bold">
            <div className="absolute -top-3 -left-3 h-max w-max ">
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
              The proposed project focus to modernize the current state of food
              ordering process in some local food courts to make it something
              more engaging and convenient for both clients and entrepreneurs.
            </p>
          </blockquote>
        </div>
      </div>
      <div className="w-full">
        <BoyMonitoring />
      </div>
    </section>
  );
};

export default About;
