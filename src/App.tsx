import Navbar from '../src/components/NavBar/NavBar';
import Hero from '../src/components/Hero/Hero';
import AnnouncementBar from './components/AnnouncementBar/AnnouncementBar';
import Lifestyle from './components/Hero/Lifestyle/Lifestyle';
import Pillars from './components/Hero/Pillars/Pillars';
import BestSellers from './components/Hero/BestSellers/BestSellers';
import NewsletterBanner from './components/Hero/NewsletterBanner/NewsletterBanner';

export default function App() {
  return (
    <>
      
     <AnnouncementBar />
      <Navbar />
      <Hero />
      <Lifestyle />
      <Pillars />
      <BestSellers />
      <NewsletterBanner />
    </>
  );
}