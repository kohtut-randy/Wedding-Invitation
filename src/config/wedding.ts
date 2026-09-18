import Bride from "../assets/optimized/Bride.webp";
import Groom from "../assets/optimized/Groom.webp";
import Wedding from "../assets/optimized/wedding.webp";
import HighShot from "../assets/optimized/highShot.webp";
import SandY from "../assets/optimized/S&Y.webp";
import SandY2 from "../assets/optimized/S&Y2.webp";
import SandY3 from "../assets/optimized/S&Y3.webp";
import fadeCouple from "../assets/optimized/fadeCouple.webp";
import StoryWedding from "../assets/optimized/storywedding.webp";
import Loadingicon from "../assets/optimized/Loading.webp";

export interface StoryEvent {
  date: string;
  title: string;
  description: string;
  image: string;
  quote?: string; // optional pull-quote for extra elegance
  location?: string; // where it happened
}

export interface EventDetail {
  title: string;
  time: string;
  venue: string;
  address: string;
  description: string;
}

export interface GalleryImage {
  src: string;
  alt: string;
}
export interface VideoConfig {
  title: string;
  subtitle: string;
  description: string;
  embedUrl: string; // ✅ iframe embed URL (Streamable, YouTube, Vimeo)
  autoPlayOnScroll: boolean;
}
export interface WeddingConfig {
  bride: {
    name: string;
    fullName: string;
    description: string;
    image: string;
  };
  groom: {
    name: string;
    fullName: string;
    description: string;
    image: string;
  };
  weddingDate: string;
  weddingDateDisplay: string;
  heroTagline: string;
  story: StoryEvent[];
  events: EventDetail[];
  gallery: GalleryImage[];
  googleFormUrl: string;
  googleMapsUrl: string;
  venueName: string;
  venueAddress: string;
  hashtag: string;
  video?: VideoConfig;
  Loadingimg: string;
}

const weddingConfig: WeddingConfig = {
  bride: {
    name: "Yee Mon",
    fullName: "Yee Mon Aung",
    description:
      "A lover of art, sunsets, and quiet mornings. Yee brings warmth and grace to every room she enters.",
    image: Bride,
  },
  groom: {
    name: "Shane",
    fullName: "Wai Lin Maung @ Shane",
    description:
      "An adventurer at heart, Shane finds joy in nature, good books, and making Yee's laugh.",
    image: Groom,
  },
  weddingDate: "2026-10-25T11:30:00",
  weddingDateDisplay: "October 25, 2026",
  heroTagline: "We're getting married",
  story: [
    {
      date: "2016",
      title: "The First Meeting",
      description:
        "Our story began at the Taunggyi Fire Balloon Festival. Among the lights, music, and glowing balloons in the night sky, two people met — never knowing that this moment would become the beginning of our journey together.",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQH2_O0ESAB5Y4RjnJSXjMu7_9lL3bbDGyV2nXvs9_npw&s=10",
      quote: "The beginning of our story.",
      location: "Taunggyi, Myanmar",
    },
    {
      date: "2020",
      title: "Our First Trip",
      description:
        "Our first adventure together took us to Bagan. Surrounded by ancient temples, beautiful sunsets, and quiet moments, we created memories that we would carry with us for years to come.",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQXbXtk9SaIF-3gqXT7m4sIbw_ycoNQRdPchtjTTOaCbA&s=10",
      quote: "Two hearts, one journey.",
      location: "Bagan, Myanmar",
    },
    {
      date: "2025",
      title: "The Wedding",
      description:
        "After years of memories, adventures, laughter, and love, we finally said 'I do' in Yangon. Surrounded by the people we love, we celebrated the beginning of forever together.",
      image: StoryWedding,
      quote: "And so, forever begins.",
      location: "Yangon, Myanmar",
    },
  ],
  events: [
    {
      title: "Wedding Ceremony",
      time: "11:30 AM",
      venue: "Lebua Thai",
      address: "30 Victoria St, #01-31 CHIJMES, Singapore 187996",
      description:
        "Join us as we exchange vows in an intimate ceremony surrounded by family and friends.",
    },
  ],

  video: {
    title: "Our Journey",
    subtitle: "A Moment to Remember",
    description:
      "A glimpse into the moments that brought us here — laughter, adventure, and love.",
    embedUrl: "https://streamable.com/e/em2w9s?autoplay=1&muted=1&loop=1",
    autoPlayOnScroll: true,
  },
  gallery: [
    {
      src: Wedding,
      alt: "Couple holding hands",
    },
    {
      src: SandY,
      alt: "Romantic sunset kiss",
    },
    {
      src: SandY2,
      alt: "Wedding rings detail",
    },
    {
      src: HighShot,
      alt: "Bouquet of flowers",
    },
    {
      src: SandY3,
      alt: "Couple walking together",
    },
    {
      src: fadeCouple,
      alt: "Wedding celebration",
    },
  ],
  googleFormUrl: import.meta.env.VITE_GOOGLE_FORM_URL as string,
  googleMapsUrl: import.meta.env.VITE_GOOGLE_MAPS_URL as string,
  venueName: "Lebua Thai",
  venueAddress: "30 Victoria St, #01-31 CHIJMES, Singapore 187996",
  hashtag: "#YeeAndShane2026",
  Loadingimg: Loadingicon,
};

export default weddingConfig;
