import { useState, useEffect } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import DetailCardList from "./DetailCardList";
import DetailButton from "./DetailButton";
import DetailHeader from "./DetailHeader";
import useConfirm from "../../hooks/useConfirm";
import { colorMatching } from "../../constants/colorMatching";
import { getDetailRecipients, deleteRecipients } from "../../api/index";

function DetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const editMode = location.pathname.includes("/edit");
  const [cards, setCards] = useState(null);
  const { confirm, ConfirmComponent } = useConfirm();

  const background = cards
    ? cards.backgroundImageURL
      ? {
          type: "image",
          value: cards.backgroundImageURL,
        }
      : {
          type: "color",
          value: colorMatching[cards.backgroundColor],
        }
    : {
        type: "color",
        value: "#FFFFFF",
      };

  const recipientsData = async () => {
    try {
      const data = await getDetailRecipients(id);

      setCards(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    recipientsData();
  }, [id]);

  // 페이지 삭제
  const handleDeletePage = async () => {
    const confirmDelete = await confirm("롤링페이퍼를 정말 삭제하시겠습니까?");

    if (!confirmDelete) return;

    try {
      await deleteRecipients(id);
      navigate("/list");
    } catch (error) {
      console.error(error);
    }
  };

  // 편집하기 / 저장하기 버튼 클릭 시 URL 변경
  const handleEditToggle = () => {
    if (editMode) {
      navigate(`/post/${id}`);
    } else {
      navigate(`/post/${id}/edit`);
    }
  };

  return (
    <>
      <DetailHeader card={cards} />

      <StyledBackground $background={background}>
        <StyledContainer>
          <StyledButtonGroup>
            {editMode && (
              <StyledDetailButton
                className="btn btn-gray"
                onClick={handleDeletePage}
              >
                롤링페이퍼 삭제하기
              </StyledDetailButton>
            )}

            <DetailButton className="btn btn-purple" onClick={handleEditToggle}>
              {editMode ? "편집완료" : "편집하기"}
            </DetailButton>
          </StyledButtonGroup>

          <DetailCardList
            editMode={editMode}
            refreshRecipient={recipientsData}
          />
        </StyledContainer>
      </StyledBackground>

      {ConfirmComponent}
    </>
  );
}

export default DetailPage;

/* ==================== styled ==================== */

const StyledBackground = styled.div`
  min-height: calc(100vh - 130px);
  background-size: cover;
  background-position: center;

  ${({ $background }) =>
    $background.type === "color"
      ? `background-color: ${$background.value};`
      : `background-image: 
          linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), 
          url(${$background.value});
  `}

  @media ${({ theme }) => theme.mobile} {
    min-height: calc(100vh - 166px);
  }
`;

const StyledContainer = styled.div`
  max-width: 1248px;
  margin: 0 auto;
  padding: 60px 24px 110px;

  @media ${({ theme }) => theme.tablet} {
    padding: 50px 24px 122px;
  }

  @media ${({ theme }) => theme.mobile} {
    padding: 30px 20px 122px;
  }
`;

const StyledButtonGroup = styled.div`
  display: flex;
  justify-content: right;
  gap: 5px;
  margin: 0 0 12px;

  @media ${({ theme }) => theme.tablet} {
    position: fixed;
    bottom: 24px;
    left: 0;
    display: block;
    width: 100%;
    padding: 0 24px;
    margin: 0;
  }

  @media ${({ theme }) => theme.mobile} {
    padding: 0 20px;
  }
`;

const StyledDetailButton = styled(DetailButton)`
  @media ${({ theme }) => theme.tablet} {
    margin: 0 0 5px;
  }
`;
