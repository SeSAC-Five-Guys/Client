import { RecoilRoot } from 'recoil';

import ThemeProvider from './theme';
import Router from './Router';

export default function App() {
  return (
    <ThemeProvider>
      <RecoilRoot>
        <Router />
      </RecoilRoot>
    </ThemeProvider>
  );
}