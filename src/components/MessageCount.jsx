function MessageCount({ card }) {
  const maxCount = 3;
  const visibleCount = card.recentMessages.slice(0, maxCount);
  const remainingCount = card.messageCount - maxCount;

  return (
    <div>
      <ul>
        {visibleCount.map((card) => (
          <li key={card.id}>
            <img src={card.profileImageURL} />
          </li>
        ))}
        {remainingCount > 0 && <li>+{remainingCount}</li>}
      </ul>
      <p>
        <span>{card.messageCount}</span>명이 작성했어요!
      </p>
    </div>
  );
}

export default MessageCount;
