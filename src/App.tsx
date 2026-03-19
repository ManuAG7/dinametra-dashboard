import Navbar from '../src/components/NavBar/NavBar';
import Hero from '../src/components/Hero/Hero';
import AnnouncementBar from './components/AnnouncementBar/AnnouncementBar';

export default function App() {
  return (
    <>
     <AnnouncementBar />
      <Navbar />
      <Hero />

    </>
  );
}