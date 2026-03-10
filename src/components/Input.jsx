import { useState } from "react";
import styled from "styled-components";

function Input({ placeholder, value, onChange }){
    const [isNull, setIsNull] = useState(false);

    const handleChange = (e) => { 
		const nextValue = e.target.value;
		onChange(nextValue);
    };

    //focusout 될 때 비어있는지를 검사
    const handleInputFocusout = (e) => {
        if (e.target.value ===''){
            setIsNull(true);
        } else{
            setIsNull(false);
        }
    }

    return(
        <InputBox
            value={value}
            onChange={handleChange}
            placeholder={isNull? '값을 입력해주세요.': placeholder}
            onBlur={handleInputFocusout}
            $isNull={isNull} />
    )
};

const InputBox = styled.input`
    width: 720px;
    border-radius: 8px;
    border: 1px solid ${({ $isNull }) => $isNull ? '#ff0000' : '#CCCCCC'};
    padding: 12px 16px;
`

export default Input;
