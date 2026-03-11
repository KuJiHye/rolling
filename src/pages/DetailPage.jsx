import { useState, useEffect } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import DetailCardList from "../components/DetailCardList";
import DetailButton from "../components/DetailButton";
import DetailHeader from "../components/DetailHeader";
import useConfirm from "../hooks/useConfirm";
import { colorMatching } from "../constants/colorMatching";
import axios from "../api/axios";

function DetailPage() {
  const { id } = useParams();
  const [background, setBackground] = useState({
    type: "color",
    value: "#FFFFFF",
  });
  const navigate = useNavigate();
  const location = useLocation();
  const editMode = location.pathname.includes("/edit");
  const [cards, setCards] = useState(null);
  const { confirm, ConfirmComponent } = useConfirm();

  useEffect(() => {
    const backgroundData = async () => {
      try {
        const response = await axios.get(`recipients/${id}/`);
        const data = response.data;

        setCards(data);

        if (data.backgroundImageURL) {
          setBackground({
            type: "image",
            value: data.backgroundImageURL,
          });
        } else {
          setBackground({
            type: "color",
            value: colorMatching[data.backgroundColor],
          });
        }
      } catch (error) {
        console.error(error);
      }
    };

    backgroundData();
  }, [id]);

  // 페이지 삭제
  const handleDeletePage = async () => {
    const confirmDelete = await confirm("롤링페이퍼를 정말 삭제하시겠습니까?");

    if (!confirmDelete) return;

    try {
      await axios.delete(`recipients/${id}/`);
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
              <DetailButton className="btn btn-gray" onClick={handleDeletePage}>
                롤링페이퍼 삭제하기
              </DetailButton>
            )}

            <DetailButton className="btn btn-purple" onClick={handleEditToggle}>
              {editMode ? "편집완료" : "편집하기"}
            </DetailButton>
          </StyledButtonGroup>

          <DetailCardList editMode={editMode} />
        </StyledContainer>
      </StyledBackground>

      {ConfirmComponent}
    </>
  );
}

export default DetailPage;

/* ==================== styled ==================== */

const StyledBackground = styled.div`
  min-height: calc(100vh - 132.5px);
  background-size: cover;
  background-position: center;

  ${({ $background }) =>
    $background.type === "color"
      ? `background-color: ${$background.value};`
      : `background-image: 
          linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), 
          url(${$background.value});
  `}
`;

const StyledContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 60px 0 110px;
`;

const StyledButtonGroup = styled.div`
  display: flex;
  justify-content: right;
  gap: 5px;
  margin: 0 0 12px;
`;
