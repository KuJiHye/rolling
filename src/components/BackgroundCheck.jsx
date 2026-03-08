import styled from "styled-components";

function BackgroundCheck(){
    return(
        <Div>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M3 12L9.83333 18.0833L20.6667 6" stroke="white" strokeWidth="3.33333" strokeLinecap="round"/>
            </svg>
        </Div>
    )
}

const Div = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width:34px;
    height: 34px;
    background-color: #555555;
    border-radius: 100px;
    position: relative; 
    z-index: 10;
`

export default BackgroundCheck;
