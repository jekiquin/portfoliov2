const dogButton = document.querySelector('.about__show-dog');
const dogImage = document.querySelector('.about__dog');
let showDog = false;

export const initShowDog = () => {
  dogButton.addEventListener('click', () => {
    if (!showDog) {
      dogImage.style.opacity = '1';
    } else {
      dogImage.style.opacity = '0';
    }

    showDog = !showDog;
  });
};
