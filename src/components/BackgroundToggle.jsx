import ToggleButton from "./BackgroundToggleButton";

function BackgroundToggle({ handleToggleClick }){

    return(
        <div>
            <ToggleButton
                text='컬러'
                onClick={()=>handleToggleClick('color')}  />
            <ToggleButton
                text='이미지'
                onClick={()=>handleToggleClick('img')}  />
        </div>
    )
}

export default BackgroundToggle;