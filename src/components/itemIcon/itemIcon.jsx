import PropTypes from 'prop-types';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

export default function ItemIcon({ title, icon }) {
  const handleLink = (event) => {
    console.log('이현범바보');
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
  sx: PropTypes.object,
};
