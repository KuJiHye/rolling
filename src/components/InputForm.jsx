import styled from "styled-components";
import Input from "./Input";

function InputDiv({
  label,
  placeholder,
  value,
  onChange,
  onEnterPress,
  className,
}) {
  return (
    <StyleInputLayout className={className}>
      <Label>{label}</Label>
      <Input
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        onEnterPress={onEnterPress}
      />
    </StyleInputLayout>
  );
}

const StyleInputForm = styled(InputDiv)`
  width: 100%;
  margin-top: 20px;
`;
const Label = styled.div`
  color: #181818;
  font-family: Pretendard;
  font-size: 24px;
  font-style: normal;
  font-weight: 700;
  line-height: 42px;
  letter-spacing: -0.24px;
`;

const StyleInputLayout = styled.div`
  display: inline-flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 12px;
`;

export default StyleInputForm;
