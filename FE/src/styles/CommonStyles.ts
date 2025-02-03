export const breakpoints = {
  mobile: "480px",
  tablet: "768px",
  desktop: "1024px",
};

export const deviceMedia = {
  mobile: `@media screen and (max-width: ${breakpoints.mobile})`,
  tablet: `@media screen and (max-width: ${breakpoints.tablet})`,
  desktop: `@media screen and (max-width: ${breakpoints.desktop})`,
};
