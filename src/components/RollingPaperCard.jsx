function RollingPaperCard({ list }) {
  return (
    <div>
      <h2>{list.name}</h2>
      <span>{list.messageCount}</span>
      <ul>
        {list.recentMessages.map((message) => (
          <li key={message.id}>
            <img src={message.profileImageURL}></img>
          </li>
        ))}
      </ul>
      <ul>
        {list.topReactions.map((reaction) => (
          <li key={reaction.id}>
            {reaction.emoji}
            {reaction.count}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default RollingPaperCard;
