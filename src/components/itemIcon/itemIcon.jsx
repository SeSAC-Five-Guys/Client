import PropTypes from 'prop-types';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { useNavigate } from 'react-router-dom';
import { axiosAuth } from '../../apis';
import { useCookies } from 'react-cookie';

export default function ItemIcon({ title, param, icon }) {
  const navigate = useNavigate();
  const [, , removeCookie] = useCookies(['accessTokenSFG']);

  const handleLink = async () => {
    axiosAuth
      .get(`authorization/all/member`, { withCredentials: true })
      .then((response) => {
        const res = response.data;
        if (res.data.role === '0') {
          window.location.href = `${process.env.REACT_APP_AUTH_SERVER_HOST}authorization/admin/${param}`;
        } else {
          alert('접근 권한이 없습니다.');
          removeCookie('accessTokenSFG')
          navigate("/")
        }
      })
      .catch(() => {
        alert('알 수 없는 오류, 계속되는 경우 관리자에게 문의하세요.');
        removeCookie('accessTokenSFG')
        navigate("/")
      });
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
