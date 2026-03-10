import { useEffect } from "react";
import { createPortal } from "react-dom";
import styled from "styled-components";
import DOMPurify from "dompurify";
import DetailButton from "./DetailButton";

const ModalBg = styled.div`
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #00000060;
  z-index: 1000;
`;
const Modal = styled.div`
  width: 600px;
  height: 476px;
  background-color: var(--white);
  padding: 40px;
  border-radius: 16px;
  box-shadow: 0px 2px 12px 0px #00000014;
`;
const ModalHeader = styled.div`
  display: flex;
  align-items: center;
  margin: 0 0 16px;
  padding: 0 0 19px;
  border-bottom: 1px solid var(--gray-200);
`;
const ProfileImageDiv = styled.div`
  width: 56px;
  height: 56px;
  margin: 0 16px 0 0;
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
const CreatedAt = styled.p`
  margin-left: auto;
  font-size: var(--font-14);
  color: var(--gray-400);
  line-height: 20px;
`;
const Content = styled.div`
  height: 240px;
  padding: 0 20px 0;
  word-break: break-word;
  font-size: var(--font-18);
  color: #5a5a5a;
  line-height: 28px;
  overflow-y: auto;

  & strong {
    font-weight: bold;
  }
  & em {
    font-style: italic;
  }
  & u {
    text-decoration: underline;
  }

  &::-webkit-scrollbar {
    width: 4px;
  }

  &::-webkit-scrollbar-track {
    background: transparent;
  }

  &::-webkit-scrollbar-thumb {
    background: var(--gray-300);
    border-radius: 8px;
  }

  &::-webkit-scrollbar-thumb:hover {
    background: var(--gray-400);
  }
`;
const ButtonDiv = styled.div`
  margin: 24px 0 0;
  text-align: center;
`;
const ConfirmButtonStyle = styled(DetailButton)`
  width: 120px;
  background-color: var(--purple-600);
  padding: 7px 15px;
  border-radius: 6px;
  color: var(--white);
  line-height: 26px;

  &:hover {
    background-color: var(--purple-700);
  }
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

function DetailCardModal({ card, onClose }) {
  const formatted = card.createdAt.slice(0, 10).replace(/-/g, ".");

  // 모달 창이 띄워졌을 때 뒤에 화면 스크롤 방지
  useEffect(() => {
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  return createPortal(
    <ModalBg onClick={onClose}>
      <Modal onClick={(e) => e.stopPropagation()}>
        <ModalHeader>
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
          <CreatedAt>{formatted}</CreatedAt>
        </ModalHeader>
        <Content
          style={{ fontFamily: fontMap[card.font] }}
          dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(card.content) }}
        />
        <ButtonDiv>
          <ConfirmButtonStyle onClick={onClose}>확인</ConfirmButtonStyle>
        </ButtonDiv>
      </Modal>
    </ModalBg>,
    document.getElementById("modal-root"),
  );
}

export default DetailCardModal;
