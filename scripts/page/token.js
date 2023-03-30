import { config } from '../game';

const token = document.querySelector('.token');
const tokenSpinner = document.querySelector('.token > div');
const slot = document.querySelector('.slot');
const gameClose = document.querySelector('.game__close');
const gameDiv = document.querySelector('.game');

let tokenClicked = true;
const game = new Phaser.Game(config);

export const initToken = () => {
  token.addEventListener('click', () => {
    if (!tokenClicked) tokenClicked = true;
    token.style.animation =
      'fade-in 1s 1 linear reverse forwards, scale 1s 1 linear normal forwards';
    tokenSpinner.style.animation = 'spin 0.2s infinite linear';
  });

  slot.addEventListener('click', () => {
    if (!tokenClicked) return;

    gameDiv.style.zIndex = '999';
    gameDiv.style.opacity = '1';
  });

  gameClose.addEventListener('click', () => {
    gameDiv.style.zIndex = '-999';
    gameDiv.style.opacity = '0';
  });
};
