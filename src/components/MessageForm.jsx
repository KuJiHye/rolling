import { useState } from "react";
import Button from "./Button";
import Selection from "./Selection";
import TextEditor from "./TextEditor";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import InputForm from "./InputForm";
import ProfileImgContainer from "./ProfileImgContainer";
import styled from "styled-components";
import MyContext from "../components/MyContext";
import ToastBox from "../components/ToastBox";

function MessageForm() {
  const { id } = useParams();
  const [sender, setSender] = useState("");
  const [profileImageURL, setProfileImageURL] = useState(
    "https://learn-codeit-kr-static.s3.ap-northeast-2.amazonaws.com/sprint-proj-image/default_avatar.png"
  );
  const [relationship, setRelationship] = useState("지인");
  const [content, setContent] = useState("");
  const [font, setFont] = useState("Noto Sans");
  const navigate = useNavigate();
  const [shouldShowToastMessage, setShouldShowToastMessage] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

  //필수 입력값이 없으면 버튼 비활성화
  const isDisabled = !sender.trim() || content === "<p><br></p>" || !content;

  //POST 요청 함수 (버튼 클릭시 발생)
  const handleSubmit = async () => {
    if (isDisabled) return;

    try {
      await axios.post(
        `https://rolling-api.vercel.app/23-5/recipients/${id}/messages/`,
        { sender, profileImageURL, relationship, content, font }
      );
      navigate(`/post/${id}`);
    } catch {
      makeToast("메세지 작성에 실패하였습니다");
    }
  };

  const makeToast = (message) => {
    setShouldShowToastMessage(true);
    setToastMessage(message);
  };

  return (
    <MyContext.Provider
      value={{
        shouldShowToastMessage,
        setShouldShowToastMessage,
        makeToast,
      }}
    >
      <Container>
        <InputForm
          onChange={setSender}
          label="FROM"
          placeholder="이름을 입력해주세요"
          value={sender}
        />

        <ProfileImgContainer
          label="프로필 이미지"
          value={profileImageURL}
          changeImg={setProfileImageURL}
        />

        <Selection
          value={relationship}
          onChange={setRelationship}
          type={"relation"}
        >
          상대와의 관계
        </Selection>

        <TextEditor onChange={setContent} font={font} />

        <Selection value={font} onChange={setFont} type={"font"}>
          폰트 선택
        </Selection>

        <Button onClick={handleSubmit} disabled={isDisabled} />

        {shouldShowToastMessage && (
          <ToastBox
            toastMessage={toastMessage}
            setShowToastMessage={setShouldShowToastMessage}
          />
        )}
      </Container>
    </MyContext.Provider>
  );
}

const Container = styled.div`
  width: 720px;
  height: 944px;
  margin: 47px auto;
  display: flex;
  flex-direction: column;
  gap: 50px;
`;

export default MessageForm;
