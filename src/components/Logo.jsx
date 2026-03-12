import { useNavigate } from 'react-router-dom';
import MainLogo from '../assets/Logo.svg';

const Logo = () => {
  const navigate = useNavigate();

  const handleMainPageNavigate = () => {
    navigate('/');
  };

  return (
    <img 
      src={MainLogo} 
      alt="로고" 
      onClick={handleMainPageNavigate}
    />
  );
};

export default Logo; 