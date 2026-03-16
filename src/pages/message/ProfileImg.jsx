import styled from "styled-components";

function ProfileImg({ value }) {
  return (
    <>
      <StyledImg src={value} alt="대표 이미지" />
    </>
  );
}

const StyledImg = styled.img`
  width: 80px;
  height: 80px;
  border-radius: 100px;
  align-self: center;
`;

export default ProfileImg;
