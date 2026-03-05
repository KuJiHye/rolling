import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import DetailCardList from "../components/DetailCardList";
import axios from "../api/axios";

function DetailPage() {
  const { id } = useParams();
  const [background, setBackground] = useState({
    type: "color",
    value: "#FFFFFF",
  });

  useEffect(() => {
    const backgroundData = async () => {
      try {
        const response = await axios.get(`${id}/`);
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
      } catch (error) {
        console.error(error);
      }
    };

    backgroundData();
  }, [id]);

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
        <DetailCardList />
      </div>
    </>
  );
}

export default DetailPage;
