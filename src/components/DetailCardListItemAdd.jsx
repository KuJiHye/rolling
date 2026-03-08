import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import DetailButton from "./DetailButton";
import AddIcon from "../assets/plus-icon.svg";

const AddButtonDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;
const AddButtonStyle = styled(DetailButton)`
  width: 56px;
  height: 56px;
  background-color: var(--gray-500);
  border-radius: 50%;

  &:hover {
    background-color: var(--gray-600);
  }
`;

function DetailCardListItemAdd({ id }) {
  const navigate = useNavigate();

  const handleAddCard = () => {
    navigate(`/post/${id}/message`);
  };

  return (
    <AddButtonDiv>
      <AddButtonStyle onClick={handleAddCard}>
        <img src={AddIcon} alt="메세지 추가하기 버튼" />
      </AddButtonStyle>
    </AddButtonDiv>
  );
}

export default DetailCardListItemAdd;
