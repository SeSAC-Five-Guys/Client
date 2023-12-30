import { useState } from 'react';

import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import TextField from '@mui/material/TextField';
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';

export default function FormDialog() {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => setOpen(true);

  const handleClose = () => setOpen(false);

  return (
    <>
      <Button
        fullWidth
        size="large"
        variant="contained"
        color="inherit"
        onClick={handleClickOpen}>
        이메일 인증하기
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>🎈 인증번호</DialogTitle>
        <DialogContent>
          <DialogContentText>
            입력하신 이메일 주소로 인증번호가 발송되었습니다. <br />
            3분 이내에 인증번호를 입력해주세요.
          </DialogContentText>
          <TextField
            fullWidth
            autoFocus
            margin="normal"
            variant="standard"
          />
          <Button></Button>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>취소</Button>
          <Button onClick={handleClose}>확인</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}