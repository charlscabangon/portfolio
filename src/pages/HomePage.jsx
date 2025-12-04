import Hero from '@/components/sections/home/Hero';
import AboutMe from '@/components/sections/home/AboutMe';
import Projects from '@/components/sections/works/Projects';
import Designs from '@/components/sections/works/Designs';
import Experiences from '@/components/sections/home/Experiences';
import Contact from '@/components/sections/connect/Contact';
import Footer from '@/layout/Footer';
import { NAV_ID } from '@/data/layout/navData';

export default function HomePage() {
  return (
    <div className="space-y-3xl">
      <div id={NAV_ID.HOME} name={NAV_ID.HOME} className="space-y-3xl mt-4xl">
        <Hero />
        <AboutMe />
        <Experiences />
      </div>
      <div id={NAV_ID.WORKS} name={NAV_ID.WORKS} className="space-y-3xl mb-5xl">
        <Projects />
        <Designs />
      </div>
      <div id={NAV_ID.CONNECT} name={NAV_ID.CONNECT}>
        <Contact />
        <Footer />
      </div>
    </div>
  );
}
