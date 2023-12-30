import { useState, forwardRef } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';

import Box from '@mui/material/Box';
import Slide from '@mui/material/Slide';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import TextField from '@mui/material/TextField';
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';

import { userInfoState, isValidState, showEmailState } from '../../recoil/atoms';

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function FormDialog() {
  const [open, setOpen] = useState(false);
  const [code, setCode] = useState('');
  const [showEmail, setShowEmail] = useRecoilState(showEmailState);
  const userInfo = useRecoilValue(userInfoState);
  const isValid = useRecoilValue(isValidState);

  const handleDialogOpen = () => setOpen(true);
  const handleDialogClose = () => setOpen(false);

  const handleCodeChange = (event) => {
    setCode(event.target.value);
  };

  const sendEmailVerification = async (email) => {
    // 중복확인
    // checkDuplicate(email);

    // 이메일로 인증번호 전송

    handleDialogOpen();
  };

  const verifyEmailCode = async (email, code) => {
    console.log(code);
    setShowEmail(false);
    handleDialogClose();
  };

  // const sendEmailVerification = async (email) => {
  //   try {
  //     const res = await axios.post(
  //       // api,
  //       { email: email },
  //       { headers: { 'Content-Type': 'application/json' } }
  //     );

  //     if (res.data.success) {
  //       setShowEmail(false);
  //       handleDialogOpen();
  //     }
  //   } catch (error) {
  //     console.error(`이메일 인증 번호 전송 중 에러가 발생했습니다: `, error);
  //   }
  // };

  // const verifyEmailCode = async (email, code) => {
  //   try {
  //     const res = await axios.post(
  //       // api,
  //       { email: email, code: code },
  //       { headers: { 'Content-Type': 'application/json' } }
  //     );
  //     if (res.data.success) {
  //       alert("이메일이 성공적으로 인증되었습니다.");
  //     } else {
  //       alert("인증 번호가 일치하지 않습니다.");
  //     }
  //   } catch (error) {
  //     console.error(`이메일 인증 중 에러가 발생했습니다: `, error);
  //   }
  // };

  return (
    <>
      <Button
        fullWidth
        size="large"
        variant="contained"
        color="inherit"
        disabled={!isValid.email || !showEmail}
        onClick={() => sendEmailVerification(userInfo.email)}>
        인증
      </Button>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        onClose={handleDialogClose}>
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
            <Button onClick={handleDialogClose}>취소</Button>
            <Button onClick={() => verifyEmailCode(userInfo.email, code)}>확인</Button>
          </DialogActions>
        </Box>
      </Dialog >
    </>
  );
}