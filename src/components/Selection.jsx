function Selection({ children, type, value, onChange }) {
  let options = [];

  if (type === "relation") {
    options = ["친구", "지인", "동료", "가족"];
  } else if (type === "font") {
    options = ["Noto Sans", "Pretendard", "나눔명조", "나눔손글씨 손편지체"];
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
            <option key={option} value={option}>
              {option}
            </option>
          );
        })}
      </select>
    </>
  );
}

export default Selection;
