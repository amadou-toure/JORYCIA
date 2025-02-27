import React from 'react';
import Hero from '../components/Hero';
import FeaturedProducts from '../components/FeaturedProducts';
import AboutSection from '../components/AboutSection';
import BestCollections from '../components/BestCollections';
import Testimonials from '../components/Testimonials';

const Home = () => {
  return (
    <>
      <Hero />
      <FeaturedProducts />
      <BestCollections />
      <AboutSection />
      <Testimonials />
    </>
  );
};

export default Home;