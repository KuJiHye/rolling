import { useState } from "react";
import BackgroundToggle from "./BackgroundToggle";
import ColorbackgroundList from "./ColorbackgroundList";
import ImgbackgroundList from "./ImgbackgroundList";

function SelectBackground(){
    const [backgroundMode, setBackgroundMode] = useState('color')

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
                {backgroundMode === 'color' ? <ColorbackgroundList /> : <ImgbackgroundList />}
            </div>
        </div>
    )
}

export default SelectBackground;