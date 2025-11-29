import Hero from '@/components/sections/Hero';
import AboutMe from '@/components/sections/AboutMe';
import Projects from '@/components/sections/Projects';
import Designs from '@/components/sections/Designs';
import Experiences from '@/components/sections/Experiences';

export default function HomePage() {
  return (
    <div className="space-y-3xl mb-5xl">
      <div id="home" className="space-y-3xl mt-4xl">
        <Hero />
        <AboutMe />
        <Experiences />
      </div>
      <div id="works" className="space-y-3xl">
        <Projects />
        <Designs />
      </div>
    </div>
  );
}
