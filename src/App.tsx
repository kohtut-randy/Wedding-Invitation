import Petals from "./component/Petals";
import Navbar from "./component/Navbar";
import Hero from "./component/Hero";
import CoupleIntro from "./component/CoupleIntro";
import OurStory from "./component/OurStory";
import VideoSection from "./component/VideoSection";
import EventDetails from "./component/EventDetails";
import Countdown from "./component/Countdown";
import Gallery from "./component/Gallery";
import Location from "./component/Location";
import ThankYou from "./component/ThankYou";
import RSVP from "./component/RSVP";
import Stars from "./component/Stars";
import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import LoadingScreen from "./component/LoadingScreen";

function App() {
  const [loading, setLoading] = useState(true);

  // ✅ Force scroll to top on initial load (disable browser scroll restoration)
  useEffect(() => {
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }
    window.scrollTo(0, 0);
  }, []);

  // Prevent scroll while loading
  useEffect(() => {
    document.body.style.overflow = loading ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [loading]);

  // ✅ Reset scroll to top when loading finishes
  useEffect(() => {
    if (!loading) {
      window.scrollTo({ top: 0, behavior: "auto" });
    }
  }, [loading]);

  return (
    <div className="relative min-h-screen bg-ivory">
      {/* Loading Screen */}
      <AnimatePresence>
        {loading && <LoadingScreen onFinish={() => setLoading(false)} />}
      </AnimatePresence>

      {/* Main content — fades in after loading */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: loading ? 0 : 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative"
      >
        <Petals />
        <Stars />
        <Navbar />
        <main className="relative z-20">
          <Hero />

          <CoupleIntro />

          <OurStory />

          <VideoSection />

          <EventDetails />

          <Countdown />

          <Gallery />

          <RSVP />

          <Location />

          <ThankYou />
        </main>
      </motion.div>
    </div>
  );
}

export default App;
