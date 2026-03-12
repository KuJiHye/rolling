import { useContext } from "react";
import BackgroundToggle from "./BackgroundToggle";
import StyledColorbackgroundList from "./ColorbackgroundList";
import StyledImgBackgroundList from "./ImgbackgroundList";
import MyContext from "./MyContext";
import styled from "styled-components";

function SelectBackground({ backgroundMode, setBackgroundMode, className }){
    
    const { userSelectedColor, userSelectedImg, setUserSelectedImg, setUserSelectedColor, bgImgList } = useContext(MyContext);

    //사용자가 색깔을 누르면 userSelectedImg 바꾸는 함수
    const handleClickImg = (imgNumber)=> {
        setUserSelectedImg(imgNumber);
    }

    //사용자가 색깔을 누르면 userSelectedColor 바꾸는 함수
    const handleClickColor = (color)=> {
        setUserSelectedColor(color);
    }
    
    const handleToggleClick = (mode) => {
        setBackgroundMode(mode);
    }

    return(
        <div className={className}>
            <StyledPlzSelectbg> 배경화면을 선택해 주세요.</StyledPlzSelectbg>
            <StyledSubPlzSelectbg>컬러를 선택하거나, 이미지를 선택하실 수 있습니다.</StyledSubPlzSelectbg>
            {/* <BackgroundSelector> */}
                <BackgroundToggle
                    backgroundMode={backgroundMode}
                    handleToggleClick={handleToggleClick} />
                {/*color값이 true이면 ColorbackgroundList, false이면 ImgbackgroundList */}
                {backgroundMode === 'color' ? 
                <StyledColorbackgroundList onClickColor={handleClickColor} userSelectedColor={userSelectedColor}/> 
                : <StyledImgBackgroundList onClickImg={handleClickImg} userSelectedImg={userSelectedImg}/>}
            {/* </BackgroundSelector> */}
        </div>
    )
}

const StyledSelectBackground = styled(SelectBackground)`
    width: 100%;
    margin-top: 50px;

    @media ${({ theme }) => theme.tablet} {
        margin: 54px 0 24px 0;
    }
`

const StyledPlzSelectbg = styled.div`
    color: var(--gray-900, #181818);
    font-family: Pretendard;
    font-size: 24px;
    font-style: normal;
    font-weight: 700;
    line-height: 36px;
    letter-spacing: -0.24px;
    
`

const StyledSubPlzSelectbg = styled.span`
    color: var(--gray-500, #555);
    font-family: Pretendard;
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    line-height: 26px;
    letter-spacing: -0.16px;
`


export default StyledSelectBackground;