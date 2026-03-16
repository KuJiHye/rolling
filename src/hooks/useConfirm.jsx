import { useState } from "react";
import DetailConfirmModal from "../pages/detail/DetailConfirmModal";

function useConfirm() {
  const [confirmState, setConfirmState] = useState(null);

  // 기존에 사용하던 window.confirm을 대신해서 사용할 함수
  const confirm = (message) =>
    new Promise((resolve) => {
      setConfirmState({
        message,
        resolve,
      });
    });

  const handleConfirm = () => {
    confirmState?.resolve(true);
    setConfirmState(null);
  };

  const handleCancel = () => {
    confirmState?.resolve(false);
    setConfirmState(null);
  };

  const ConfirmComponent = confirmState ? (
    <DetailConfirmModal
      message={confirmState.message}
      onConfirm={handleConfirm}
      onCancel={handleCancel}
    />
  ) : null;

  return { confirm, ConfirmComponent };
}

export default useConfirm;
