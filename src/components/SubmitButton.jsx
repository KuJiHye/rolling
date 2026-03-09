import Button from "./Button";
import styled from "styled-components";

function SubmitButton({ value, onSubmit }){
   
    const isButtonDisabled = value.trim().length === 0;

    return(
        <CreateButton
            disabled={isButtonDisabled}
            onClick={onSubmit}/>
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