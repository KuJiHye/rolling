import styled from "styled-components";

function ProfileImgOptions({ changeImg }) {
  const IMG_LIST = [
    "https://api.dicebear.com/7.x/adventurer/svg?seed=Aneka",
    "https://api.dicebear.com/7.x/adventurer/svg?seed=Charlie",
    "https://api.dicebear.com/7.x/adventurer/svg?seed=Daisy",
    "https://api.dicebear.com/7.x/adventurer/svg?seed=Ethan",
    "https://api.dicebear.com/7.x/adventurer/svg?seed=Freya",
    "https://api.dicebear.com/7.x/adventurer/svg?seed=George",
    "https://api.dicebear.com/7.x/adventurer/svg?seed=Hannah",
    "https://api.dicebear.com/7.x/adventurer/svg?seed=Ivan",
    "https://api.dicebear.com/7.x/adventurer/svg?seed=Zoe",
    "https://api.dicebear.com/7.x/adventurer/svg?seed=Kevin",
  ];

  const handleChange = (e) => {
    console.log("호출됨", e.target.src);
    changeImg(e.target.src);
  };

  return (
    <div>
      {IMG_LIST.map((url, index) => (
        <Img
          key={index}
          src={url}
          alt={`프로필${index + 1}`}
          onClick={handleChange}
          style={{ cursor: "pointer" }}
        />
      ))}
    </div>
  );
}

const Img = styled.img`
  width: 56px;
  height: 56px;
  border-radius: 100px;
  border: 1px solid grey;
  margin-right: 5px;
`;

export default ProfileImgOptions;
