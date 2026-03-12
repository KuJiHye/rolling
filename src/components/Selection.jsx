import { useState } from "react";
import StyledLabel from "./StyledLabel";
import styled from "styled-components";
import SelectionUp from "../assets/SelectionUp.svg";
import SelectionDown from "../assets/SelectionDown.svg";

function Selection({ children, type, value, onChange }) {
  const [clicked, setClicked] = useState(false);

  let options = [];

  if (type === "relation") {
    options = [
      { label: "지인", value: "지인" },
      { label: "친구", value: "친구" },
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
    <div>
      <StyledLabel>{children}</StyledLabel>
      <SelectWrapper>
        <StyledSelect
          onClick={() => setClicked((prev) => !prev)}
          onBlur={() => setClicked(false)}
          value={value}
          onChange={handleChange}
        >
          {options.map((option) => {
            return (
              <StyledOption key={option.value} value={option.value}>
                {option.label}
              </StyledOption>
            );
          })}
        </StyledSelect>
        <ArrowIcon src={clicked ? SelectionUp : SelectionDown} />
      </SelectWrapper>
    </div>
  );
}

const StyledOption = styled.option`
  border-radisu: 8px;
  padding: 10px 1px;
  color: #cccccc;
`;

const SelectWrapper = styled.div`
  position: relative;
  width: 320px;
`;

const ArrowIcon = styled.img`
  position: absolute;
  right: 16px;
  top: 50%;
  transform: translateY(-50%);
  pointer-events: none;
`;

const StyledSelect = styled.select`
  width: 320px;
  height: 50px;
  border-radius: 8px;
  border: 1px solid #cccccc;
  padding: 12px 16px;
  justify-content: space-between;
  font-size: 16px;
  line-height: 26px;
  font-weight: 400;
  color: #555555;
  cursor: pointer;
  appearance: none;
`;

export default Selection;
