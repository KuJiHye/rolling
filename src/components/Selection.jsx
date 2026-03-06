function Selection({ children, type, value, onChange }) {
  let options = [];

  if (type === "relation") {
    options = [
      { label: "친구", value: "친구" },
      { label: "지인", value: "지인" },
      { label: "동료", value: "동료" },
      { label: "가족", value: "가족" },
    ];
  } else if (type === "font") {
    options = [
      { label: "Noto Sans KR", value: "Noto Sans" },
      { label: "Pretendard", value: "Pretendard" },
      { label: "나눔명조", value: "나눔명조" },
      { label: "나눔손글씨 손편지체", value: "나눔손글씨 손편지체" },
    ];
  }

  const handleChange = (e) => {
    onChange(e.target.value);
  };

  return (
    <>
      <label>{children}</label>
      <select value={value} onChange={handleChange}>
        {options.map((option) => {
          return (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          );
        })}
      </select>
    </>
  );
}

export default Selection;
