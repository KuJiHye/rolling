import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import DetailButton from "./DetailButton";
import AddIcon from "../../assets/plus-icon.svg";

function DetailCardListItemAdd({ id }) {
  const navigate = useNavigate();

  const handleAddCard = () => {
    navigate(`/post/${id}/message`);
  };

  return (
    <AddButtonDiv>
      <StyledDetailButton className="btn-gray" onClick={handleAddCard}>
        <img src={AddIcon} alt="메세지 추가하기 버튼" />
      </StyledDetailButton>
    </AddButtonDiv>
  );
}

export default DetailCardListItemAdd;

/* ==================== styled ==================== */

const AddButtonDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const StyledDetailButton = styled(DetailButton)`
  width: 56px;
  height: 56px;
  border-radius: 50%;
`;
