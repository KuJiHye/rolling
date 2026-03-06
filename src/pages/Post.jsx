import InputForm from "../components/InputForm";
import SelectBackground from "../components/SelectBackgound";

function Post(){
    return(
        <div>
            <InputForm label='To.' placeholder='이름을 입력해주세요'/>
            <SelectBackground />
        </div>
    )
}

export default Post;