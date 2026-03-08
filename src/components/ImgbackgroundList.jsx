import { useState } from "react";
import ImgBackgroundItem from "./ImgbackgroundItem";
import styled from "styled-components";

function Imgbackgrounds({ className, bgImgList }){
    const [userSelectedImg, setUserSelectedImg] = useState(0);

    //사용자가 색깔을 누르면 userSelectedImg 바꾸는 함수
    const handleClickImg = (imgNumber)=> {
        setUserSelectedImg(imgNumber);
    }

    return (

        <div className={className}>
            {bgImgList.map((item, index)=> (
                <ImgBackgroundItem key={index} data={item} onClick={()=>handleClickImg(index)}/>
            ))}
        </div>
    )
}
const ImgbackgroundList = styled(Imgbackgrounds)`
    display: flex;
    gap: 16px;    
`

export default ImgbackgroundList;