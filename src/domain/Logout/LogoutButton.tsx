import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import {postSignOut} from "../Api/auth";

const LogoutButton = () => {
  const navigate = useNavigate();

  const handleClick = React.useCallback(() => {
    localStorage.removeItem('authToken');
    postSignOut()
    navigate('/login');
  }, [navigate]);

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
