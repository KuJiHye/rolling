import { useEffect, useState } from "react";
import SubmitButton from "../../components/SubmitButton";
import MyContext from "../../components/MyContext";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import ToastBox from "../../components/ToastBox";
import StyleInputForm from "../../components/InputForm";
import StyledSelectBackground from "./SelectBackgound";
import { loadBackgroundImg, submitNewRollingPaper } from '../../api/axios';

function Post({ className }){
    const [receiverName, setReceiverName] = useState('');
    const [userSelectedColor, setUserSelectedColor] = useState('beige');
    const [userSelectedImg, setUserSelectedImg] = useState(0);
    const [backgroundMode, setBackgroundMode] = useState('color')
    const [bgImgList, setBgImgList] = useState([]);
    const [shouldShowToastMessage, setShouldShowToastMessage] = useState(false);
    const [toastMessage, setToastMessage] = useState('');

    const navigate = useNavigate();

    useEffect(()=>{
        const fetchImgs = async () => {
            try{
                const imgList = await loadBackgroundImg();
                setBgImgList(imgList);
            } catch(err) {
                makeToast('이미지를 가져오지 못했습니다. 새로고침을 해주세요.')
            }
        }
        fetchImgs();
    },[])

    const handleSubmit = async () => {
        //데이터 구조
        const postData = {
            team: '23-5',
            name: receiverName,
            backgroundColor: userSelectedColor || 'beige',
            backgroundImageURL: backgroundMode === 'img' ? bgImgList[userSelectedImg] : null,
        };
        
        try {
            const response = await submitNewRollingPaper(postData);
            if (response.status === 201) {                
                receiverName ? navigate(`/post/${response.data.id}`) : '';
            } 
        } catch(err){
            makeToast('생성에 실패했습니다. 다시 시도해주세요.');
        }
    }

    //enterkey가 눌렸을 때 작동할 함수
    const handleEnterPress = (e) => {
        if (e.key === 'Enter'){
            handleSubmit()
        } 
    }

    //토스트를 활성화하고 메세지를 받는 함수 -> 밖으로 빼야할 것 같다
    const makeToast = (message) =>{
        setShouldShowToastMessage(true);
        setToastMessage(message)
    }

    return(
        <>
            <MyContext.Provider value={{
                userSelectedColor,
                userSelectedImg,
                setUserSelectedColor,
                setUserSelectedImg,
                bgImgList,
                shouldShowToastMessage,
                setShouldShowToastMessage,
                makeToast,
            }}
            >
            <StyledPostPageWrapper>
                <StyleInputForm
                    label='To.'
                    placeholder='받는 사람 이름을 입력해 주세요.'
                    value={receiverName}
                    onChange={setReceiverName}
                    onEnterPress={handleEnterPress} />
                <StyledSelectBackground
                    className={className}
                    backgroundMode={backgroundMode}
                    setBackgroundMode={setBackgroundMode} />
                <SubmitButton
                    value={receiverName}
                    onSubmit={handleSubmit}/>
                {shouldShowToastMessage && (
                    <ToastBox toastMessage={toastMessage} setShowToastMessage={setShouldShowToastMessage} />
                )}
                </StyledPostPageWrapper>
            </MyContext.Provider>
        </>
    )
}

const StyledPostPageWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 720px;
    height: 1080px;
    margin: 0 auto;

    @media ${({ theme }) => theme.tablet} {
        width: 720px;
        height: 1024px;
    }

    @media ${({ theme }) => theme.mobile} {
        width: 360px;
        height: 836px;
    }
`

export default Post;
