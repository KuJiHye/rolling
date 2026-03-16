import styled from "styled-components";

function ProfileImgOptions({ changeImg }) {
  const IMG_LIST = [
    "https://api.dicebear.com/7.x/adventurer/svg?seed=Aneka&backgroundColor=b6e3f4",
    "https://api.dicebear.com/7.x/adventurer/svg?seed=Charlie&backgroundColor=ffd5dc",
    "https://api.dicebear.com/7.x/adventurer/svg?seed=Daisy&backgroundColor=c0aede",
    "https://api.dicebear.com/7.x/adventurer/svg?seed=Ethan&backgroundColor=d1f4d9",
    "https://api.dicebear.com/7.x/adventurer/svg?seed=Freya&backgroundColor=ffdfbf",
    "https://api.dicebear.com/7.x/adventurer/svg?seed=George&backgroundColor=ffd5dc",
    "https://api.dicebear.com/7.x/adventurer/svg?seed=Hannah&backgroundColor=b6e3f4",
    "https://api.dicebear.com/7.x/adventurer/svg?seed=Ivan&backgroundColor=c0aede",
    "https://api.dicebear.com/7.x/adventurer/svg?seed=Zoe&backgroundColor=d1f4d9",
    "https://api.dicebear.com/7.x/adventurer/svg?seed=Kevin&backgroundColor=ffdfbf",
  ];

  const handleChange = (e) => {
    console.log("호출됨", e.target.src);
    changeImg(e.target.src);
  };

  return (
    <StyledOptionsWrapper>
      <StyledDescription>프로필 이미지를 선택해주세요!</StyledDescription>
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
    </StyledOptionsWrapper>
  );
}

const StyledOptionsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 94px;

  @media ${({ theme }) => theme.mobile} {
    height: 100%;
    padding-left: 30px;
  }
`;

const StyledDescription = styled.p`
  color: var(--gray-500);
  font: var(--font-16-regular);
  line-height: 26px;
`;

const Img = styled.img`
  width: 56px;
  height: 56px;
  border-radius: 100px;
  border: 1px solid grey;
  margin-right: 5px;

  @media ${({ theme }) => theme.mobile} {
    width: 40px;
    height: 40px;
  }
`;

export default ProfileImgOptions;
