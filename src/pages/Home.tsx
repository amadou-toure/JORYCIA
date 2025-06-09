import Hero from "../components/Hero";
import AboutSection from "../components/AboutSection";
import BestCollections from "../components/BestCollections";
import Testimonials from "../components/Testimonials";
import toast from "react-hot-toast";

import LimitedEditionSection from "../components/LimitedEditionSection.tsx";

import { useUser } from "../contexts/user.context.tsx";
import { Button } from "@material-tailwind/react";
import { Toaster } from "react-hot-toast";

const Home = () => {
  const TestToast = () => {
    toast("test du toast", { position: "top-left" });
  };
  const { user } = useUser();
  console.log(user);
  return (
    <>
      <Hero />
      <BestCollections />
      <Button onClick={TestToast}> tester </Button>
      <AboutSection />
      <Toaster />
      <Testimonials />
      <LimitedEditionSection />
    </>
  );
};

export default Home;
