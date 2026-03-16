import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import instance from "../../api/index";
import styled from "styled-components";
import Button from "../../components/Button";
import Selection from "./Selection";
import TextEditor from "./TextEditor";
import InputForm from "../../components/InputForm";
import ProfileImgContainer from "./ProfileImgContainer";
import MyContext from "../../components/MyContext";
import ToastBox from "../../components/ToastBox";

function MessageForm() {
  //현재 페이지의 id 값 저장
  const { id } = useParams();

  //각각의 input 값들을 state에 저장
  const [sender, setSender] = useState("");
  const [profileImageURL, setProfileImageURL] = useState(
    "https://learn-codeit-kr-static.s3.ap-northeast-2.amazonaws.com/sprint-proj-image/default_avatar.png",
  );
  const [relationship, setRelationship] = useState("지인");
  const [content, setContent] = useState("");
  const [font, setFont] = useState("Noto Sans");

  //토스트 메세지 state
  const [shouldShowToastMessage, setShouldShowToastMessage] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

  const navigate = useNavigate();

  //필수 입력값이 없으면 버튼 비활성화 -> 이름 또는 content 내용이 없는 경우
  const isDisabled = !sender.trim() || content === "<p><br></p>" || !content;

  const makeToast = (message) => {
    setShouldShowToastMessage(true);
    setToastMessage(message);
  };

  //POST 요청 함수 (버튼 클릭시 발생), input 값들 저장
  const handleSubmit = async () => {
    if (isDisabled) return;

    try {
      await instance.post(`/recipients/${id}/messages/`, {
        sender,
        profileImageURL,
        relationship,
        content,
        font,
      });
      navigate(`/post/${id}`); //요청 후 해당 id 페이지로 이동
    } catch {
      makeToast("메세지 작성에 실패하였습니다");
    }
  };

  return (
    <MyContext.Provider
      value={{
        shouldShowToastMessage,
        setShouldShowToastMessage,
        makeToast,
      }}
    >
      <StyledContainer>
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
      </StyledContainer>
    </MyContext.Provider>
  );
}

const StyledContainer = styled.div`
  width: 720px;
  margin: 47px auto;
  display: flex;
  flex-direction: column;
  gap: 50px;

  @media ${({ theme }) => theme.tablet} {
    margin: 24px auto;
  }

  @media ${({ theme }) => theme.mobile} {
    width: 100%;
    margin: 0;
    padding: 0 20px 50px 20px;
  }
`;

export default MessageForm;
