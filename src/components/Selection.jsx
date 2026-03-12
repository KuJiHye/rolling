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

  return (
    <div>
      <StyledLabel>{children}</StyledLabel>
      <SelectWrapper onBlur={() => setClicked(false)} tabIndex={0}>
        <SelectBox
          $clicked={clicked}
          onClick={() => setClicked((prev) => !prev)}
        >
          <span>{value}</span>
          <ArrowIcon src={clicked ? SelectionUp : SelectionDown} />
        </SelectBox>

        {clicked && (
          <OptionList>
            {options.map((option) => (
              <OptionItem
                key={option.value}
                $selected={option.value === value}
                onMouseDown={() => {
                  onChange(option.value);
                  setClicked(false);
                }}
              >
                {option.label}
              </OptionItem>
            ))}
          </OptionList>
        )}
      </SelectWrapper>
    </div>
  );
}
const SelectWrapper = styled.div`
  position: relative;
  width: 320px;
  outline: none;
`;

const SelectBox = styled.div`
  width: 320px;
  height: 50px;
  border-radius: 8px;
  border: ${({ $clicked }) =>
    $clicked ? "2px solid #555555" : "1px solid #cccccc"};
  padding: 12px 16px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 16px;
  line-height: 26px;
  font-weight: 400;
  color: #181818;
  cursor: pointer;
`;

const ArrowIcon = styled.img`
  pointer-events: none;
`;

const OptionList = styled.ul`
  position: absolute;
  top: 54px;
  width: 100%;
  border: 1px solid #cccccc;
  border-radius: 8px;
  background-color: white;
  list-style: none;
  padding: 10px 0;
  margin: 0;
  z-index: 10;
  color: #181818;
`;
const OptionItem = styled.li`
  padding: 10px 16px;
  font-size: 16px;
  color: #181818;
  cursor: pointer;

  &:hover {
    background-color: #f6f6f6;
  }
`;

export default Selection;
