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
    z-index: 9999;

    &:disabled {
        background-color: #CCCCCC;
        color: #999999;
        cursor: not-allowed;
    }

    @media ${({ theme }) => theme.tablet } {
        position: fixed;
        bottom: 0;
    }

    @media ${({ theme }) => theme.mobile} {
        position: fixed;
        bottom: 0;
        max-width: 360px;
        width: 100%;
    }
`

export default SubmitButton;