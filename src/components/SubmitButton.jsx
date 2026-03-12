import Button from "./Button";
import styled from "styled-components";

function SubmitButton({ value, onSubmit }){
   
    const isButtonDisabled = value.trim().length === 0;

    return(
        <StyleCreateButton
            disabled={isButtonDisabled}
            onClick={onSubmit}/>
    )
}

const StyleCreateButton = styled(Button)`
    margin: 24px;
    
    &:disabled {
        background-color: #CCCCCC;
        color: #999999;
        cursor: not-allowed;
    }

    @media (max-width:1200px) {
        position: fixed;
        bottom: 0;
    }
`

export default SubmitButton;