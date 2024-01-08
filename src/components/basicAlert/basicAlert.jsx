import Fade from '@mui/material/Fade';
import Alert from '@mui/material/Alert';
import Dialog from '@mui/material/Dialog';

function BasicAlert({ open, handleClose, severity, message }) {
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      TransitionComponent={Fade}
      sx={{ height: '200px' }}
    >
      <Alert
        severity={severity}
        onClose={handleClose}
        sx={{ width: 500, height: 80, alignItems: 'center' }}
      >
        {message}
      </Alert>
    </Dialog>
  );
}

export default BasicAlert;
