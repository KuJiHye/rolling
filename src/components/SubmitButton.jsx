import { useNavigate } from "react-router-dom";
import Button from "./Button";
import styled from "styled-components";

function SubmitButton(){
    const navigate = useNavigate();

    //서버에 데이터를 보내는 함수
    // const async postRecipient = () => {

    // }

    // 롤링 페이퍼 생성하기 페이지에서 생성 버튼 클릭 시 작동하는 함수
    const handleClickCreatePaperButton = () =>{
        //페이지 이동
        navigate(`/post/id`)
    }
    return(
        <CreateButton onClick={handleClickCreatePaperButton}/>
    )
}

const CreateButton = styled(Button)`
    margin: 24px;
`

export default SubmitButton;