import { useEffect, useState } from "react";
import Hero_video from "../../dist/assets/videoplayback.mp4";

const Hero = () => {
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setOffset(window.pageYOffset);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className="relative h-screen overflow-hidden">
      <div
        className="absolute inset-0"
        style={{
          transform: `translateY(${offset * 0.5}px)`,
          transition: "transform 0.1s ease-out",
        }}
      >
        <video
          src={Hero_video}
          className="w-full h-[120vh] object-cover"
          autoPlay
          loop
          muted
          style={{
            willChange: "transform",
          }}
        />

        <div className="absolute inset-0 bg-black bg-opacity-30"></div>
      </div>

      <div
        className="relative h-full flex items-center justify-center text-center"
        style={{
          transform: `translateY(${offset * 0.2}px)`,
          transition: "transform 0.1s ease-out",
        }}
      >
        <div className="max-w-3xl px-4">
          <h2 className="text-5xl md:text-6xl font-serif text-white mb-6 transform transition-transform duration-700 hover:scale-105">
            Discover Your Signature Scent
          </h2>
          <p className="text-xl text-white mb-8 transform transition-transform duration-500 hover:scale-105">
            Luxurious fragrances crafted with the finest ingredients
          </p>
          <button className="bg-white text-gray-900 px-8 py-3 rounded-lg hover:bg-gray-100 transition-all duration-300 transform hover:scale-105">
            Shop Collection
          </button>
        </div>
      </div>
    </div>
  );
};

export default Hero;
