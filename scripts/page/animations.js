const imageContainer = document.querySelector('.about__image-container');
const showAvatarClass = 'about__image-container--show';

export const showAvatarAnimation = () => {
  imageContainer.classList.add(showAvatarClass);
};

export const removeAvatarAnimation = () => {
  if (imageContainer.classList.contains(showAvatarClass)) {
    imageContainer.classList.remove(showAvatarClass);
  }
};
