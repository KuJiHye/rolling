import useKakaoShare from '../hooks/useShare'; 

const KakaoShareButton = ({ onClose }) => {
  const { handleShare } = useKakaoShare();

  const onClick = () => {
    handleShare({
      title: '롤링',
      description: '임시 설명',
    });
    onClose();
  };

  return <button onClick={onClick}>카카오톡 공유</button>;
};

export default KakaoShareButton;