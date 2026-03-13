const size = {
  mobile: "768px",
  tablet: "1024px",

  //추가
  pc: "1200px",
};

export const device = {
  mobile: `(max-width: ${size.mobile})`,
  tablet: `(max-width: ${size.tablet})`,
  pc: `(min-width: ${size.pc})`,

  // 메인 페이지에서만 사용
  mainMobile: `(max-width: 767px)`,
  mainTablet: `(min-width: 768px)`,
};