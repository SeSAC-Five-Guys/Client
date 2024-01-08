import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';

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

import BasicAlert from '../../components/basicAlert';
import VerifyDialog from '../../components/verifyDialog';

import { userInfoState } from '../../recoil/atoms';
import { axiosWrite } from '../../apis';

export default function Join() {
  const navigate = useNavigate();

  const [userInfo, setUserInfo] = useRecoilState(userInfoState);
  const [inputData, setInputData] = useState({
    nickname: '',
    phone: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [isValid, setIsValid] = useState({
    nickname: false,
    phone: false,
    email: false,
    password: false,
    confirmPassword: false,
  });
  const [isChecked, setIsChecked] = useState({
    nickname: false,
    phone: false,
    email: false,
  });
  const [showEmail, setShowEmail] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  const [showDialog, setShowDialog] = useState(false);

  const [openAlert, setOpenAlert] = useState(false);
  const [severity, setSeverity] = useState('info');
  const [message, setMessage] = useState('');

  const closeAlert = () => setOpenAlert(false);

  const handleDialogClose = () => setShowDialog(false);

  const handleEmailClose = () => setShowEmail(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleClickShowConfirmPassword = () => {
    setShowConfirmPassword((show) => !show);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleNicknameChange = (event) => {
    const validation = new RegExp(
      `^(?=.[가-힣a-zA-Z])[-가-힣a-zA-Z0-9!@#$%&]{5,12}$|(?=.[가-힣])[-가-힣0-9!@#$%&]{5,12}$|(?=.*[a-zA-Z])[-a-zA-Z0-9!@#$%&]{5,12}$`
    );
    let newNickname = event.target.value;
    setInputData((inputData) => ({ ...inputData, nickname: newNickname }));
    setIsValid((isValid) => ({
      ...isValid,
      nickname: validation.test(newNickname),
    }));
  };

  const handlePhoneChange = (event) => {
    if (/\D/.test(event.target.value)) {
      setShowTooltip(true);
      event.target.value = event.target.value.replace(/\D/g, '');
    } else {
      setShowTooltip(false);
    }
    const validation = new RegExp(`^01[0-9]{9}$`);
    let newPhone = event.target.value;
    setInputData((inputData) => ({ ...inputData, phone: newPhone }));
    setIsValid((isValid) => ({
      ...isValid,
      phone: validation.test(newPhone),
    }));
  };

  const handleEmailChange = (event) => {
    const validation = new RegExp(`^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$`);
    let newEmail = event.target.value;
    setInputData((inputData) => ({ ...inputData, email: newEmail }));
    setIsValid((isValid) => ({
      ...isValid,
      email: validation.test(newEmail),
    }));
  };

  const handlePasswordChange = (event) => {
    const validation = new RegExp(
      `^(?=.*[0-9a-zA-Z!@#$%&])[-0-9a-zA-Z!@#$%&]{6,12}$`
    );
    let newPassword = event.target.value;
    setInputData((inputData) => ({ ...inputData, password: newPassword }));
    setIsValid((isValid) => ({
      ...isValid,
      password: validation.test(newPassword),
    }));
  };

  const handleConfirmPasswordChange = (event) => {
    let newConfirmPassword = event.target.value;
    setInputData((inputData) => ({
      ...inputData,
      confirmPassword: newConfirmPassword,
    }));
    setIsValid((isValid) => ({
      ...isValid,
      confirmPassword: newConfirmPassword === inputData.password,
    }));
  };

  // 중복 체크
  const checkDuplicateNickname = async () => {
    axiosWrite
      .get(`members/nickname/${inputData.nickname}`)
      .then((response) => {
        const res = response.data;
        if (res.success) {
          setIsChecked((isChecked) => ({ ...isChecked, nickname: true }));

          setOpenAlert(true);
          setSeverity('success');
          setMessage('사용 가능한 닉네임입니다.');
        }
      })
      .catch((e) => {
        const res = e.response.data;
        if (res.errorStatus === 'DUPLICATE_NICKNAME') {
          alert('이미 존재하는 닉네임입니다.');
        } else {
          alert('알 수 없는 오류, 계속되는 경우 관리자한테 문의하세요.');
        }
      });
  };

  const checkDuplicatePhone = async () => {
    axiosWrite
      .get(`members/phone_number/${inputData.phone}`)
      .then((response) => {
        const res = response.data;
        if (res.success) {
          setIsChecked((isChecked) => ({ ...isChecked, phone: true }));
          alert('사용 가능한 핸드폰 번호입니다.');
        }
      })
      .catch((e) => {
        const res = e.response.data;
        if (res.errorStatus === 'DUPLICATE_PHONENUMBER') {
          alert('이미 가입된 핸드폰 번호입니다.');
        } else {
          alert('알 수 없는 오류, 계속되는 경우 관리자한테 문의하세요.');
        }
      });
  };

  const checkDuplicateEmailAndSendEmailVerification = async () => {
    axiosWrite
      .get(`members/email/${inputData.email}`)
      .then((response) => {
        const res = response.data;
        if (res.success) {
          setIsChecked((isChecked) => ({ ...isChecked, email: true }));
          alert('사용 가능한 이메일 입니다.');
          setShowDialog(true);
        }
        axiosWrite
          .get(`members/authentication/${inputData.email}`)
          .then((response) => {
            const res = response.data;
            if (res.success) {
              const correctCode = res.data;
              console.log(Code, correctCode);
            }
          })
          .catch((e) => {
            alert('알 수 없는 오류, 계속되는 경우 관리자한테 문의하세요.');
          });
      })
      .catch((e) => {
        const res = e.response.data;
        if (res.errorStatus === 'DUPLICATE_EMAIL') {
          alert('이미 가입된 이메일입니다.');
        } else {
          alert('알 수 없는 오류, 계속되는 경우 관리자한테 문의하세요.');
        }
      });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // 성공
    // setUserInfo({
    //   nickname: inputData.nickname,
    //   phone: inputData.phone,
    //   email: inputData.email,
    // });
    // navigate('/');
  };

  const renderForm = (
    <Box>
      <BasicAlert
        open={openAlert}
        handleClose={closeAlert}
        severity={severity}
        message={message}
      />

      <Grid container spacing={1} sx={{ mb: 3 }}>
        <Grid item xs={8}>
          <TextField
            fullWidth
            name="nickname"
            label="닉네임"
            onChange={handleNicknameChange}
            error={!isValid.nickname && inputData.nickname !== ''}
            helperText={
              !isValid.nickname && inputData.nickname !== ''
                ? `· 한글 5-12자 이내\n· !, @, #, $, %, & 허용`
                : ''
            }
            FormHelperTextProps={{ style: { whiteSpace: 'pre-wrap' } }}
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
            title="전화번호에 숫자만 써주세요."
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

      <Grid container spacing={1} sx={{ mb: 3 }}>
        <Grid item xs={8}>
          <TextField
            fullWidth
            name="email"
            label="이메일"
            disabled={!showEmail}
            onChange={handleEmailChange}
            error={!isValid.email && inputData.email !== ''}
            helperText={
              !isValid.email && inputData.email !== ''
                ? '유효한 이메일을 입력하세요.'
                : ''
            }
          />
        </Grid>
        <Grid item xs={4}>
          <Button
            fullWidth
            size="large"
            variant="contained"
            color="inherit"
            disabled={!isValid.email || !showEmail}
            onClick={checkDuplicateEmailAndSendEmailVerification}
          >
            인증
          </Button>
          <VerifyDialog
            open={showDialog}
            close={handleDialogClose}
            email={inputData.email}
            showEmail={handleEmailClose}
          />
        </Grid>
      </Grid>

      <Stack spacing={3} sx={{ my: 3 }}>
        <TextField
          name="password"
          label="비밀번호"
          type={showPassword ? 'text' : 'password'}
          onChange={handlePasswordChange}
          error={!isValid.password && inputData.password !== ''}
          helperText={
            !isValid.password && inputData.password !== ''
              ? '· 6-12자 이내\n· 숫자, 알파벳 대소문자, 특수문자 최소 1개 포함'
              : ''
          }
          FormHelperTextProps={{ style: { whiteSpace: 'pre-wrap' } }}
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
          value={inputData.confirmPassword}
          onChange={handleConfirmPasswordChange}
          error={!isValid.confirmPassword && inputData.confirmPassword !== ''}
          helperText={
            !isValid.confirmPassword && inputData.confirmPassword !== ''
              ? '입력한 값과 비밀번호가 다릅니다.'
              : ''
          }
          disabled={!isValid.password || inputData.password === ''}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  onClick={handleClickShowConfirmPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                  disabled={!isValid.password || inputData.password === ''}
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
          !isValid.nickname ||
          !isValid.phone ||
          !isValid.email ||
          !isValid.password ||
          !isValid.confirmPassword
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
