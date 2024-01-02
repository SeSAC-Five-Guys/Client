import { useRecoilValue } from 'recoil';

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

  const userInfo = useRecoilValue(userInfoState);

  // 버튼 클릭 이벤트

  return (
    <Card sx={{
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
    }}>
      <Box sx={{ p: 3 }}>
        <CardContent sx={{ mb: 1 }}>
          <Box sx={{ mb: 1.5, display: 'flex', alignItems: 'center' }}>
            <Typography variant="h5" color={theme.palette.info.main}>
              {/* {userInfo.nickname} */}
              test
            </Typography>
            <Typography variant="h5">
              님 반가워용~ 🙋‍♂️
            </Typography>
          </Box>
          <Typography color="text.secondary" >
            {/* {userInfo.email} */}
            test@test.test
          </Typography>
          <Typography color="text.secondary" >
            {/* {userInfo.phone} */}
            123-123-123
          </Typography>
        </CardContent>
        <CardActions>
          <Button variant='outlined'>회원 정보 변경하기</Button>
        </CardActions>
      </Box>
    </Card >
  );
}