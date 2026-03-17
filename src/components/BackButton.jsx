import { useNavigate, useLocation } from "react-router-dom";
import styled from "styled-components";
import BackIcon from "../assets/back-icon.svg";

function BackButton() {
  const navigate = useNavigate();
  const location = useLocation();

  // 메인 페이지에서 가리기
  if (location.pathname === "/") return null;

  return (
    <>
      <StyledBackButton onClick={() => navigate(-1)}>
        <img src={BackIcon} alt="뒤로가기 버튼" />
      </StyledBackButton>
    </>
  );
}

const StyledBackButton = styled.button`
  position: fixed;
  right: 20px;
  bottom: 20px;
  width: 56px;
  height: 56px;
  background-color: var(--purple-600);
  border-radius: 50%;
  z-index: 1000;

  &:hover {
    background-color: var(--purple-700);
  }

  @media ${({ theme }) => theme.tablet} {
    top: 13px;
    bottom: 0;
    width: 36px;
    height: 36px;

    & > img {
      width: 20px;
    }
  }

  @media ${({ theme }) => theme.mobile} {
  }
`;

export default BackButton;
