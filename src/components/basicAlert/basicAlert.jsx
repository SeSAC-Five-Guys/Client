import Fade from '@mui/material/Fade';
import Alert from '@mui/material/Alert';
import Dialog from '@mui/material/Dialog';
import AlertTitle from '@mui/material/AlertTitle';
import Typography from '@mui/material/Typography';

function BasicAlert({ open, handleClose, severity, message }) {
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      TransitionComponent={Fade}
      sx={{ height: '50%' }}
    >
      <Alert
        severity={severity}
        onClose={handleClose}
        sx={{ width: 500, height: 80, alignItems: 'center' }}
      >
        <AlertTitle>
          <Typography component="div" fontWeight="bold">
            {severity.toUpperCase()}
          </Typography>
        </AlertTitle>
        {message}
      </Alert>
    </Dialog>
  );
}

export default BasicAlert;
