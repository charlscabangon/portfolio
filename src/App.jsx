import AppLayout from './layout/AppLayout';

import Header from './components/Header';
import Hero from './features/hero/Hero';
import AboutMe from './layout/home/AboutMe';

export default function App() {
  return (
    <>
      <Header />
      <AppLayout>
        <Hero />
        <AboutMe />
      </AppLayout>
    </>
  );
}
