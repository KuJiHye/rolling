import styled from "styled-components";

function ImgBackgroundItem({ data, onClick, children }) { 
    return (
        <StyledItem onClick={onClick} $bgUrl={data} children={children}>
            {children}
        </StyledItem>
    );
}

const StyledItem = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: auto;
    aspect-ratio: 1 / 1;
    border-radius: 16px;
    background-image: url(${props => props.$bgUrl});
    background-size: cover;
    background-position: center;
    cursor: pointer;

    @media ${({ theme }) => theme.moblie} {
        width: 100%;
        height: auto;
        aspect-ratio: 1 / 1;
    }
`;

export default ImgBackgroundItem;