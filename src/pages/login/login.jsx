import { useState } from 'react';
import { useRecoilState } from 'recoil';

import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

import { isValidState, userInfoState } from '../../recoil/atoms';

export default function Login() {
  const [userInfo, setUserInfo] = useRecoilState(userInfoState);
  const [isValid, setIsValid] = useRecoilState(isValidState);
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleEmailChange = (event) => {
    let newEmail = event.target.value;
    setUserInfo((userInfo) => ({ ...userInfo, email: newEmail }));
    setIsValid((isValid) => ({
      ...isValid,
      email: /^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/.test(newEmail),
    }));
  };

  const handlePasswordChange = (event) => {
    let newPassword = event.target.value;
    setUserInfo((userInfo) => ({ ...userInfo, password: newPassword }));
    setIsValid((isValid) => ({
      ...isValid,
      password: newPassword.length >= 8,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(userInfo);
    // 서버 전송

    // 서버에서 받은 정보 set
    // setUserInfo((userInfo) => ({
    //   ...userInfo,
    //   nickname: nickname,
    //   phone: phone,
    //   email: email,
    //   password: password,
    // }));
  };

  const renderForm = (
    <Box>
      <Stack spacing={3} sx={{ my: 3 }}>
        <TextField
          name="email"
          label="이메일"
          value={userInfo.email}
          onChange={handleEmailChange}
          error={!isValid.email && userInfo.email !== ''}
          helperText={
            !isValid.email && userInfo.email !== ''
              ? '유효한 이메일을 입력하세요.'
              : ''
          }
        />

        <TextField
          name="password"
          label="비밀번호"
          type={showPassword ? 'text' : 'password'}
          value={userInfo.password}
          onChange={handlePasswordChange}
          error={!isValid.password && userInfo.password !== ''}
          helperText={
            !isValid.password && userInfo.password !== ''
              ? '비밀번호는 8자 이상이어야 합니다.'
              : ''
          }
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </Stack>

      <Button
        fullWidth
        size="large"
        variant="contained"
        color="inherit"
        disabled={!isValid.email || !isValid.password}
        onClick={handleSubmit}
      >
        로그인
      </Button>
    </Box>
  );

  return (
    <Box sx={{ height: 1 }}>
      <Stack alignItems="center" justifyContent="center" sx={{ height: 1 }}>
        <Card sx={{ p: 5, width: 1, maxWidth: 420 }}>
          <Typography variant="h4">Welcome!</Typography>

          <Typography variant="body2" sx={{ mt: 2, mb: 5 }}>
            아직 계정이 없으신가요?
            <Link href="/join" variant="subtitle2" sx={{ ml: 0.5 }}>
              회원가입
            </Link>
          </Typography>

          <Divider sx={{ my: 3 }}>
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              OR
            </Typography>
          </Divider>

          {renderForm}
        </Card>
      </Stack>
    </Box>
  );
}
