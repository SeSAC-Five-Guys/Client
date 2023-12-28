import { useState } from 'react';

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

export default function Join() {
  // 닉네임, 전화번호, 이메일, 이메일인증, 비밀번호, 비밀번호확인
  const [nickname, setNickname] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // 유효성 검사
  const [isPhoneValid, setPhoneValid] = useState(false);
  const [isEmailValid, setEmailValid] = useState(false);
  const [isPasswordValid, setPasswordValid] = useState(false);
  const [isConfirmPasswordValid, setConfirmPasswordValid] = useState(false);

  // 이벤트
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [showTooltip, setTooltip] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleClickShowConfirmPassword = () => setShowConfirmPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleNicknameChange = (event) => {
    setNickname(event.target.value);
  };

  const handlePhoneChange = (event) => {
    let input = event.target.value;
    if (input.includes('-')) {
      setTooltip(true);
      input = input.replace(/-/g, '');
    } else {
      setTooltip(false);
    }
    setPhone(input);
    setPhoneValid(/^010\d{7,8}$/.test(input));
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
    setEmailValid(/^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/.test(event.target.value));
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
    setPasswordValid(event.target.value.length >= 8);
  };

  const handleConfirmPasswordChange = (event) => {
    setConfirmPassword(event.target.value);
    setConfirmPasswordValid(event.target.value === password);
  };

  const checkDuplicate = async (value) => {
    console.log(value);
  };

  // const checkDuplicate = async (type, value, api) => {
  //   try {
  //     const res = await axios.post(
  //       api,
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
    const data = new FormData(event.currentTarget);
    console.log({
      nickname: data.get('nickname'),
      phone: data.get('phone'),
      email: data.get('email'),
      password: data.get('password'),
    });
  };

  const renderForm = (
    <Box
      component="form"
      onSubmit={handleSubmit}
      noValidate
    >
      <Grid container spacing={1} sx={{ mb: 3 }}>
        <Grid item xs={8}>
          <TextField
            fullWidth
            name="nickname"
            label="닉네임"
            value={nickname}
            onChange={handleNicknameChange}
          />
        </Grid>
        <Grid item xs={4}>
          <Button
            fullWidth
            size="large"
            variant="contained"
            color="inherit"
            disabled={nickname === ''}
            onClick={() => checkDuplicate(nickname)}
          >
            중복확인
          </Button>
        </Grid>
      </Grid>

      <Grid container spacing={1} sx={{ mb: 3 }}>
        <Grid item xs={8}>
          <Tooltip title="전화번호에 '-'를 포함하지 마세요." open={showTooltip} placement="top" arrow>
            <TextField
              fullWidth
              name="phone"
              label="전화번호"
              value={phone}
              onChange={handlePhoneChange}
              error={!isPhoneValid && phone !== ""}
              helperText={!isPhoneValid && phone !== "" ? '유효한 전화번호를 입력하세요.' : ''}
            />
          </Tooltip>
        </Grid>
        <Grid item xs={4}>
          <Button
            fullWidth
            size="large"
            variant="contained"
            color="inherit"
            disabled={!isPhoneValid}
            onClick={() => checkDuplicate(phone)}
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
            value={email}
            onChange={handleEmailChange}
            error={!isEmailValid && email !== ""}
            helperText={!isEmailValid && email !== "" ? '유효한 이메일을 입력하세요.' : ''}
          />
        </Grid>
        <Grid item xs={4}>
          <Button
            fullWidth
            size="large"
            variant="contained"
            color="inherit"
            disabled={!isEmailValid}
            onClick={() => checkDuplicate(email)}
          >
            중복확인
          </Button>
        </Grid>
      </Grid>

      <Stack spacing={3} sx={{ my: 3 }}>
        {/* 이메일 인증 */}

        <TextField
          name="password"
          label="비밀번호"
          type={showPassword ? 'text' : 'password'}
          value={password}
          onChange={handlePasswordChange}
          error={!isPasswordValid && password !== ""}
          helperText={!isPasswordValid && password !== "" ? '비밀번호는 8자 이상이어야 합니다.' : ''}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
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
          error={!isConfirmPasswordValid && confirmPassword !== ""}
          helperText={!isConfirmPasswordValid && confirmPassword !== "" ? '입력한 값과 비밀번호가 다릅니다.' : ''}
          disabled={!isPasswordValid || password === ''}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowConfirmPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                  disabled={!isPasswordValid || password === ''}
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
        type="submit"
        variant="contained"
        color="inherit"
        disabled={nickname === '' || !isPhoneValid || !isEmailValid || !isPasswordValid || !isConfirmPasswordValid}
      >
        회원가입
      </Button>
    </Box >
  );

  return (
    <Box sx={{ height: 1 }}>
      <Stack alignItems="center" justifyContent="center" sx={{ height: 1 }}>
        <Card
          sx={{
            p: 5,
            width: 1,
            maxWidth: 420,
          }}
        >
          <Typography variant="h4" sx={{ mb: 5 }}>회원가입</Typography>

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
    </Box >
  );
}