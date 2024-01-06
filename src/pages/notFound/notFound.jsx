import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

export default function NotFound() {
  return (
    <>
      <Container>
        <Box
          sx={{
            py: 12,
            maxWidth: 480,
            mx: 'auto',
            display: 'flex',
            minHeight: '100vh',
            textAlign: 'center',
            alignItems: 'center',
            flexDirection: 'column',
            justifyContent: 'center',
          }}
        >
          <Typography variant="h3" sx={{ mb: 3 }}>
            존재하지 않는 페이지
          </Typography>

          <Typography sx={{ color: 'text.secondary' }}>
            페이지를 찾을 수 없습니다. URL을 다시 확인해주세요!
          </Typography>

          <Box
            component="img"
            src="/assets/pages/illustration_404.svg"
            sx={{
              mx: 'auto',
              height: 260,
              my: { xs: 5, sm: 10 },
            }}
          />

          <Button href="/" size="large" variant="contained">
            메인 화면
          </Button>
        </Box>
      </Container>
    </>
  );
}
