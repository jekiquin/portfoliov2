const intersectionWindow = document.querySelector('.skills');
const skills = document.querySelectorAll('.skillset__item');
const cta = document.querySelector('.skills__cta');

const options = {
  root: intersectionWindow,
  rootMargin: '-40% 0% -40%',
  threshold: [0, 1],
};

const observerCallback = (entries) => {
  console.log('here');
  entries.forEach((entry) => {
    const { target, isIntersecting } = entry;
    if (target.classList.contains('skills__cta')) {
      target.style.opacity = isIntersecting ? '1' : '0';
    }
    Array.from(target.children).forEach((child) => {
      if (child.classList.contains('skillset__from')) {
        child.style.transform = isIntersecting
          ? 'translateX(0)'
          : 'translateX(-100%)';
        child.style.opacity = isIntersecting ? '1' : '0';
      }

      if (child.classList.contains('skillset__description')) {
        child.style.transform = isIntersecting
          ? 'translateX(0)'
          : 'translateX(100%)';
        child.style.opacity = isIntersecting ? '1' : '0';
      }

      if (child.classList.contains('skillset__divider')) {
        child.style.opacity = entry.isIntersecting ? '1' : '0';
      }
    });
  });
};

const observer = new IntersectionObserver(observerCallback, options);

export const observeSkills = () => {
  observer.observe(cta);
  Array.from(skills).forEach((skill) => {
    observer.observe(skill);
  });
};

export const unobserveSkills = () => {
  observer.unobserve(cta);
  Array.from(skills).forEach((skill) => {
    observer.unobserve(skill);
  });
};
