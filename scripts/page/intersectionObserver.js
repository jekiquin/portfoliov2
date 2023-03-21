const intersectionWindow = document.querySelector('.skills');
const skills = document.querySelectorAll('.skillset__item');

const options = {
  root: intersectionWindow,
  rootMargin: '-40% 0% -40%',
  threshold: [0, 1],
};

const observerCallback = (entries) => {
  console.log('here');
  entries.forEach((entry) => {
    Array.from(entry.target.children).forEach((child) => {
      if (child.classList.contains('skillset__from')) {
        child.style.transform = entry.isIntersecting
          ? 'translateX(0)'
          : 'translateX(-100%)';
        child.style.opacity = entry.isIntersecting ? '1' : '0';
      }

      if (child.classList.contains('skillset__description')) {
        child.style.transform = entry.isIntersecting
          ? 'translateX(0)'
          : 'translateX(100%)';
        child.style.opacity = entry.isIntersecting ? '1' : '0';
      }

      if (child.classList.contains('skillset__divider')) {
        child.style.opacity = entry.isIntersecting ? '1' : '0';
      }
    });
  });
};

const observer = new IntersectionObserver(observerCallback, options);
observer.root.style.border = 'solid 1px red';

export const observeSkills = () => {
  Array.from(skills).forEach((skill) => {
    observer.observe(skill);
  });
};

export const unobserveSkills = () => {
  Array.from(skills).forEach((skill) => {
    observer.unobserve(skill);
  });
};
