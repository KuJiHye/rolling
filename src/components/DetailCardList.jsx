import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import DetailCardListItemAdd from "./DetailCardListItemAdd";
import DetailCardListItem from "./DetailCardListItem";
import DetailCardModal from "./DetailCardModal";
import axios from "../api/axios";

const DetailCardListDiv = styled.div`
  display: flex;
  flex-flow: wrap;
  gap: 28px 24px;

  & > div {
    width: 384px;
    height: 280px;
    background-color: var(--white);
    border-radius: 16px;
    box-shadow: 0 2px 12px 0 #00000014;
  }
`;

function DetailCardList({ editMode }) {
  const { id } = useParams();
  const [cards, setCards] = useState([]);
  const [cardModal, setCardModal] = useState(null);

  useEffect(() => {
    const recentMessagesData = async () => {
      try {
        const response = await axios.get(`recipients/${id}/`);
        const data = response.data;

        setCards(data.recentMessages);
      } catch (error) {
        console.error(error);
      }
    };

    recentMessagesData();
  }, [id]);

  // 카드 삭제
  const handleDeleteCard = async (cardId) => {
    const confirmDelete = window.confirm("메세지를 정말 삭제하시겠습니까?");

    if (!confirmDelete) return;

    try {
      await axios.delete(`messages/${cardId}/`);
      setCards((prevCards) => prevCards.filter((card) => card.id !== cardId));
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <DetailCardListDiv>
      {!editMode && <DetailCardListItemAdd id={id} />}

      {cards.map((card) => (
        <DetailCardListItem
          key={card.id}
          card={card}
          editMode={editMode}
          onDelete={handleDeleteCard}
          onClick={() => setCardModal(card)}
        />
      ))}

      {cardModal && (
        <DetailCardModal card={cardModal} onClose={() => setCardModal(null)} />
      )}
    </DetailCardListDiv>
  );
}

export default DetailCardList;
