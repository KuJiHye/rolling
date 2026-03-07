import ImgBackgroundItem from "./ImgbackgroundItem";
import styled from "styled-components";

function Imgbackgrounds({ className, bgImgList }){

    return (
        <div className={className}>
            {bgImgList.map((item, index)=> (
                <ImgBackgroundItem key={index} data={item} />
            ))}
        </div>
    )
}
const ImgbackgroundList = styled(Imgbackgrounds)`
    display: flex;
    gap: 16px;    
`

export default ImgbackgroundList;