//클릭 시 롤링 페이퍼 목록 페이지('/list')로 이동하는 버튼 컴포넌트
import { useNavigate } from "react-router-dom";

const ExploreButton = ({ to, children }) => {
  const navigate = useNavigate();

  ///버튼 클릭 시 목록 페이지 이동을 처리하는 핸들러 함수
  const handleListPageNavigate = () => {
    navigate(to);
  };

  return <button onClick={handleListPageNavigate}>{children}</button>;
};

export default ExploreButton;
