import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';

const PrivateRoute = ({ children }) => {
  const navigate = useNavigate();

  const [cookies] = useCookies(['accessTokenSFG']);

  const [isAuthenticated, setIsAuthenticated] = useState(null);

  useEffect(() => {
    const authenticate = () => {
      const token = cookies['accessTokenSFG'];
      const isUserAuthenticated = !!token;
      setIsAuthenticated(isUserAuthenticated);
    };
    authenticate();
  }, [cookies]);

  useEffect(() => {
    if (isAuthenticated === false) {
      navigate('/');
    }
  }, [isAuthenticated, navigate]);

  if (isAuthenticated === null) return null;

  return isAuthenticated ? children : null;
};

export default PrivateRoute;
