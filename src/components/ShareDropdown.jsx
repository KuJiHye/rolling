import { useState } from 'react';
import KakaoShareButton from './KakaoShareButton';
import UrlShareButton from './UrlShareButton';
import shareIcon from '../assets/share.svg';

const ShareDropdown = () => {
  const [isOpen, setIsOpen] = useState(false); 
  const [showToast, setShowToast] = useState(false); 
  

  const handleCopySuccess = () => {
    setShowToast(true);

    setTimeout(() => setShowToast(false), 5000);
  };

  return (
    <div style={{ position: 'relative' }}>
      <button onClick={() => setIsOpen(!isOpen)} type="button">
        <img src={shareIcon} alt="공유하기" />
      </button>

      {isOpen && (
        <div className="dropdown-menu">
          <KakaoShareButton onClose={() => setIsOpen(false)} />
          <UrlShareButton 
            onCopySuccess={handleCopySuccess} 
            onClose={() => setIsOpen(false)} 
          />
        </div>
      )}

      {showToast && <div>URL이 복사되었습니다.</div>}
    </div>
  );
};

export default ShareDropdown;