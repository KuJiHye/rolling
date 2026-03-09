import { useState } from "react";
import InputForm from "../components/InputForm";
import SelectBackground from "../components/SelectBackgound";
import SubmitButton from "../components/SubmitButton";
import MyContext from "../components/MyContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Post({ className }){
    const [receiverName, setReceiverName] = useState('');
    const [userSelectedColor, setUserSelectedColor] = useState('beige');
    const [userSelectedImg, setUserSelectedImg] = useState(0);
    const [backgroundMode, setBackgroundMode] = useState('color')
    const navigate = useNavigate();

    const handleSubmit = async () => {
        //데이터 객체
        const postData = {
            team: '23-5',
            name: receiverName,
            backgroundColor: userSelectedColor || 'beige',
            backgroundImageURL: backgroundMode === 'img' ? userSelectedImg : null
        };

        try {
            const response = await axios.post(
                `https://rolling-api.vercel.app/23-5/recipients/`,
                postData
            );

            if (response.status === 201) {
                alert("성공적으로 생성되었습니다!");
                receiverName ? navigate(`/post/${response.data.id}`) : ''
            } 
        } catch (err) {
            alert('생성에 실패했습니다.')
        }
}

    return(
        <div>
            <MyContext.Provider value={{
                userSelectedColor,
                userSelectedImg,
                setUserSelectedColor,
                setUserSelectedImg,
            }}
            >
                <InputForm
                    label='To.'
                    placeholder='받는 사람 이름을 입력해 주세요.'
                    value={receiverName}
                    onChange={setReceiverName}/>
                <SelectBackground 
                    backgroundMode={backgroundMode}
                    setBackgroundMode={setBackgroundMode}/>
                <SubmitButton
                    className={className}
                    value={receiverName}
                    onSubmit={handleSubmit}/>
            </MyContext.Provider>
        </div>
    )
}

export default Post;
