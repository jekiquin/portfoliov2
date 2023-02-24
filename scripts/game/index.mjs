import { DEFAULT_HEIGHT, DEFAULT_WIDTH } from '../utils/constants.mjs';
import HomeScene from './scene/home.mjs';

const GRAVITY = 200;

export const config = {
  type: Phaser.AUTO,
  scale: {
    mode: Phaser.Scale.RESIZE,
    parent: 'phaser-game',
    width: DEFAULT_WIDTH,
    height: DEFAULT_HEIGHT,
    max: {
      width: DEFAULT_WIDTH,
      height: DEFAULT_HEIGHT,
    },
  },
  backgroundColor: '000000',
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: GRAVITY },
      enableBody: true,
      debug: false,
    },
  },
  scene: [HomeScene],
};
