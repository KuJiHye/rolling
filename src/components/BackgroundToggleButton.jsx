import styled  from "styled-components";

const Button = styled.div`
    margin: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 180px;
    height: 40px;
    padding: 7px 16px;
    border-radius: 6px;
    cursor: pointer;
    border: 2px solid #ffffff;
    background-color:#F6F6F6;
    ${({ $isActive }) => $isActive && `
        border: 2px solid #9935ff;
        color: #9935ff;
        background-color: #FFFFFF;
        font-weight: bold;`}
`

function BackgroundToggle({ text, onClick, isActive }){
    return(
        <Button
            $isActive={isActive}
            onClick={onClick} >
            {text}
        </Button>
    )
}
 

export default BackgroundToggle;