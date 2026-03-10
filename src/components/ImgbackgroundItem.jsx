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
    width: 168px;
    height: 168px;
    border-radius: 16px;
    background-image: url(${props => props.$bgUrl});
    background-size: cover;
    background-position: center;
    cursor: pointer;
    margin: 24px 0;
`;

export default ImgBackgroundItem;