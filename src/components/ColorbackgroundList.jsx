import styled from "styled-components";
import ColorbackgroundItem from "./ColorbackgroundItem";
import BackgroundCheck from "./BackgroundCheck";

function ColorbgList({className}){
    return(
        <div className={className}>
            <ColorbackgroundItem $hexColorCode='#FFE2AD'>{<BackgroundCheck />}</ColorbackgroundItem>
            <ColorbackgroundItem $hexColorCode='#ECD9FF' />
            <ColorbackgroundItem $hexColorCode='#B1E4FF' />
            <ColorbackgroundItem $hexColorCode='#D0F5C3' />
        </div>
    )
}

const ColorbackgroundList = styled(ColorbgList)`
    display: inline-flex;
    align-items: flex-start;
    gap: 16px;
`

export default ColorbackgroundList;