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

export default function verifyDialog({ open, close, showEmail, resCode }) {
  const [userInfo, setUserInfo] = useRecoilState(userInfoState);
  const [code, setCode] = useState('');

  const handleCodeChange = (event) => {
    setCode(event.target.value);
  };

  const verifyEmailCode = async (resCode, code, showEmail) => {
    if (resCode === code) {
      showEmail();
      alert("본인 인증에 성공했습니다.")
      close();
    } else {
      alert('인증코드가 올바르지 않습니다.');
    }
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
          <Button onClick={() => verifyEmailCode(resCode, code, showEmail)}>
            확인
          </Button>
        </DialogActions>
      </Box>
    </Dialog>
  );
}
