import Navbar from '../src/components/NavBar/NavBar';
import Hero from '../src/components/Hero/Hero';
import AnnouncementBar from './components/AnnouncementBar/AnnouncementBar';
import Lifestyle from './components/Hero/Lifestyle/Lifestyle';
  import Pillars from './components/Hero/Pillars/Pillars';

export default function App() {
  return (
    <>
      
     <AnnouncementBar />
      <Navbar />
      <Hero />
      <Lifestyle />
      <Pillars />
    </>
  );
}