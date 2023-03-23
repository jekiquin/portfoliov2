const foreground = document.querySelector('.projects__foreground');
const projectPage = document.querySelector('.projects');

export const initProjectParallax = () => {
  projectPage.addEventListener('mousemove', (e) => {
    const x = e.clientX;
    const y = e.clientY;
    const midX = window.innerWidth / 2;
    const height = window.innerHeight;
    // factors so that movement are as minimal as possible but still visible
    const factorX = (x - midX) / (midX * 5);
    const factorY = (y - height) / (height * 2.5);

    foreground.style.transform = `translateX(${-factorX}%)  translateY(${-factorY}%) scaleX(1.01)`;
  });
};
