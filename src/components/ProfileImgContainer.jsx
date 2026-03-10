import ProfileImg from "./ProfileImg";
import ProfileImgOptions from "./ProfileImgOptions";

function ProfileImgContainer({ label, value, changeImg }) {
  return (
    <>
      <label>{label}</label>
      <br />
      <ProfileImg value={value} />
      <ProfileImgOptions changeImg={changeImg} />
    </>
  );
}

export default ProfileImgContainer;
