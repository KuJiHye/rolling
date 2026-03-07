import { useNavigate, useLocation } from "react-router-dom";

function BackButton() {
  const navigate = useNavigate();
  const location = useLocation();

  // 메인 페이지에서 가리기
  if (location.pathname === "/") return null;

  return (
    <>
      <button onClick={() => navigate(-1)}>뒤로가기</button>
    </>
  );
}

export default BackButton;
