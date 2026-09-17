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

function App() {
  return (
    <div className="relative min-h-screen bg-ivory">
      <Petals />
      <Stars />
      <Navbar />
      <main className="relative z-20">
        <Hero />
        <CoupleIntro />
        <VideoSection />
        <OurStory />
        <Countdown />
        <EventDetails />
        <Gallery />
        <RSVP />
        <Location />
        <ThankYou />
      </main>
    </div>
  );
}

export default App;
