import styled from "styled-components";
import DOMPurify from "dompurify";
import DetailButton from "./DetailButton";
import DeleteIcon from "../../assets/deleted-icon.svg";
import ContentWrapper from "../../components/ContentWrapper";
import { relationshipColors } from "../../constants/relationshipColors";
import { fontMap } from "../../constants/fontMap";

function DetailCardListItem({ card, editMode, onDelete, onClick }) {
  const formatted = card.createdAt.slice(0, 10).replace(/-/g, "."); // 날짜 형식 변경

  return (
    <StyledCard onClick={onClick}>
      <StyledCardHeader>
        <StyledAvatarWrapper>
          <StyledAvatar src={card.profileImageURL} />
        </StyledAvatarWrapper>

        <div>
          <StyledSenderText>
            From. <StyledSenderName>{card.sender}</StyledSenderName>
          </StyledSenderText>
          <StyledRelationship type={card.relationship}>
            {card.relationship}
          </StyledRelationship>
        </div>

        {editMode && (
          <StyledDetailButton
            onClick={(e) => {
              e.stopPropagation();
              onDelete(card.id);
            }}
          >
            <img src={DeleteIcon} alt="메세지 삭제하기 버튼" />
          </StyledDetailButton>
        )}
      </StyledCardHeader>

      <StyledContent
        style={{ fontFamily: fontMap[card.font] }}
        dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(card.content) }}
      />

      <StyledCreatedAt>{formatted}</StyledCreatedAt>
    </StyledCard>
  );
}

export default DetailCardListItem;

/* ==================== styled ==================== */
const StyledCard = styled.div`
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

const StyledCardHeader = styled.div`
  display: flex;
  padding: 0 0 15px;
  border-bottom: 1px solid var(--gray-200);
`;

export const StyledAvatarWrapper = styled.div`
  width: 56px;
  height: 56px;
  margin: 0 14px 0 0;
  border: 1px solid var(--gray-200);
  border-radius: 50%;
  overflow: hidden;
`;

export const StyledAvatar = styled.img`
  width: 100%;
  height: 100%;
`;

export const StyledSenderText = styled.h4`
  font: var(--font-20-regular);

  @media ${({ theme }) => theme.mobile} {
    font: var(--font-18-regular);
  }
`;

export const StyledSenderName = styled.span`
  font: var(--font-20-bold);

  @media ${({ theme }) => theme.mobile} {
    font: var(--font-18-bold);
  }
`;

export const StyledRelationship = styled.p`
  width: 41px;
  background-color: ${({ type }) =>
    relationshipColors[type]?.bg || "var(--gray-100)"};
  margin: 6px 0 0;
  border-radius: 4px;
  font: var(--font-14-regular);
  color: ${({ type }) => relationshipColors[type]?.color || "var(--gray-500)"};
  text-align: center;
`;

const StyledDetailButton = styled(DetailButton)`
  width: 40px;
  height: 40px;
  margin-left: auto;
  border-radius: 6px;
  border: 1px solid var(--gray-300);

  &:hover {
    background-color: var(--gray-100);
  }
`;

const StyledContent = styled(ContentWrapper)`
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  word-break: break-word;
  font: var(--font-18-regular);
  color: var(--gray-600);
  overflow: hidden;

  @media ${({ theme }) => theme.mobile} {
    -webkit-line-clamp: 2;
    font: var(--font-15-regular);
  }
`;

const StyledCreatedAt = styled.p`
  margin-top: auto;
  font: var(--font-12-regular);
  color: var(--gray-400);
`;
