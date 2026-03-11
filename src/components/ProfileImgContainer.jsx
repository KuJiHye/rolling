import ProfileImg from "./ProfileImg";
import ProfileImgOptions from "./ProfileImgOptions";
import styled from "styled-components";

function ProfileImgContainer({ label, value, changeImg }) {
  return (
    <div>
      <Label>{label}</Label>
      <br />
      <ProfileImg value={value} />
      <ProfileImgOptions changeImg={changeImg} />
    </div>
  );
}

const Label = styled.label`
  color: #181818;
  font-family: Pretendard;
  font-size: 24px;
  font-style: bold;
  font-weight: 700;
  line-height: 36px; /* 175% */
  letter-spacing: -1%;
`;

export default ProfileImgContainer;
