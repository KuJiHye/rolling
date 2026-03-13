import { useEffect } from "react";

// 모달 창이 띄워졌을 때 뒤에 화면 스크롤 방지
function useNoScroll() {
  useEffect(() => {
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);
}

export default useNoScroll;
