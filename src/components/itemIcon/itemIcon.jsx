import PropTypes from 'prop-types';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

export default function ItemIcon({ title, param, icon }) {
  const handleLink = async () => {
    window.location.href = `${process.env.REACT_APP_AUTH_SERVER_HOST}authorization/admin/${param}`;
  };

  return (
    <Link underline="none" onClick={handleLink}>
      <Card
        component={Stack}
        spacing={3}
        direction="row"
        alignItems="center"
        sx={{
          px: 3,
          py: 5,
          borderRadius: 2,
          cursor: 'pointer',
        }}
      >
        {icon && <Box sx={{ width: 64, height: 64 }}>{icon}</Box>}
        <Typography variant="h5">{title}</Typography>
      </Card>
    </Link>
  );
}

ItemIcon.propTypes = {
  title: PropTypes.string,
  icon: PropTypes.oneOfType([PropTypes.element, PropTypes.string]),
};
