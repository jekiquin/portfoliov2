import { config } from './game/index.mjs';

const initGame = () => {
  new Phaser.Game(config);
};

document.addEventListener('DOMContentLoaded', () => {
  initGame();
});
