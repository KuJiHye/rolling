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
};