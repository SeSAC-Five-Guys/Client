import AppBar from '@mui/material/AppBar';
import { useTheme } from '@mui/material/styles';

export default function Header() {
  const theme = useTheme();

  return (
    <AppBar
      position='static'
      sx={{
        boxShadow: 'none',
        height: 64,
        bgcolor: theme.palette.background.default,
      }}
    >
      {/* 로고 */}
    </AppBar>
  );
}