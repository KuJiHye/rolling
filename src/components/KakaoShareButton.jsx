import React from 'react';

const KakaoShareButton = ({ onClose }) => {
  const handleShare = () => {
    onClose(); 
  };

  return (
    <button onClick={handleShare}>카카오톡 공유</button>
  );
};

export default KakaoShareButton;