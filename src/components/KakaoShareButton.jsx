import React, { useEffect } from 'react';

const KakaoShareButton = ({ onClose }) => {
  useEffect(() => {
    if (window.Kakao) {
      const kakao = window.Kakao;
      if (!kakao.isInitialized()) {
        kakao.init('fc2a5198027a4e4488c14744921cf307'); 
      }
    }
  }, []);

  const handleShare = () => {
    if (window.Kakao) {
      window.Kakao.Share.sendDefault({
        objectType: 'feed',
        content: {
          title: '임시 제목', 
          description: '임시 설명',
          imageUrl: '임시', // 공유 시 보여줄 이미지 주소
          link: {
            mobileWebUrl: window.location.href, 
            webUrl: window.location.href,
          },
        },
        buttons: [
          {
            title: '메시지 쓰러 가기',
            link: {
              mobileWebUrl: window.location.href,
              webUrl: window.location.href,
            },
          },
        ],
      });
    }

    onClose(); 
  };

  return (
    <button onClick={handleShare}>카카오톡 공유</button>
  );
};

export default KakaoShareButton;