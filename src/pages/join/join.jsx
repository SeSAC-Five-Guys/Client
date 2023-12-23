import { useState } from 'react';

import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

export default function Join() {
  // 이름, 전화번호, 이메일, 이메일인증, 비밀번호, 비밀번호확인
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // 유효성 검사
  const [isNameValid, setNameValid] = useState(false);
  const [isPhoneValid, setPhoneValid] = useState(false);
  const [isEmailValid, setEmailValid] = useState(false);
  const [isPasswordValid, setPasswordValid] = useState(false);
  const [isConfirmPasswordValid, setConfirmPasswordValid] = useState(false);

  // 이벤트
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleClickShowConfirmPassword = () => setShowConfirmPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleNameChange = (event) => {
    setName(event.target.value);
    setNameValid(/^[가-힣]{2,5}$/.test(event.target.value));
  };

  const handlePhoneChange = (event) => {
    setPhone(event.target.value);
    setPhoneValid(/^010\d{7,8}$/.test(event.target.value));
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

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      name: data.get('name'),
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
      <Stack spacing={3} sx={{ my: 3 }}>
        <TextField
          name="name"
          label="이름"
          value={name}
          onChange={handleNameChange}
          error={!isNameValid && name !== ""}
          helperText={!isNameValid && name !== "" ? '2~5자의 한글을 입력하세요.' : ''}
        />

        <TextField
          name="phone"
          label="전화번호"
          value={phone}
          onChange={handlePhoneChange}
          error={!isPhoneValid && phone !== ""}
          helperText={!isPhoneValid && phone !== "" ? '유효한 전화번호를 입력하세요.' : ''}
        />
      </Stack>

      <Grid container spacing={2}>
        <Grid item xs={9}>
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
        <Grid item xs={3}>
          <Button
            fullWidth
            size="large"
            type="submit"
            variant="contained"
            color="inherit"
            disabled={!isEmailValid}
          >
            인증
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
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowConfirmPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
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
        disabled={!isNameValid || !isPhoneValid || !isEmailValid || !isPasswordValid || !isConfirmPasswordValid}
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