import styled from "styled-components";
import ColorbackgroundItem from "./ColorbackgroundItem";
import BackgroundCheck from "./BackgroundCheck";

function ColorbgList({ className, onClickColor }){
    return(
        <div className={className}>
            <ColorbackgroundItem
                value='yellow'
                $hexColorCode='#FFE2AD'
                onClick={()=>onClickColor('yellow')}>
                    {<BackgroundCheck />}
            </ColorbackgroundItem>
            <ColorbackgroundItem
                value ='purple'
                $hexColorCode='#ECD9FF'
                onClick={()=>onClickColor('purple')} />
            <ColorbackgroundItem
                value='blue'
                $hexColorCode='#B1E4FF'
                onClick={()=>onClickColor('blue')} />
            <ColorbackgroundItem 
                value='green'
                $hexColorCode='#D0F5C3'
                onClick={()=>onClickColor('green')} />
        </div>
    )
}

const ColorbackgroundList = styled(ColorbgList)`
    display: inline-flex;
    align-items: flex-start;
    gap: 16px;
`

export default ColorbackgroundList;