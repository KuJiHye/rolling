function BackgroundToggleButton({ text, isActive, onClick }){
    return(
        <button onClick={onClick}>{text}{isActive ? "v" : " "}</button>
    )
}

export default BackgroundToggleButton;