import {
  DEFAULT_HEIGHT,
  DEFAULT_WIDTH,
  WIDTH,
  HEIGHT,
} from '../utils/constants.js';
import HomeScene from './scene/home';
import GameScene from './scene/game';

const GRAVITY = 200;

const config = {
  type: Phaser.AUTO,
  scale: {
    mode: Phaser.Scale.RESIZE,
    parent: 'phaser-game',
    width: WIDTH,
    height: HEIGHT,
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
  scene: [HomeScene, GameScene],
};

export const initGame = () => {
  const game = new Phaser.Game(config);
};
