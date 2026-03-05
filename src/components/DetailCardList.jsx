import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import DetailCardListItemAdd from "./DetailCardListItemAdd";
import DetailCardListItem from "./DetailCardListItem";
import axios from "../api/axios";

function DetailCardList() {
  const { id } = useParams();
  const [cards, setCards] = useState([]);

  useEffect(() => {
    const recentMessagesData = async () => {
      try {
        const response = await axios.get(`${id}/`);
        const data = response.data;

        setCards(data.recentMessages);
      } catch (error) {
        console.error(error);
      }
    };

    recentMessagesData();
  }, [id]);

  return (
    <div>
      <DetailCardListItemAdd id={id} />

      {cards.map((card) => (
        <DetailCardListItem key={card.id} card={card} />
      ))}
    </div>
  );
}

export default DetailCardList;
