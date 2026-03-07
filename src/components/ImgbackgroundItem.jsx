import styled from "styled-components";

function ImgBackgroundItem({ data }) { 
    return (
        <StyledItem $bgUrl={data} />
    );
}

const StyledItem = styled.div`
    width: 168px;
    height: 168px;
    border-radius: 16px;
    background-image: url(${props => props.$bgUrl});
    background-size: cover;
    background-position: center;
`;

export default ImgBackgroundItem;