import { config } from './game/index.mjs';

const initGame = () => {
  const game = new Phaser.Game(config);
};

document.addEventListener('DOMContentLoaded', () => {
  initGame();
});
