import { useEffect } from "react";
import styled from "styled-components";
import close from '../assets/close.svg'


function ToastBox({ toastMessage, setShowToastMessage }){
  
  useEffect(()=>{
    const toastTimer = setTimeout(()=>{
      setShowToastMessage(false)
    },3000)
  })

  const handleClickClose = () => {
    setShowToastMessage(false);
  }

  return(
    <Toast>  
      {toastMessage}
      <CloseIcon src={close} onClick={handleClickClose} />
    </Toast>
  )
}

const Toast = styled.div`
  display:flex;
  justify-content: space-between;
  align-items: center;
  position: fixed;
  bottom: 30px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 9999;
  width: 500px;
  padding: 19px 30px;
  border-radius: 8px;
  background: rgba(0, 0, 0, 0.80);
  color: #FFFFFF;
`

const CloseIcon = styled.img`
  text-align: right;
  width: 15.414px;
  height: 15.414px;
  cursor:pointer;
`

export default ToastBox;