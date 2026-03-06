import styled from "styled-components";
import Button from "../components/Button";
import InputForm from "../components/InputForm";
import SelectBackground from "../components/SelectBackgound";

function Post({ className }){
    return(
        <div>
            <InputForm label='To.' placeholder='이름을 입력해주세요'/>
            <SelectBackground />
            <SubmitButton className={className}/>
        </div>
    )
}

const SubmitButton = styled(Button)`
    margin: 24px;
`

export default Post;