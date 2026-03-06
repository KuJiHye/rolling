import ToggleButton from "./BackgroundToggleButton";

function BackgroundToggle({ backgroundMode, handleToggleClick }){

    return(
        <div>
            <ToggleButton
                text='컬러'
                isActive={backgroundMode==='color'}
                onClick={()=>handleToggleClick('color')}  />
            <ToggleButton
                text='이미지'
                isActive={backgroundMode==='img'}
                onClick={()=>handleToggleClick('img')}  />
        </div>
    )
}

export default BackgroundToggle;