import MessageCount from "./messageCount";
import EmojiReaction from "./EmojiReaction";
import ShareDropdown from "./ShareDropdown";

function DetailHeader({ card }) {
  if (!card) return null;

  return (
    <div>
      <h1>To. {card.name}</h1>
      <MessageCount card={card} />
      <EmojiReaction recipientId={card.id} />
      <ShareDropdown postData={card.recipientData} />
    </div>
  );
}

export default DetailHeader;
