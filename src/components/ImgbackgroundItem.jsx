import styled from "styled-components";

function ImgBackgroundItem({ data, onClick }) { 
    return (
        <StyledItem onClick={onClick} $bgUrl={data} />
    );
}

const StyledItem = styled.div`
    width: 168px;
    height: 168px;
    border-radius: 16px;
    background-image: url(${props => props.$bgUrl});
    background-size: cover;
    background-position: center;
    cursor: pointer;
`;

export default ImgBackgroundItem;