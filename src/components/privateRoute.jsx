import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { axiosAuth } from '../apis';

const PrivateRoute = ({ children }) => {
  const navigate = useNavigate();

  const [isAuthenticated, setIsAuthenticated] = useState(null);

  useEffect(() => {
    const authenticate = async () => {
      const token = document.cookie
        .split('; ')
        .find((row) => row.startsWith('accessTokenSFG'));

      if (!token) {
        setIsAuthenticated(false);
        return;
      }

      axiosAuth
        .post(``, { token }, { withCredentials: true })
        .then((response) => {
          const res = response.data;
          if (res.success) {
            setIsAuthenticated(true);
          } else {
            setIsAuthenticated(false);
            alert('비정상적인 접근입니다. 다시 로그인해주세요!');
          }
        })
        .catch((err) => {
          setIsAuthenticated(false);
          alert(
            '로그인 상태 확인 중 에러가 발생했습니다. 다시 로그인해주세요!'
          );
        });
    };
    authenticate();
  }, []);

  useEffect(() => {
    if (isAuthenticated === false) {
      navigate('/');
    }
  }, [isAuthenticated, navigate]);

  if (isAuthenticated === null) return null;

  return isAuthenticated ? children : null;
};

export default PrivateRoute;
