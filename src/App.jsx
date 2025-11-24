import AppLayout from './layout/AppLayout';

import Header from './layout/Header';
import HomePage from './pages/HomePage';

import { ThemeProvider } from './features/theme/context/ThemeProvider';

export default function App() {
  return (
    <>
      <ThemeProvider>
        <Header />
        <AppLayout>
          <HomePage />
        </AppLayout>
      </ThemeProvider>
    </>
  );
}
