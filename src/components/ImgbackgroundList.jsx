import BackgroundCheck from "./BackgroundCheck";
import ImgBackgroundItem from "./ImgbackgroundItem";
import styled from "styled-components";

function Imgbackgrounds({ className, bgImgList, onClickImg, userSelectedImg}){
    return (
        <div className={className}>
            {bgImgList.map((item, index)=> (
                <ImgBackgroundItem key={index} data={item} onClick={()=>onClickImg(index)}>
                    {index===userSelectedImg? <BackgroundCheck /> : ''}
                </ImgBackgroundItem>
            ))}
        </div>
    )
}
const ImgbackgroundList = styled(Imgbackgrounds)`
    display: flex;
    gap: 16px;    
`

export default ImgbackgroundList;