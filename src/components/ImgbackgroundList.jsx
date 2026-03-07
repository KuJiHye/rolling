import axios from "axios";
import ImgBackgroundItem from "./ImgbackgroundItem";
import { useEffect, useState } from "react";
import styled from "styled-components";

function Imgbackgrounds({ className }){
    const [bgImgList, setBgImgList] = useState([]);

    useEffect(()=>{
        axios.get('https://rolling-api.vercel.app/background-images/')
        .then( response => setBgImgList(response.data.imageUrls) )
    },[]);
    
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