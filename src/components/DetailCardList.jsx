import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import DetailCardListItemAdd from "./DetailCardListItemAdd";
import DetailCardListItem from "./DetailCardListItem";
import DetailCardModal from "./DetailCardModal";
import DetailButton from "./DetailButton";
import useConfirm from "../hooks/useConfirm";
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

const MoreButtonStyle = styled(DetailButton)`
  display: block;
  background-color: var(--gray-600);
  margin: 40px auto 0;
  padding: 7px 17px;
  border-radius: 6px;
  color: var(--white);
  line-height: 26px;

  &:hover {
    background-color: var(--gray-700);
  }
`;

const LIMIT = 8; // 데이터를 5개씩 받아오기 위한 상수

function DetailCardList({ editMode }) {
  const { id } = useParams();
  const [cards, setCards] = useState([]);
  const [cardModal, setCardModal] = useState(null);
  const [hasNext, setHasNext] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { confirm, ConfirmComponent } = useConfirm();

  const loadCards = async () => {
    const response = await axios.get(`recipients/${id}/messages/`, {
      params: {
        limit: LIMIT,
      },
    });
    const { results, next } = response.data;

    setCards(results);
    setHasNext(Boolean(next));
  };

  const handleMoreCard = async () => {
    let data = null;

    setIsLoading(true);

    try {
      const response = await axios.get(`recipients/${id}/messages/`, {
        params: {
          limit: LIMIT,
          offset: cards.length,
        },
      });
      data = response.data;
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }

    if (!data) return;

    const { results, next } = data;

    setCards((prev) => [...prev, ...results]);
    setHasNext(Boolean(next));
  };

  useEffect(() => {
    loadCards();
  }, [id]);

  // 카드 삭제
  const handleDeleteCard = async (cardId) => {
    const confirmDelete = await confirm("메세지를 정말 삭제하시겠습니까?");

    if (!confirmDelete) return;

    try {
      await axios.delete(`messages/${cardId}/`);
      setCards((prevCards) => prevCards.filter((card) => card.id !== cardId));
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
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
          <DetailCardModal
            card={cardModal}
            onClose={() => setCardModal(null)}
          />
        )}
      </DetailCardListDiv>

      {hasNext && (
        <MoreButtonStyle disabled={isLoading} onClick={handleMoreCard}>
          더보기
        </MoreButtonStyle>
      )}

      {ConfirmComponent}
    </>
  );
}

export default DetailCardList;
