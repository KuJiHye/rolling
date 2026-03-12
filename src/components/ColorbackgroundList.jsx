import styled from "styled-components";
import ColorbackgroundItem from "./ColorbackgroundItem";
import BackgroundCheck from "./BackgroundCheck";

function ColorbgList({ className, onClickColor, userSelectedColor }){
    return(
        <div className={className}>
            <ColorbackgroundItem
                value='beige'
                $hexColorCode='#FFE2AD'
                onClick={()=>onClickColor('beige')}>
                {userSelectedColor === 'beige' ? <BackgroundCheck/> :''}
            </ColorbackgroundItem>
            <ColorbackgroundItem
                value ='purple'
                $hexColorCode='#ECD9FF'
                onClick={()=>onClickColor('purple')}>
                {userSelectedColor === 'purple'? <BackgroundCheck/> :''}
            </ColorbackgroundItem>
            <ColorbackgroundItem
                value='blue'
                $hexColorCode='#B1E4FF'
                onClick={()=>onClickColor('blue')}>
                {userSelectedColor === 'blue'? <BackgroundCheck/> :''}
            </ColorbackgroundItem>
            <ColorbackgroundItem 
                value='green'
                $hexColorCode='#D0F5C3'
                onClick={()=>onClickColor('green')}>
                {userSelectedColor === 'green'? <BackgroundCheck /> :''} 
            </ColorbackgroundItem>
        </div>
    )
}

const ColorbackgroundList = styled(ColorbgList)`
    display: inline-flex;
    gap: 16px;
    margin: 24px 0;

    @media (max-width:1200px) {
        margin-top: 40px;
    }

    @media screen and (max-width: 480px) {
         display: grid;
         grid-template-columns: repeat(2, 1fr);
         gap: 12px;
         height: 66px;
     }
`

export default ColorbackgroundList;