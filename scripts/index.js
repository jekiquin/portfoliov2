import '../styles/styles.scss';
import { config } from './game/index.js';
import { sectionScroller } from './utils/helpers';

const initGame = () => {
  const game = new Phaser.Game(config);
};

// ------------------------ Event listeners ------------------------

document.addEventListener('DOMContentLoaded', () => {
  initGame();
});

document.body.addEventListener('scroll', sectionScroller);
