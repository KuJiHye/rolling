import styled from "styled-components";
import Input from "./Input";

function InputForm({ label, placeholder, value, onChange, onEnterPress, className}){
    return(
        <InputFormLayout className={className}>
            <Label>{label}</Label>
            <Input
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                onEnterPress={onEnterPress}
                />
        </InputFormLayout>
    )   
}

const Label = styled.div`
    color: #181818;
    font-family: Pretendard;
    font-size: 24px;
    font-style: normal;
    font-weight: 700;
    line-height: 42px; /* 175% */
    letter-spacing: -0.24px; 
`

const InputFormLayout = styled.div`
    display: inline-flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 12px;

`

export default InputForm;
