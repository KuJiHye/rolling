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

const StyledColorbackgroundList = styled(ColorbgList)`
    display: flex;
    gap: 16px;
    margin: 24px 0;
    width: 100%;

    @media ${({ theme }) => theme.tablet} {
        margin-top: 40px
    }

    @media ${({ theme }) => theme.mobile} {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        gap: 12px;
        width: 320px;
        height: 320px;
    }
`

export default StyledColorbackgroundList;