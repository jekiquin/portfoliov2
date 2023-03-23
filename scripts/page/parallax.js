const foreground = document.querySelector('.projects__foreground');
const projectPage = document.querySelector('.projects');

export const initProjectParallax = () => {
  projectPage.addEventListener('mousemove', (e) => {
    const x = e.clientX;
    const y = e.clientY;
    const midX = window.innerWidth / 2;
    const midY = window.innerHeight;
    const factorX = (x - midX) / 3000;
    const factorY = (y - midY) / 3000;

    foreground.style.transform = `translateX(${-factorX}%)  translateY(${-factorY}%) translateZ(1rem)`;
  });
};
