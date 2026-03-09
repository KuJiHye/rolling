import MessageCount from "./messageCount";
import EmojiReaction from "./EmojiReaction";
import ShareDropdown from "./ShareDropdown";
import styled from "styled-components";

const DetailHeaderDiv = styled.div`
  display: flex;
  align-items: center;
  max-width: 1200px;
  margin: 0 auto;
  padding: 13px 0;
`;
const NameH1 = styled.h1`
  margin-right: auto;
  font-size: var(--font-28);
  font-weight: var(--bold);
  color: var(--gray-800);
`;
const CardInfo = styled.h1`
  display: flex;
`;

function DetailHeader({ card }) {
  if (!card) return null;

  return (
    <DetailHeaderDiv>
      <NameH1>To. {card.name}</NameH1>
      <CardInfo>
        <MessageCount card={card} />
        <EmojiReaction recipientId={card.id} />
        <ShareDropdown postData={card.recipientData} />
      </CardInfo>
    </DetailHeaderDiv>
  );
}

export default DetailHeader;
