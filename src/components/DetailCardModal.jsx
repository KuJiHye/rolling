import { createPortal } from "react-dom";
import DetailButton from "./DetailButton";

function DetailCardModal({ card, onClose }) {
  const formatted = card.createdAt.slice(0, 10).replace(/-/g, ".");

  return createPortal(
    <div onClick={onClose}>
      <div onClick={(e) => e.stopPropagation()}>
        <div>
          <img src={card.profileImageURL} />
          <div>
            <h4>
              From. <span>{card.sender}</span>
            </h4>
            <p>{card.relationship}</p>
          </div>
          <p>{formatted}</p>
        </div>
        <p>{card.content}</p>
        <DetailButton onClick={onClose}>확인</DetailButton>
      </div>
    </div>,
    document.getElementById("modal-root")
  );
}

export default DetailCardModal;
