import { useEffect } from 'react';

const useKakaoShare = () => {
  useEffect(() => {
    if (window.Kakao && !window.Kakao.isInitialized()) {
      window.Kakao.init('fc2a5198027a4e4488c14744921cf307');
    }
  }, []);

  const handleShare = (shareConfig) => {
    if (!window.Kakao || !window.Kakao.isInitialized()) return;

    window.Kakao.Share.sendDefault({
      objectType: 'feed',
      content: {
        title: shareConfig?.title || '',
        description: shareConfig?.description || '',
        imageUrl: shareConfig?.imageUrl || '',
        link: {
          mobileWebUrl: window.location.href,
          webUrl: window.location.href,
        },
      },
      buttons: [
        {
          title: '보러 가기',
          link: {
            mobileWebUrl: window.location.href,
            webUrl: window.location.href,
          },
        },
      ],
    });
  };

  return { handleShare };
};

export default useKakaoShare;