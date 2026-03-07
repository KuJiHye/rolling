const UrlShareButton = ({ onCopySuccess, onClose }) => {
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      onCopySuccess(); 
      onClose(); 
    } catch (err) {
      console.error('URL 복사 실패:', err);
    }
  };

  return (
    <button onClick={handleCopy} type="button" className="dropdown-item">
      URL 공유
    </button>
  );
};

export default UrlShareButton;