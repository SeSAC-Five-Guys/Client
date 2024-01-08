import { useState, useEffect } from 'react';
import { useCookies } from 'react-cookie';
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
import { useTheme } from '@mui/material/styles';

import BasicAlert from '../../components/basicAlert';

import { userInfoState } from '../../recoil/atoms';
import { axiosAuth, axiosWrite } from '../../apis';

export default function Modify() {
  const navigate = useNavigate();
  const theme = useTheme();
  const [openAlert, setOpenAlert] = useState(false);
  const [severity, setSeverity] = useState('info');
  const [message, setMessage] = useState('');
  const [, , removeCookie] = useCookies(['accessTokenSFG']);
  const [userInfo, setUserInfo] = useRecoilState(userInfoState);
  const [inputData, setInputData] = useState({ nickname: '', phone: '' });
  const [isValid, setIsValid] = useState({ nickname: false, phone: false });
  const [isChecked, setIsChecked] = useState({ nickname: false, phone: false });
  const [showTooltip, setShowTooltip] = useState(false);

  

  useEffect(() => {
    axiosAuth
      .get(`authorization/all/member`, { withCredentials: true })
      .catch(() => {
        setOpenAlert(true);
        setSeverity('error');
        setMessage('로그인 정보가 만료 되었습니다.');

        removeCookie('accessTokenSFG');
      });
  }, []);

  const closeAlert = () => setOpenAlert(false);

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

  const checkDuplicateNickname = async () => {
    axiosWrite
      .get(`members/nickname/${userInfo.nickname}/${inputData.nickname}`, {
        withCredentials: true,
      })
      .then((response) => {
        const res = response.data;
        if (res.success) {
          setIsChecked((isChecked) => ({ ...isChecked, nickname: true }));

          setOpenAlert(true);
          setSeverity('success');
          setMessage('변경 가능한 닉네임입니다.');
        }
      })
      .catch((e) => {
        const res = e.response.data;
        if (res.errorStatus == 'DUPLICATE_NICKNAME') {
          setOpenAlert(true);
          setSeverity('warning');
          setMessage('이미 존재하는 닉네임입니다.');
        } else {
          setOpenAlert(true);
          setSeverity('error');
          setMessage('알 수 없는 오류, 계속되는 경우 관리자에게 문의하세요.');
        }
      });
  };

  const checkDuplicatePhone = async () => {
    axiosWrite
      .get(`members/phone_number/${userInfo.phone}/${inputData.phone}`, {
        withCredentials: true,
      })
      .then((response) => {
        const res = response.data;
        if (res.success) {
          setIsChecked((isChecked) => ({ ...isChecked, phone: true }));

          setOpenAlert(true);
          setSeverity('success');
          setMessage('변경 가능한 핸드폰 번호입니다.');
        }
      })
      .catch((e) => {
        const res = e.response.data;
        if (res.errorStatus == 'DUPLICATE_PHONENUMBER') {
          setOpenAlert(true);
          setSeverity('warning');
          setMessage('이미 가입된 핸드폰 번호입니다.');
        } else {
          setOpenAlert(true);
          setSeverity('error');
          setMessage('알 수 없는 오류, 계속되는 경우 관리자에게 문의하세요.');
        }
      });
  };

  const handleQuit = async () => {
    axiosWrite
      .delete(`members/member/${userInfo.email}`, { withCredentials: true })
      .then((response) => {
        const res = response.data;
        if (res.success) {
          axiosAuth
            .delete(`authentication/member`, { withCredentials: true })
            .catch((e) => {
              navigate('/');
            });
          setUserInfo({
            nickname: '',
            phone: '',
            email: '',
            password: '',
          });
          navigate('/');
        }
      })
      .catch((e) => {
        navigate('/');
      });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!isChecked.nickname || !isChecked.phone) {
      setOpenAlert(true);
      setSeverity('info');
      setMessage('중복확인 버튼을 눌러주세요!');
    }

    axiosWrite
      .put(
        `members/member/${userInfo.email}`,
        {
          phoneNumber: inputData.phone,
          nickname: inputData.nickname,
        },
        { withCredentials: true }
      )
      .then((response) => {
        const res = response.data;
        if (res.success) {
          setUserInfo((userInfo) => ({
            ...userInfo,
            nickname: inputData.nickname,
            phone: inputData.phone,
          }));
        }
        setOpenAlert(true);
        setSeverity('success');
        setMessage('회원 정보 변경 완료');

        navigate('/main');
      })
      .catch((e) => {
        setOpenAlert(true);
        setSeverity('error');
        setMessage('이메일 또는 비밀번호를 확인해주세요!');
      });
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
            disabled={!isValid.nickname && inputData.nickname === ''}
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
      <BasicAlert
        open={openAlert}
        handleClose={closeAlert}
        severity={severity}
        message={message}
      />

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
