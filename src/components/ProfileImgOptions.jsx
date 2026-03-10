function ProfileImgOptions({ changeImg }) {
  const BASIC_URL = "https://i.pravatar.cc/150?img=";

  const IMG_LIST = [
    "https://i.pravatar.cc/150?img=70",
    "https://i.pravatar.cc/150?img=46",
    "https://i.pravatar.cc/150?img=35",
    "https://i.pravatar.cc/150?img=12",
    "https://i.pravatar.cc/150?img=16",
    "https://i.pravatar.cc/150?img=4",
  ];

  const handleChange = (e) => {
    changeImg(e.target.src);
  };

  return (
    <div>
      {IMG_LIST.map((url, index) => (
        <img
          key={index}
          src={url}
          alt={`프로필${index + 1}`}
          onClick={handleChange}
        />
      ))}
    </div>
  );
}

export default ProfileImgOptions;
