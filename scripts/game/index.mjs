import { HEIGHT, WIDTH } from '../utils/constants.mjs';

const GRAVITY = 200;

const width = Math.min(window.innerWidth, WIDTH);
const height = Math.min(window.innerHeight, HEIGHT);

function preload() {
  this.load.setBaseURL('https://labs.phaser.io');

  this.load.image('sky', 'assets/skies/space3.png');
  this.load.image('logo', 'assets/sprites/phaser3-logo.png');
  this.load.image('red', 'assets/particles/red.png');
}

function create() {
  this.add.image(400, 300, 'sky');

  var particles = this.add.particles('red');

  var emitter = particles.createEmitter({
    speed: 100,
    scale: { start: 1, end: 0 },
    blendMode: 'ADD',
  });

  var logo = this.physics.add.image(400, 100, 'logo');

  logo.setVelocity(100, 200);
  logo.setBounce(1, 1);
  logo.setCollideWorldBounds(true);

  emitter.startFollow(logo);
}

export const config = {
  type: Phaser.AUTO,
  scale: {
    parent: 'phaser-game',
    width,
    height,
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
  scene: {
    preload: preload,
    create: create,
  },
};
