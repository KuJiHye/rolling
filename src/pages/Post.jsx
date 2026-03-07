import Button from "../components/Button";
import InputForm from "../components/InputForm";
import SelectBackground from "../components/SelectBackgound";
import SubmitButton from "../components/SubmitButton";

function Post({ className }){
    return(
        <div>
            <InputForm label='To.' placeholder='받는 사람 이름을 입력해 주세요.'/>
            <SelectBackground />
            <SubmitButton className={className}/>
        </div>
    )
}


export default Post;