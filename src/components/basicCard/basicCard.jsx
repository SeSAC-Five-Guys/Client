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
import { axiosAuth } from '../../apis';
import axios from 'axios';
export default function BasicCard() {
  const navigate = useNavigate();

  const theme = useTheme();

  const [userInfo, setUserInfo] = useRecoilState(userInfoState);
  const handleLogout = async () => {
    axiosAuth
      .delete(`authentication/member`, { withCredentials: true })
      .then((response) => {
        const res = response.data;
        if (res.success) {
          setUserInfo({ nickname: '', email: '', phone: '' });
          alert('로그 아웃~!');
          navigate('/');
        }
      })
      .catch((e) => {
        const res = e.response.data;
        if (res.errorStatus == 'ACCESS_TOKEN_ERROR') {
          alert('로그인이 이미 만료 되었습니다.');
          setUserInfo({ nickname: '', email: '', phone: '' });
          navigate('/');
        } else {
          alert('알 수 없는 오류, 계속되는 경우 관리자한테 문의하세요.');
        }
      });
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
          <Button variant="outlined" href="/modify">
            회원 정보 변경하기
          </Button>
          <Button
            variant="outlined"
            sx={{
              ml: 2,
              color: theme.palette.error.main,
              borderColor: theme.palette.error.main,
              cursor: 'pointer',
              '&:hover': {
                borderColor: theme.palette.error.main,
                backgroundColor: theme.palette.error.lighter,
              },
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
