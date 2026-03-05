import { useNavigate } from "react-router-dom";

function DetailCardListItemAdd({ id }) {
  const navigate = useNavigate();

  const handleAddCard = () => {
    navigate(`/post/${id}/message`);
  };

  return (
    <div>
      <span onClick={handleAddCard}>+</span>
    </div>
  );
}

export default DetailCardListItemAdd;
