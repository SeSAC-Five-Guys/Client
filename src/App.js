import ThemeProvider from './theme';
import Router from './Router';

export default function App() {
  return (
    <ThemeProvider>
      <Router />
    </ThemeProvider>
  );
}