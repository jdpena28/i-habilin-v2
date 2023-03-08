import { HomeLayout } from "@/client/components/layout";
import {
  Jumbotron,
  About,
  Features,
  Register,
} from "@/client/components/section/";
import { NextPage } from "next";

const Home: NextPage = () => {
  return (
    <HomeLayout>
      <Jumbotron />
      <About />
      <Features />
      <Register />
    </HomeLayout>
  );
};

export default Home;
