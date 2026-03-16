import ProfileImg from "./ProfileImg";
import ProfileImgOptions from "./ProfileImgOptions";
import styled from "styled-components";
import StyledLabel from "./StyledLabel";

function ProfileImgContainer({ label, value, changeImg }) {
  return (
    <div>
      <StyledLabel>{label}</StyledLabel>
      <StyledOptions>
        <ProfileImg value={value} />
        <ProfileImgOptions changeImg={changeImg} />
      </StyledOptions>
    </div>
  );
}

const StyledOptions = styled.div`
  display: flex;
  justify-content: space-between;
`;

export default ProfileImgContainer;
