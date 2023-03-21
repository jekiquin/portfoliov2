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

// -------------------------- skills page ------------------------------------
const skillsSection = document.querySelector('.skills');
const skillsSectionAnimateShow = 'skills--show';

export const showSkillsSection = () => {
  skillsSection.classList.add(skillsSectionAnimateShow);
};

export const hideSkillsSection = () => {
  if (skillsSection.classList.contains(skillsSectionAnimateShow)) {
    skillsSection.classList.remove(skillsSectionAnimateShow);
  }
};
