import { useState, useEffect } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import DetailCardList from "../components/DetailCardList";
import DetailButton from "../components/DetailButton";
import DetailHeader from "../components/DetailHeader";
import axios from "../api/axios";

const BackgroundDiv = styled.div`
  background-size: cover;
  background-position: center;

  ${({ background }) =>
    background.type === "color"
      ? `background-color: ${background.value};`
      : `background-image: url(${background.value});`}
`;
const DetailBodyDiv = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 60px 0 110px;
`;
const ButtonDiv = styled.div`
  margin: 0 0 12px;
  text-align: right;
`;
const EditButtonStyle = styled(DetailButton)`
  background-color: var(--purple-600);
  padding: 7px 17px;
  border-radius: 6px;
  color: var(--white);
  line-height: 26px;

  &:hover {
    background-color: var(--purple-700);
  }
`;
const DeleteButtonStyle = styled(DetailButton)`
  background-color: var(--gray-600);
  margin: 0 5px 0 0;
  padding: 7px 17px;
  border-radius: 6px;
  color: var(--white);
  line-height: 26px;

  &:hover {
    background-color: var(--gray-700);
  }
`;

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
            value: data.backgroundColor,
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
    const confirmDelete = window.confirm("롤링페이퍼를 정말 삭제하시겠습니까?");

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

      <BackgroundDiv background={background}>
        <DetailBodyDiv>
          <ButtonDiv>
            {editMode && (
              <DeleteButtonStyle onClick={handleDeletePage}>
                롤링페이퍼 삭제하기
              </DeleteButtonStyle>
            )}

            <EditButtonStyle onClick={handleEditToggle}>
              {editMode ? "돌아가기" : "편집하기"}
            </EditButtonStyle>
          </ButtonDiv>

          <DetailCardList editMode={editMode} />
        </DetailBodyDiv>
      </BackgroundDiv>
    </>
  );
}

export default DetailPage;
