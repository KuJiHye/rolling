import DOMPurify from "dompurify";
import DetailButton from "./DetailButton";

const fontMap = {
  "Noto Sans": "Noto Sans KR",
  Pretendard: "Pretendard",
  나눔명조: "Nanum Myeongjo",
  "나눔손글씨 손편지체": "Nanum Pen Script",
};

function DetailCardListItem({ card, editMode, onDelete, onClick }) {
  const formatted = card.createdAt.slice(0, 10).replace(/-/g, "."); // 날짜 형식 변경
  return (
    <div onClick={onClick}>
      {editMode && (
        <DetailButton
          onClick={(e) => {
            e.stopPropagation();
            onDelete(card.id);
          }}
        >
          휴지통
        </DetailButton>
      )}

      <div>
        <img src={card.profileImageURL} />
        <div>
          <h4>
            From. <span>{card.sender}</span>
          </h4>
          <p>{card.relationship}</p>
        </div>
      </div>
      <div
        style={{ fontFamily: fontMap[card.font] }}
        dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(card.content) }}
      />
      <p>{formatted}</p>
    </div>
  );
}

export default DetailCardListItem;
