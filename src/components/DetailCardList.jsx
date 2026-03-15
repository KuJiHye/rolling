import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import DetailCardListItemAdd from "./DetailCardListItemAdd";
import DetailCardListItem from "./DetailCardListItem";
import DetailCardModal from "./DetailCardModal";
import DetailButton from "./DetailButton";
import useConfirm from "../hooks/useConfirm";
import { getDetailMessages, deleteMessages } from "../api/index";

const LIMIT = 8; // 데이터를 8개씩 받아오기 위한 상수

function DetailCardList({ editMode }) {
  const { id } = useParams();
  const [cards, setCards] = useState([]);
  const [cardModal, setCardModal] = useState(null);
  const [hasNext, setHasNext] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { confirm, ConfirmComponent } = useConfirm();

  const loadCards = async () => {
    const { results, next } = await getDetailMessages(id, { limit: LIMIT });

    setCards(results);
    setHasNext(Boolean(next));
  };

  // 카드 더보기
  const handleMoreCard = async () => {
    let data = null;

    setIsLoading(true);

    try {
      data = await getDetailMessages(id, {
        limit: LIMIT,
        offset: cards.length,
      });
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
  const handleDeleteCard = async (id) => {
    const confirmDelete = await confirm("메세지를 정말 삭제하시겠습니까?");

    if (!confirmDelete) return;

    try {
      await deleteMessages(id);
      setCards((prevCards) => prevCards.filter((card) => card.id !== id));
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <StyledDetailCardList>
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
      </StyledDetailCardList>

      {hasNext && (
        <StyledDetailButton
          disabled={isLoading}
          className="btn btn-gray"
          onClick={handleMoreCard}
        >
          더보기
        </StyledDetailButton>
      )}

      {ConfirmComponent}
    </>
  );
}

export default DetailCardList;

/* ==================== styled ==================== */

const StyledDetailCardList = styled.div`
  display: flex;
  flex-flow: wrap;
  gap: 28px 24px;

  & > div {
    width: calc((100% - 48px) / 3);
    height: 280px;
    background-color: var(--white);
    border-radius: 16px;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.08);
  }

  @media ${({ theme }) => theme.tablet} {
    gap: 16px;

    & > div {
      width: calc((100% - 16px) / 2);
      height: 284px;
    }
  }

  @media ${({ theme }) => theme.mobile} {
    & > div {
      width: 100%;
      height: 230px;
    }
  }
`;

const StyledDetailButton = styled(DetailButton)`
  display: block;
  margin: 40px auto 0;

  @media ${({ theme }) => theme.mobile} {
    margin: 16px auto 0;
  }
`;
