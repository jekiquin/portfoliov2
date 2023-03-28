// this is to solve the issue with var(--doc-height) not working properly on mobile

export const documentHeightUpdate = () => {
  const doc = document.documentElement;
  doc.style.setProperty('--doc-height', `${window.innerHeight}px`);
};
