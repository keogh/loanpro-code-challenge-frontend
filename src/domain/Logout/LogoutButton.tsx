import * as React from 'react';
import { useNavigate } from 'react-router-dom';

const LogoutButton = () => {
  const navigate = useNavigate();

  const handleClick = React.useCallback(() => {
    localStorage.removeItem('authToken');
    navigate('/login');
  }, []);

  return (
    <button
      className="text-sm font-semibold leading-6 text-gray-900"
      onClick={handleClick}
    >
      Log out
    </button>
  );
};

export default LogoutButton;
