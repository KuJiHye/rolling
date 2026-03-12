import styled from "styled-components";

const ColorbackgroundItem = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 166.5px;
    height: 166.5px;
    background-color: ${({ $hexColorCode }) => $hexColorCode};
    border-radius: 16px;
    border: 1px solid rgba(0, 0, 0, 0.08);
    cursor: pointer;
    &:hover {
        filter: blur(1px);
        cursor: pointer;
    }

    @media ${({ theme }) => theme.moblie} {
        width: 154px;
        height: 154px;  
    }
`

export default ColorbackgroundItem;