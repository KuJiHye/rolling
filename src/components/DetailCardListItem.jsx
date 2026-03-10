import styled from "styled-components";
import DOMPurify from "dompurify";
import DetailButton from "./DetailButton";
import DeleteIcon from "../assets/deleted-icon.svg";

const Card = styled.div`
  display: flex;
  flex-direction: column;
  padding: 24px;

  & > div {
    margin: 0 0 16px;
  }

  &:hover {
    cursor: pointer;
  }
`;
const CardHeader = styled.div`
  display: flex;
  padding: 0 0 15px;
  border-bottom: 1px solid var(--gray-200);
`;
const ProfileImageDiv = styled.div`
  width: 56px;
  height: 56px;
  margin: 0 14px 0 0;
  border: 1px solid var(--gray-200);
  border-radius: 50%;
  overflow: hidden;
`;
const ProfileImage = styled.img`
  width: 100%;
  height: 100%;
`;
const Sender = styled.h4`
  font-size: var(--font-20);
  line-height: 24px;
`;
const SenderSpan = styled.span`
  font-weight: var(--bold);
`;
const Relationship = styled.p`
  width: 41px;
  background-color: ${({ type }) =>
    relationshipColors[type]?.bg || "var(--gray-100)"};
  margin: 6px 0 0;
  border-radius: 4px;
  font-size: var(--font-14);
  line-height: 20px;
  color: ${({ type }) => relationshipColors[type]?.color || "var(--gray-500)"};
  text-align: center;
`;
const DeleteButtonStyle = styled(DetailButton)`
  width: 40px;
  height: 40px;
  margin-left: auto;
  border-radius: 6px;
  border: 1px solid var(--gray-300);

  &:hover {
    background-color: var(--gray-100);
  }
`;
const Content = styled.div`
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  word-break: break-word;
  font-size: var(--font-18);
  color: var(--gray-600);
  line-height: 28px;
  overflow: hidden;

  & strong {
    font-weight: bold;
  }
  & em {
    font-style: italic;
  }
  & u {
    text-decoration: underline;
  }
`;
const CreatedAt = styled.p`
  margin-top: auto;
  font-size: var(--font-12);
  color: var(--gray-400);
  line-height: 18px;
`;

const relationshipColors = {
  친구: {
    bg: `var(--blue-100)`,
    color: `var(--blue-500)`,
  },
  지인: {
    bg: `var(--beige-100)`,
    color: `var(--beige-500)`,
  },
  동료: {
    bg: `var(--purple-100)`,
    color: `var(--purple-500)`,
  },
  가족: {
    bg: `var(--green-100)`,
    color: `var(--green-500)`,
  },
};

const fontMap = {
  "Noto Sans": "Noto Sans KR",
  Pretendard: "Pretendard",
  나눔명조: "Nanum Myeongjo",
  "나눔손글씨 손편지체": "Nanum Pen Script",
};

function DetailCardListItem({ card, editMode, onDelete, onClick }) {
  const formatted = card.createdAt.slice(0, 10).replace(/-/g, "."); // 날짜 형식 변경

  return (
    <Card onClick={onClick}>
      <CardHeader>
        <ProfileImageDiv>
          <ProfileImage src={card.profileImageURL} />
        </ProfileImageDiv>
        <div>
          <Sender>
            From. <SenderSpan>{card.sender}</SenderSpan>
          </Sender>
          <Relationship type={card.relationship}>
            {card.relationship}
          </Relationship>
        </div>
        {editMode && (
          <DeleteButtonStyle
            onClick={(e) => {
              e.stopPropagation();
              onDelete(card.id);
            }}
          >
            <img src={DeleteIcon} alt="메세지 삭제하기 버튼" />
          </DeleteButtonStyle>
        )}
      </CardHeader>
      <Content
        style={{ fontFamily: fontMap[card.font] }}
        dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(card.content) }}
      />
      <CreatedAt>{formatted}</CreatedAt>
    </Card>
  );
}

export default DetailCardListItem;
