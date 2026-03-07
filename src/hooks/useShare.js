import { useEffect } from 'react';

const useKakaoShare = () => {
  useEffect(() => {
    if (window.Kakao && !window.Kakao.isInitialized()) {
      window.Kakao.init('fc2a5198027a4e4488c14744921cf307');
    }
  }, []);

// 카카오톡 공유 실행 함수
const handleShare = () => {
    if (!window.Kakao || !window.Kakao.isInitialized()) return;

    window.Kakao.Share.sendDefault({
      objectType: 'feed',
      content: {
        title: '', // 어떤 메시지를 보낼지는 비워둠
        description: '', 
        imageUrl: '', 
        link: {
          mobileWebUrl: window.location.href,
          webUrl: window.location.href,
        },
      },
    });
  };

  return { handleShare };
};

export default useKakaoShare;