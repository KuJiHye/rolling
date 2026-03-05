import ToggleButton from "./BackgroundToggleButton";
import { useState } from 'react';

function BackgroundToggle(){
    const [backgroundOption, setBackgroundOption] = useState('color')

    const handleToggleClick = (mode) => {
        setBackgroundOption(mode);
    }

    return(
        <div>
            <ToggleButton
                text='컬러'
                isActive={backgroundOption==='color'}
                onClick={()=>handleToggleClick('color')}  />
            <ToggleButton
                text='이미지'
                isActive={backgroundOption==='img'}
                onClick={()=>handleToggleClick('img')}  />
        </div>
    )
}

export default BackgroundToggle;