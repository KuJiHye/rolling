import { useEffect, useState } from "react";
import InputForm from "../components/InputForm";
import SelectBackground from "../components/SelectBackgound";
import SubmitButton from "../components/SubmitButton";
import MyContext from "../components/MyContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

function Post({ className }){
    const [receiverName, setReceiverName] = useState('');
    const [userSelectedColor, setUserSelectedColor] = useState('beige');
    const [userSelectedImg, setUserSelectedImg] = useState(0);
    const [backgroundMode, setBackgroundMode] = useState('color')
    const [bgImgList, setBgImgList] = useState([]);
    const navigate = useNavigate();

    useEffect(()=>{
        axios.get('https://rolling-api.vercel.app/background-images/')
        .then( response => {setBgImgList(response.data.imageUrls)} )
    },[]);


    const handleSubmit = async () => {
        //데이터 구조
        const postData = {
            team: '23-5',
            name: receiverName,
            backgroundColor: userSelectedColor || 'beige',
            backgroundImageURL: backgroundMode === 'img' ? bgImgList[userSelectedImg] : null,
        };

        //배경 .... backgroundMode가 img이면 이미지 URL 전달
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
            alert('생성에 실패했습니다.');
        }
}

    return(
        <>
            <MyContext.Provider value={{
                userSelectedColor,
                userSelectedImg,
                setUserSelectedColor,
                setUserSelectedImg,
                bgImgList,
            }}
            >
            <PostPageLayout>
                <InputFormLayout
                    label='To.'
                    placeholder='받는 사람 이름을 입력해 주세요.'
                    value={receiverName}
                    onChange={setReceiverName} />
                <SelectBackgroundLayout
                    className={className}
                    backgroundMode={backgroundMode}
                    setBackgroundMode={setBackgroundMode} />
                <SubmitButton
                    value={receiverName}
                    onSubmit={handleSubmit}/>
                </PostPageLayout>
            </MyContext.Provider>
        </>
    )
}

const PostPageLayout = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    padding: 57px;
`
const InputFormLayout = styled(InputForm)`
    max-width: 720px;
    padding-top: 20px
`

const SelectBackgroundLayout = styled(SelectBackground)`
    max-width: 720px;
    padding-top: 50px;
`

export default Post;
