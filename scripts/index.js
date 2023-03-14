import { config } from './game/index.js';
import '../styles/styles.scss';

const initGame = () => {
  const game = new Phaser.Game(config);
};

document.addEventListener('DOMContentLoaded', () => {
  initGame();
});
