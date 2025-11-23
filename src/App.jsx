import AppLayout from './layout/AppLayout';

import Header from './layout/Header';
import Footer from './layout/Footer';
import HomePage from './pages/HomePage';

export default function App() {
  return (
    <>
      <Header />
      <AppLayout>
        <HomePage />
      </AppLayout>
    </>
  );
}
