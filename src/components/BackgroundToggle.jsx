import styled from "styled-components";
import ToggleButton from "./BackgroundToggleButton";

function BackgroundToggle({ handleToggleClick, className, backgroundMode }){

    return(
        <ToggleList className={className}>
            <ToggleButton
                text='컬러'
                className={className}
                onClick={()=>handleToggleClick('color')}
                isActive={backgroundMode === 'color'} />
            <ToggleButton
                text='이미지'
                className={className}
                onClick={()=>handleToggleClick('img')}
                isActive={backgroundMode === 'img'} />
        </ToggleList>
    )
}

const ToggleList = styled.div`
    display: flex;
    width: 244px;
    height: 40px;
    margin-top: 24px;

    @media ${({ theme }) => theme.tablet} {
        margin: 24px 0  40px 0;

    }
    
`

export default BackgroundToggle;