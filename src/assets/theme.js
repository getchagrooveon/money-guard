export const device = {
  mobileOnly: '(max-width: 479.98px)',
  mobile: '(min-width: 480px) and (max-width: 767.98px)',
  mobileAll: '(max-width: 767.98px)',
  mobileFrom: '(min-width: 480px)',
  tablet: '(min-width: 768px) and (max-width: 1279.98px)',
  tabletFrom: '(min-width: 768px)',
  tillDesktop: '(max-width: 1279.98px)',
  desktop: '(min-width: 1280px)',
};

export const theme = Object.freeze({
  colors: {
    white: 'rgba(251, 251, 251, 1)',
    black: '#000000',
    yellow: 'rgba(255, 182, 39, 1)',
    dashboardText: 'rgba(255, 134, 141, 1)',
    white60: 'rgba(255, 255, 255, 0.6)',
    white40: 'rgba(255, 255, 255, 0.4)',
    iconViolet: 'rgba(255, 255, 255, 1)',
    background: 'rgba(47, 21, 176, 0.73)',
  },
  fonts: {
    secondary: 'Poppins, sans-serif',
  },
  fontSizes: {
    xs: '12px',
    sm: '16px',
    md: '18px',
    lg: '24px',
    title: '30px',
  },
  fontWeight: {
    normal: 400,
    bold: 600,
  },
  shadows: {
    regular: '0px 4px 4px rgba(0, 0, 0, 0.25), 0px 4px 4px rgba(0, 0, 0, 0.25)',
  },
  spacing: value => `${4 * value}px`,
  animation: {
    cubicBezier: '0.25s cubic-bezier(0.7, 0.98, 0.86, 0.98)',
  },
  media: {
    mobileOnly: `@media screen and ${device.mobileOnly}`,
    mobile: `@media screen and ${device.mobile}`,
    mobileFrom: `@media screen and ${device.mobileFrom}`,
    mobileAll: `@media screen and ${device.mobileAll}`,
    tablet: `@media screen and ${device.tablet}`,
    tabletFrom: `@media screen and ${device.tabletFrom}`,
    desktop: `@media screen and ${device.desktop}`,
  },
});
