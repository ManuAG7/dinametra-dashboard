import Navbar from '../src/components/NavBar/NavBar';
import Hero from '../src/components/Hero/Hero';
import AnnouncementBar from './components/AnnouncementBar/AnnouncementBar';
import Lifestyle from './components/Hero/Lifestyle/Lifestyle';
import Pillars from './components/Hero/Pillars/Pillars';
import BestSellers from './components/Hero/BestSellers/BestSellers';
import NewsletterBanner from './components/Hero/NewsletterBanner/NewsletterBanner';
import SocialProof from './components/Hero/SocialProof/SocialProof';
import Testimonials from './components/Hero/Testimonials/Testimonials';
import NewsletterStrip from './components/Hero/NewsletterStrip/NewsletterStrip';
import Footer from './components/Hero/Footer/Footer';
export default function App() {
  return (
    <div className="app-container">
      <AnnouncementBar />
      <div className="sticky top-0 z-50">

        <Navbar />
      </div>

      <main>
        <div id="inicio"><Hero /></div>
        <div id="categorias"><Lifestyle /></div>
        <Pillars />
        <div id="mas-vendidos"><BestSellers /></div>
        <NewsletterBanner />
        <SocialProof />
        <Testimonials />
        <NewsletterStrip />
      </main>

      <div id="contacto"><Footer /></div>

    </div>
  );
}
