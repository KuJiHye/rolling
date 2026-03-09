import { useState } from "react";
import ProfileImg from "./ProfileImg";

const IMG_LIST = [
  "https://media.istockphoto.com/id/1495088043/vector/user-profile-icon-avatar-or-person-icon-profile-picture-portrait-symbol-default-portrait.jpg?s=612x612&w=0&k=20&c=dhV2p1JwmloBTOaGAtaA3AW1KSnjsdMt7-U_3EZElZ0=",
];

function ProfileImgContainer({ label }) {
  const [profileImg, setProfileImg] = useState(IMG_LIST[0]);

  return (
    <>
      <label>{label}</label>
      <ProfileImg value={profileImg} />
    </>
  );
}

export default ProfileImgContainer;
