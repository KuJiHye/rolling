import { useNavigate } from "react-router-dom";
import Button from "./Button";
import styled from "styled-components";

function SubmitButton({ receiverName }){
    const navigate = useNavigate();

    //receiverName이 있는지를 검사하고 없으면 버튼 비활성화
    // const receiverNameisNull = () => {
    //     receiverName? '' : 
    // }

    const isButtonDisabled = receiverName.trim().length === 0;

    //롤링 페이퍼 생성하기 페이지에서 생성 버튼 클릭 시 작동하는 함수
    const handleClickCreatePaperButton = () =>{
        //페이지 이동 인풋 value가 null이면 이동 막기
        receiverName ? navigate(`/post/id`) : ''
        
    }
    return(
        <CreateButton
            disabled={isButtonDisabled}
            onClick={handleClickCreatePaperButton}/>
    )
}

const CreateButton = styled(Button)`
    margin: 24px;
    &:disabled {
        background-color: #CCCCCC;
        color: #999999;
        cursor: not-allowed;
   }
`

export default SubmitButton;