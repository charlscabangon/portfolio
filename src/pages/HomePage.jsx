import Hero from '@/components/sections/Hero';
import AboutMe from '@/components/sections/AboutMe';
import Projects from '@/components/sections/Projects';
import Designs from '@/components/sections/Designs';
import Experiences from '@/components/sections/Experiences';

export default function HomePage() {
  return (
    <div className="space-y-3xl mt-4xl mb-5xl">
      <Hero />
      <AboutMe />
      <Experiences />
      <Projects />
      <Designs />
    </div>
  );
}
