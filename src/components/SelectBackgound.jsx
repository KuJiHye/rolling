import { useEffect, useState } from "react";
import BackgroundToggle from "./BackgroundToggle";
import ColorbackgroundList from "./ColorbackgroundList";
import ImgbackgroundList from "./ImgbackgroundList";
import axios from "axios";

function SelectBackground(){
    const [backgroundMode, setBackgroundMode] = useState('color')
    const [bgImgList, setBgImgList] = useState([]);
    const [userSelectedColor, setUserSelectedColor] = useState('yellow');
    const [userSelectedImg, setUserSelectedImg] = useState(0);
    //selected 된 컴포넌트에만 check표시 렌더링, 변수가 true인지 false인지 검사하는 조건부 렌더링 사용?

    //사용자가 색깔을 누르면 userSelectedImg 바꾸는 함수
    const handleClickImg = (imgNumber)=> {
        setUserSelectedImg(imgNumber);
    }

    //사용자가 색깔을 누르면 userSelectedColor 바꾸는 함수
    const handleClickColor = (color)=> {
        setUserSelectedColor(color);
    }


    useEffect(()=>{
        axios.get('https://rolling-api.vercel.app/background-images/')
        .then( response => setBgImgList(response.data.imageUrls) )
    },[]);

    const handleToggleClick = (mode) => {
        setBackgroundMode(mode);
    }
    return(
        <div>
            <h2>배경화면을 선택해주세요.</h2>
            컬러를 선택하거나, 이미지를 선택하실 수 있습니다.
            <div>
                <BackgroundToggle backgroundMode={backgroundMode} handleToggleClick={handleToggleClick}/>
                {/*color값이 true이면 ColorbackgroundList, false이면 ImgbackgroundList */}
                {backgroundMode === 'color' ? 
                <ColorbackgroundList onClickColor={handleClickColor} userSelectedColor={userSelectedColor}/> 
                : <ImgbackgroundList bgImgList={bgImgList} onClickImg={handleClickImg} userSelectedImg={userSelectedImg}/>}
            </div>
        </div>
    )
}

export default SelectBackground;