import { useEffect, useState } from "react";
import Footer from "../../components/Footer";
import About from "../../components/landing/About";
import Contact from "../../components/landing/Contact";
import LandingNavbar from "../../components/navbars/LandingNavbar";
import { motion } from "framer-motion";

const bgImages = [
  "/bg1.jpg",
  "/bg2.jpg",
  "/bg3.jpg",
  "/bg4.jpg",
  "/bg5.jpg",
];

const INTERVAL_MS = 5000; // time per slide

const Landing = () => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setIndex((prev) => (prev + 1) % bgImages.length);
    }, INTERVAL_MS);
    return () => clearInterval(id);
  }, []);

  return (
    <>
      <LandingNavbar />

      {/* Hero with background carousel */}
      <div className="relative pt-20 lg:pt-32 p-4 flex flex-col items-center justify-center w-full h-screen overflow-hidden">
        {/* Slides */}
        <div className="absolute inset-0">
          {bgImages.map((src, i) => {
            const isActive = i === index;
            return (
              <div
                key={src}
                className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                  isActive ? "opacity-100" : "opacity-0"
                }`}
                style={{
                  backgroundImage: `url('${src}')`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  backgroundRepeat: "no-repeat",
                }}
                aria-hidden={!isActive}
              />
            );
          })}
          {/* Dark overlay */}
          <div className="absolute inset-0 bg-black/65 pointer-events-none" />
        </div>

        {/* Foreground content */}
        <div className="relative z-10 flex items-center justify-center flex-col gap-3">
          <motion.img
            src="/Logo.png"
            alt="logo"
            className="w-60 lg:w-80 -mt-20 -mb-10 z-10"
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
          />
          <motion.h1
            className="text-primary text-[48px] sm:text-[64px] md:text-[72px] lg:text-[90px] z-10 leading-tight text-center"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5, ease: "easeOut" }}
          >
            Aab-O-Hawa
          </motion.h1>
          <p className="text-subhead text-center max-w-lg">
            ✨Preserving Nature, Protecting Tomorrow✨
          </p>

          {/* Optional manual controls */}
          <div className="mt-4 flex items-center gap-2">
            {bgImages.map((_, i) => (
              <button
                key={i}
                onClick={() => setIndex(i)}
                aria-label={`Go to slide ${i + 1}`}
                className={`h-2 w-2 rounded-full transition-all ${
                  i === index ? "bg-white w-6" : "bg-white/50 hover:bg-white/80"
                }`}
              />
            ))}
          </div>
        </div>
      </div>

      <About />
      <Contact />
      <Footer />
    </>
  );
};

export default Landing;
