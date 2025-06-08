import Hero from "../components/Hero";
import AboutSection from "../components/AboutSection";
import BestCollections from "../components/BestCollections";
import Testimonials from "../components/Testimonials";

import LimitedEditionSection from "../components/LimitedEditionSection.tsx";

import { useUser } from "../contexts/user.context.tsx";

const Home = () => {
  const { user } = useUser();
  console.log(user);
  return (
    <>
      <Hero />
      <p>
        {import.meta.env.MODE} — {location.hostname} mof
      </p>
      <BestCollections />
      <AboutSection />
      <Testimonials />
      <LimitedEditionSection />
    </>
  );
};

export default Home;
