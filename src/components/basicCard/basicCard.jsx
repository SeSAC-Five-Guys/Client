import { useRecoilState } from 'recoil';
import { useNavigate } from 'react-router-dom';

import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';

import { userInfoState } from '../../recoil/atoms';

export default function BasicCard() {
  const theme = useTheme();
  const navigate = useNavigate();

  const [userInfo, setUserInfo] = useRecoilState(userInfoState);

  const handleLogout = (event) => {
    setUserInfo({
      nickname: '',
      email: '',
      phone: '',
      password: '',
    });
    navigate('/');
  };

  return (
    <Card
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
      }}
    >
      <Box sx={{ p: 3 }}>
        <CardContent sx={{ mb: 1 }}>
          <Box sx={{ mb: 1.5, display: 'flex', alignItems: 'center' }}>
            <Typography variant="h5" color={theme.palette.info.main}>
              {userInfo.nickname}
            </Typography>
            <Typography variant="h5">님 반가워용~ 🙋‍♂️</Typography>
          </Box>
          <Typography color="text.secondary">{userInfo.email}</Typography>
          <Typography color="text.secondary">{userInfo.phone}</Typography>
        </CardContent>
        <CardActions>
          <Button variant="outlined">회원 정보 변경하기</Button>
          <Button
            variant="outlined"
            sx={{
              color: theme.palette.error.main,
              borderColor: theme.palette.error.main,
            }}
            onClick={handleLogout}
          >
            로그아웃
          </Button>
        </CardActions>
      </Box>
    </Card>
  );
}
