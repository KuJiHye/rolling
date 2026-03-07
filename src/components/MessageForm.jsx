import { useState } from "react";
import Button from "./Button";
import Selection from "./Selection";
import TextEditor from "./TextEditor";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

function MessageForm() {
  const { id } = useParams();
  const [sender, setSender] = useState("김하은");
  const [profileImageURL, setProfileImageURL] = useState(
    "https://fastly.picsum.photos/id/311/200/200.jpg?hmac=CHiYGYQ3Xpesshw5eYWH7U0Kyl9zMTZLQuRDU4OtyH8",
  );
  const [relationship, setRelationship] = useState("친구");
  const [content, setContent] = useState("");
  const [font, setFont] = useState("Noto Sans");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  //필수 입력값이 없으면 버튼 비활성화
  const isDisabled = false;
  // !sender.trim() ||
  // !profileImageURL ||
  // !relationship ||
  // !content.trim() ||
  // !font;

  //POST 요청 함수 (버튼 클릭시 발생)
  const handleSubmit = async () => {
    if (isDisabled) return;

    setIsLoading(true);
    setError(null);

    try {
      const response = await axios.post(
        `https://rolling-api.vercel.app/23-5/recipients/${id}/messages/`,
        { sender, profileImageURL, relationship, content, font },
      );
      navigate(`/post/${id}`);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      {/*폼 필드들 ...*/}

      <Selection
        value={relationship}
        onChange={setRelationship}
        type={"relation"}
      >
        상대와의 관계
      </Selection>
      <br />
      <br />

      <TextEditor onChange={setContent} font={font} />
      <br />
      <br />

      <Selection value={font} onChange={setFont} type={"font"}>
        폰트 선택
      </Selection>

      <Button
        onClick={handleSubmit}
        disabled={isDisabled}
        isLoading={isLoading}
      />
    </div>
  );
}

export default MessageForm;
