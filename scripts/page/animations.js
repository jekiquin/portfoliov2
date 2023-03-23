// -------------------------- about image ------------------------------------
const imageContainer = document.querySelector('.about__image-container');

const SHOW_AVATAR_CLASS = 'about__image-container--show';

export const showAvatarAnimation = () => {
  imageContainer.classList.add(SHOW_AVATAR_CLASS);
};

export const removeAvatarAnimation = () => {
  if (imageContainer.classList.contains(SHOW_AVATAR_CLASS)) {
    imageContainer.classList.remove(SHOW_AVATAR_CLASS);
  }
};

// -------------------------- about description ------------------------------------
const aboutContainer = document.querySelector('.about__context');
const contexts = Array.from(aboutContainer.children);

export const addDescriptionsAnimation = () => {
  contexts.forEach((context, idx) => {
    context.style.animation = `show-description 0.5s ease ${
      idx * 0.5 + 0.8
    }s 1 normal forwards`;
  });
};

export const removeDescriptionsAnimation = () => {
  contexts.forEach((context, idx) => {
    context.style.animation = '';
  });
};

// -------------------------- skills indicator ------------------------------------
const skillsIndicator = document.querySelector('.skills__indicator');
const skillsPage = document.querySelector('.skills');
const skillsContainer = document.querySelector('.skills__page');

export const initSkillsIndicator = () => {
  skillsPage.addEventListener('scroll', () => {
    let { height: skillsContainerHeight } =
      skillsContainer.getBoundingClientRect();
    const styles = getComputedStyle(skillsContainer);

    const factor =
      skillsPage.scrollTop /
      (skillsContainerHeight - totalHorizontalSpacing(styles));
    skillsIndicator.style.transform = `scaleX(${factor})`;
  });
};

const totalHorizontalSpacing = (styles) => {
  const {
    paddingBottom,
    paddingTop,
    marginTop,
    marginBottom,
    borderTopWidth,
    borderBottomWidth,
  } = styles;

  return [
    paddingBottom,
    paddingTop,
    marginTop,
    marginBottom,
    borderTopWidth,
    borderBottomWidth,
  ].reduce((a, b) => parseFloat(a) + parseFloat(b), 0);
};
