import { PublicNav } from "@/client/components/nav";
import {
  Jumbotron,
  About,
  Features,
  Register,
} from "@/client/components/section/";
import { NextPage } from "next";

const Home: NextPage = () => {
  return (
    <>
      <PublicNav />
      <div className="container mx-auto min-h-screen">
        <Jumbotron />
        <About />
        <Features />
        <Register />
      </div>
    </>
  );
};

export default Home;
