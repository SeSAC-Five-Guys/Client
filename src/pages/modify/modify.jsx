import { useState } from 'react';
import { useNavigate } from 'react-router';
import { useRecoilState } from 'recoil';

import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import Divider from '@mui/material/Divider';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

import { axiosWrite } from '../../apis';
import { userInfoState, isValidState } from '../../recoil/atoms';

export default function Modify() {
  const navigate = useNavigate();

  const theme = useTheme();

  const [inputData, setInputData] = useState({ nickname: '', phone: '' });
  const [userInfo, setUserInfo] = useRecoilState(userInfoState);
  const [isValid, setIsValid] = useRecoilState(isValidState);
  const [isChecked, setIsChecked] = useState({ nickname: false, phone: false });
  const [showTooltip, setShowTooltip] = useState(false);

  const handleNicknameChange = (event) => {
    let newNickname = event.target.value;
    setInputData((inputData) => ({ ...inputData, nickname: newNickname }));
  };

  const handlePhoneChange = (event) => {
    if (event.target.value.includes('-')) {
      setShowTooltip(true);
      event.target.value = event.target.value.replace(/-/g, '');
    } else {
      setShowTooltip(false);
    }
    let newPhone = event.target.value;
    setInputData((inputData) => ({ ...inputData, phone: newPhone }));
    setIsValid((isValid) => ({
      ...isValid,
      phone: /^010\d{7,8}$/.test(newPhone),
    }));
  };

  const checkDuplicateNickname = async () => {
    // axiosWrite
    //   .post('', {
    //     nickname: inputData.nickname,
    //   })
    //   .then((res) => {
    //     // 중복체크 한번은 됐는지 상태 저장
    //     setIsChecked((isChecked) => ({ ...isChecked, nickname: true }));
    //   })
    //   .catch((e) => {});
  };

  const checkDuplicatePhone = async () => {
    // axiosWrite
    //   .post('', {
    //     phone: inputData.phone,
    //   })
    //   .then((res) => {
    //     // 중복체크 한번은 됐는지 상태 저장
    //     setIsChecked((isChecked) => ({ ...isChecked, phone: true }));
    //   })
    //   .catch((e) => {});
  };

  const handleQuit = async () => {
    // axiosWrite
    //   .get()
    //   .then((res) => {
    //     // 상태 초기화
    //     setUserInfo({
    //       nickname: '',
    //       phone: '',
    //       email: '',
    //       password: '',
    //     });
    //     // 로그인 화면으로 이동
    //     navigate('/');
    //   })
    //   .catch((e) => {});
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // 중복 확인 버튼 눌렀는지 확인
    // if (!isChecked.nickname || !isChecked.phone) {
    //   alert('중복확인 버튼을 눌러주세요!');
    //   return;
    // }

    // 중복 확인?

    // 데이터 업데이트
    // axiosWrite
    //   .post('', {
    //     nickname: inputData.nickname,
    //     phone: inputData.phone,
    //   })
    //   .then((res) => {
    //     // 성공하면 응답 값으로 업데이트
    //     setUserInfo((userInfo) => ({
    //       ...userInfo,
    //       nickname: '',
    //       phone: '',
    //     }));
    //     // 다시 로그인
    //     alert('변경된 정보로 다시 로그인해주세요!');
    //     navigate('/');
    //   })
    //   .catch((e) => {
    //     alert('이메일 또는 비밀번호를 확인해주세요!');
    //   });
  };

  const renderForm = (
    <Box>
      <Grid container spacing={1} sx={{ mb: 3 }}>
        <Grid item xs={8}>
          <TextField
            fullWidth
            name="nickname"
            label="닉네임"
            onChange={handleNicknameChange}
          />
        </Grid>
        <Grid item xs={4}>
          <Button
            fullWidth
            size="large"
            variant="contained"
            color="inherit"
            disabled={inputData.nickname === ''}
            onClick={checkDuplicateNickname}
          >
            중복확인
          </Button>
        </Grid>
      </Grid>

      <Grid container spacing={1} sx={{ mb: 3 }}>
        <Grid item xs={8}>
          <Tooltip
            title="전화번호에 '-'를 포함하지 마세요."
            open={showTooltip}
            placement="top"
            arrow
          >
            <TextField
              fullWidth
              name="phone"
              label="전화번호"
              onChange={handlePhoneChange}
              error={!isValid.phone && inputData.phone !== ''}
              helperText={
                !isValid.phone && inputData.phone !== ''
                  ? '유효한 전화번호를 입력하세요.'
                  : ''
              }
            />
          </Tooltip>
        </Grid>
        <Grid item xs={4}>
          <Button
            fullWidth
            size="large"
            variant="contained"
            color="inherit"
            disabled={!isValid.phone}
            onClick={checkDuplicatePhone}
          >
            중복확인
          </Button>
        </Grid>
      </Grid>

      <Button
        fullWidth
        size="large"
        variant="contained"
        color="inherit"
        disabled={inputData.nickname === '' || !isValid.phone}
        onClick={handleSubmit}
      >
        변경
      </Button>
    </Box>
  );

  return (
    <Box sx={{ height: 1 }}>
      <Stack alignItems="center" justifyContent="center" sx={{ height: 1 }}>
        <Card sx={{ p: 5, width: 1, maxWidth: 420 }}>
          <Typography variant="h4" sx={{ mb: 5 }}>
            정보 변경
          </Typography>

          {renderForm}

          <Divider sx={{ my: 3 }} />

          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
            sx={{ my: 3 }}
          >
            <Link
              href=""
              variant="subtitle2"
              underline="hover"
              sx={{ color: theme.palette.grey[500] }}
            >
              비밀번호 변경
            </Link>
            <Link
              variant="subtitle2"
              underline="hover"
              sx={{ color: theme.palette.error.main }}
              onClick={handleQuit}
            >
              회원 탈퇴
            </Link>
          </Stack>
        </Card>
      </Stack>
    </Box>
  );
}
