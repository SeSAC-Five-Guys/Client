import { useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';

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
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

import FormDialog from '../../components/formDialog';
import {
  userInfoState,
  isValidState,
  showEmailState,
} from '../../recoil/atoms';

export default function Join() {
  // 닉네임, 전화번호, 이메일, 비밀번호
  const [userInfo, setUserInfo] = useRecoilState(userInfoState);
  const [confirmPassword, setConfirmPassword] = useState('');

  // 유효성 검사
  const [isValid, setIsValid] = useRecoilState(isValidState);
  const [isConfirmPasswordValid, setConfirmPasswordValid] = useState(false);

  // 이벤트
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  const showEmail = useRecoilValue(showEmailState);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleClickShowConfirmPassword = () => {
    setShowConfirmPassword((show) => !show);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleNicknameChange = (event) => {
    let newNickname = event.target.value;
    setUserInfo((userInfo) => ({ ...userInfo, nickname: newNickname }));
  };

  const handlePhoneChange = (event) => {
    if (event.target.value.includes('-')) {
      setShowTooltip(true);
      event.target.value = event.target.value.replace(/-/g, '');
    } else {
      setShowTooltip(false);
    }
    let newPhone = event.target.value;
    setUserInfo((userInfo) => ({ ...userInfo, phone: newPhone }));
    setIsValid((isValid) => ({
      ...isValid,
      phone: /^010\d{7,8}$/.test(newPhone),
    }));
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

  const handleConfirmPasswordChange = (event) => {
    let newConfirmPassword = event.target.value;
    setConfirmPassword(newConfirmPassword);
    setConfirmPasswordValid(newConfirmPassword === userInfo.password);
  };

  const checkDuplicate = async (value) => {
    console.log(value);
  };

  // const checkDuplicate = async (type, value) => {
  //   try {
  //     const res = await axios.post(
  //       // api,
  //       { [type]: value },
  //       { headers: { 'Content-Type': 'application/json' } }
  //     );

  //     if (res.data.isDuplicated) {
  //       alert(`이미 사용 중인 ${type}입니다.`);
  //     } else {
  //       alert(`사용 가능한 ${type}입니다.`);
  //     }
  //   } catch (error) {
  //     console.error(`${type} 중복 확인 중 에러가 발생했습니다: `, error);
  //   }
  // };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(userInfo);
    // 서버 전송
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
            disabled={userInfo.nickname === ''}
            onClick={() => checkDuplicate(userInfo.nickname)}
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
              error={!isValid.phone && userInfo.phone !== ''}
              helperText={
                !isValid.phone && userInfo.phone !== ''
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
            onClick={() => checkDuplicate(userInfo.phone)}
          >
            중복확인
          </Button>
        </Grid>
      </Grid>

      <Grid container spacing={1} sx={{ mb: 3 }}>
        <Grid item xs={8}>
          <TextField
            fullWidth
            name="email"
            label="이메일"
            disabled={!showEmail}
            onChange={handleEmailChange}
            error={!isValid.email && userInfo.email !== ''}
            helperText={
              !isValid.email && userInfo.email !== ''
                ? '유효한 이메일을 입력하세요.'
                : ''
            }
          />
        </Grid>
        <Grid item xs={4}>
          <FormDialog />
        </Grid>
      </Grid>

      <Stack spacing={3} sx={{ my: 3 }}>
        <TextField
          name="password"
          label="비밀번호"
          type={showPassword ? 'text' : 'password'}
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

        <TextField
          name="confirmPassword"
          label="비밀번호 확인"
          type={showConfirmPassword ? 'text' : 'password'}
          value={confirmPassword}
          onChange={handleConfirmPasswordChange}
          error={!isConfirmPasswordValid && confirmPassword !== ''}
          helperText={
            !isConfirmPasswordValid && confirmPassword !== ''
              ? '입력한 값과 비밀번호가 다릅니다.'
              : ''
          }
          disabled={!isValid.password || userInfo.password === ''}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  onClick={handleClickShowConfirmPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                  disabled={!isValid.password || userInfo.password === ''}
                >
                  {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
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
        disabled={
          userInfo.nickname === '' ||
          !isValid.phone ||
          !isValid.email ||
          !isValid.password ||
          !isConfirmPasswordValid
        }
        onClick={handleSubmit}
      >
        회원가입
      </Button>
    </Box>
  );

  return (
    <Box sx={{ height: 1 }}>
      <Stack alignItems="center" justifyContent="center" sx={{ height: 1 }}>
        <Card sx={{ p: 5, width: 1, maxWidth: 420 }}>
          <Typography variant="h4" sx={{ mb: 5 }}>
            회원가입
          </Typography>

          {renderForm}

          <Divider sx={{ my: 3 }} />

          <Typography variant="body2" sx={{ mt: 2 }}>
            이미 계정이 있으신가요?
            <Link href="/" variant="subtitle2" sx={{ ml: 0.5 }}>
              로그인
            </Link>
          </Typography>
        </Card>
      </Stack>
    </Box>
  );
}
