const token = document.querySelector('.token');
const tokenSpinner = document.querySelector('.token > div');
const slot = document.querySelector('.slot');

let tokenClicked = false;
let tokenInserted = false;

export const initToken = () => {
  token.addEventListener('click', () => {
    if (!tokenClicked) tokenClicked = true;
    token.style.animation =
      'fade-in 1s 1 linear reverse forwards, scale 1s 1 linear normal forwards';
    tokenSpinner.style.animation = 'spin 0.2s infinite linear';
  });

  slot.addEventListener('click', () => {
    if (!tokenClicked) return;
    tokenInserted = true;
    slot.style.display = 'none';
    console.log({ tokenClicked, tokenInserted });
  });
};
