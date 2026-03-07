import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import DetailCardList from "../components/DetailCardList";
import axios from "../api/axios";
import DetailButton from "../components/DetailButton";
import EmojiReaction from '../components/EmojiReaction';
import ShareDropdown from "../components/ShareDropdown";

function DetailPage() {
  const { id } = useParams();
  const [background, setBackground] = useState({
    type: "color",
    value: "#FFFFFF",
  });
  const [editMode, setEditMode] = useState(false);
  const navigate = useNavigate();
  const [recipientData, setRecipientData] = useState(null);

  useEffect(() => {
    const backgroundData = async () => {
      try {
        const response = await axios.get(`recipients/${id}/`);
        const data = response.data;

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
        setRecipientData(data);
      } catch (error) {
        console.error(error);
      }
    };

    backgroundData();
  }, [id]);

  // 페이지 삭제
  const handleDeletePage = async () => {
    const confirmDelete = window.confirm("정말 삭제하시겠습니까?");

    if (!confirmDelete) return;

    try {
      await axios.delete(`recipients/${id}/`);
      navigate("/list");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      {/* 헤더 컴포넌트 */}
      {/* 미니 헤더 컴포넌트 */}

      <div
        style={
          background.type === "color"
            ? { backgroundColor: background.value }
            : {
                backgroundImage: `url(${background.value})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }
        }
      >
        <EmojiReaction recipientId={id} />

        <ShareDropdown postData={recipientData} />

        <DetailButton onClick={() => setEditMode((prev) => !prev)}>
          {editMode ? "저장하기" : "편집하기"}
        </DetailButton>

        {editMode && (
          <DetailButton onClick={handleDeletePage}>삭제하기</DetailButton>
        )}

        <DetailCardList editMode={editMode} />
      </div>
    </>
  );
}

export default DetailPage;
