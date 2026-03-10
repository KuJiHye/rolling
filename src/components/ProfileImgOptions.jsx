function ProfileImgOptions({ changeImg }) {
  const IMG_LIST = [
    "https://i.pravatar.cc/150?img=70",
    "https://i.pravatar.cc/150?img=46",
    "https://i.pravatar.cc/150?img=35",
    "https://i.pravatar.cc/150?img=12",
    "https://i.pravatar.cc/150?img=16",
    "https://i.pravatar.cc/150?img=4",
  ];

  const handleChange = (e) => {
    console.log("호출됨", e.target.src);
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
          style={{ cursor: "pointer" }}
        />
      ))}
    </div>
  );
}

export default ProfileImgOptions;
