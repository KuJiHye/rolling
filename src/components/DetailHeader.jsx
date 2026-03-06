import MessageCount from "./messageCount";

function DetailHeader({ card }) {
  if (!card) return null;

  return (
    <div>
      <h1>To. {card.name}</h1>
      <MessageCount card={card} />

      {/* 이모지 컴포넌트 */}
      {/* 공유 컴포넌트 */}
    </div>
  );
}

export default DetailHeader;
