import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const CardWrapper = styled.div`
  cursor: pointer;
`;

function RollingPaperCard({ list }) {
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate(`/post/${list.id}`);
  };

  return (
    <CardWrapper onClick={handleCardClick}>
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
    </CardWrapper>
  );
}

export default RollingPaperCard;
