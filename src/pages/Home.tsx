import Hero from "../components/Hero";
import AboutSection from "../components/AboutSection";
import BestCollections from "../components/BestCollections";
import Testimonials from "../components/Testimonials";

import LimitedEditionSection from "../components/LimitedEditionSection.tsx";

const Home = () => {
  return (
    <>
      <Hero />
      <BestCollections />
      <AboutSection />
      <Testimonials />
      <LimitedEditionSection />
    </>
  );
};

export default Home;
