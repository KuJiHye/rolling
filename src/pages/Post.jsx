import { useState } from "react";
import InputForm from "../components/InputForm";
import SelectBackground from "../components/SelectBackgound";
import SubmitButton from "../components/SubmitButton";

function Post({ className }){
    const [receiverName, setReceiverName] = useState('');

    //버튼이 눌렸을 때 input의 value가 존재하는지 검사하는 함수
    // const vaildateName =(receiverName)=>{
        
    // }


    return(
        <div>
            <InputForm
                label='To.'
                placeholder='받는 사람 이름을 입력해 주세요.'
                receiverName={receiverName}
                setReceiverName={setReceiverName}/>
            <SelectBackground />
            <SubmitButton className={className} receiverName={receiverName}/>
        </div>
    )
}


export default Post;