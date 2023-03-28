export const pagePilingInit = (target) => {
  const ppNav = document.querySelector('#pp-nav');
  const top = -target.innerHeight / 2;
  ppNav.style.marginTop = `${top}px`;
};
