import { useState, forwardRef } from 'react';
import { useRecoilState } from 'recoil';

import Box from '@mui/material/Box';
import Slide from '@mui/material/Slide';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import TextField from '@mui/material/TextField';
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';

import { axiosWrite } from '../../apis';
import { userInfoState } from '../../recoil/atoms';

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function verifyDialog({ open, close, email, showEmail }) {
  const [userInfo, setUserInfo] = useRecoilState(userInfoState);
  const [code, setCode] = useState('');

  const handleCodeChange = (event) => {
    setCode(event.target.value);
  };

  const verifyEmailCode = async (email, code) => {
    console.log(code);
    showEmail();
    close();

    // axiosWrite
    //   .get(``, { email: email, code: code })
    //   .then((response) => {
    //     const res = response.data;
    //     if (res.success) {
    //       setUserInfo((userInfo) => ({
    //         ...userInfo,
    //         email: email,
    //       }));
    //       // 이메일 변경 금지
    //       showEmail();
    //       // dialog 닫기
    //       close();
    //     } else {
    //       alert('올바르지 않은 인증 번호입니다.');
    //     }
    //   })
    //   .catch((err) => {
    //     console.error(`이메일 인증 번호 확인 중 에러가 발생했습니다: `, err);
    //   });
  };

  return (
    <Dialog open={open} TransitionComponent={Transition} onClose={close}>
      <Box sx={{ mx: 2, my: 2 }}>
        <DialogTitle variant="h4">✅ 인증번호</DialogTitle>
        <DialogContent>
          <DialogContentText>
            입력하신 이메일 주소로 인증번호가 발송되었습니다. <br />
            인증번호를 입력해주세요.
          </DialogContentText>
          <TextField
            fullWidth
            autoFocus
            margin="normal"
            variant="standard"
            onChange={handleCodeChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={close}>취소</Button>
          <Button onClick={() => verifyEmailCode(email, code, showEmail)}>
            확인
          </Button>
        </DialogActions>
      </Box>
    </Dialog>
  );
}
