import { useState } from "react";

function Input({ placeholder }){
    //isNull이 true가 되면 css 적용
    const [isNull, setIsNull] = useState(true);

    //focusout 될 때 비어있는지를 검사 
    const handleInputFocusout = (e) => {
        if (e.target.value ===''){
            setIsNull(true);
        } else{
            setIsNull(false);
        }
    }

    return(
        <input placeholder={placeholder} onBlur={handleInputFocusout} className={`${isNull ? 'input-err':''}`} />
    )
}

export default Input; 