import { AppLayout, Header } from '@/layout';
import { ThemeProvider } from '@/features/tempTheme';
import HomePage from './pages/HomePage';

export default function App() {
  return (
    <ThemeProvider>
      <Header />
      <AppLayout>
        <HomePage />
      </AppLayout>
    </ThemeProvider>
  );
}
