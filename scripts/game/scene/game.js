import {
  gameInit,
  addTexts,
  addPlayer,
  addPlatform,
  addEnemies,
  addBoss,
  addColliders,
  genEnemyBullets,
  genEnemyMovement,
  generateEnemyGroup,
  genPlayerBullets,
  gamePointerInit,
} from '../utils/gameSceneUtils';
import { gameControls } from '../utils/gameControls';
import Scene from './scene.js';

const ENEMY_FIRE_DELAY = 3500;
const BOSS_DELAY = 7000;
const PLAYER_BULLET_DELAY = 300;

export default class GameScene extends Scene {
  constructor() {
    super({ key: 'GameScene' });
    this.gameState = {
      startTime: 0,
      bossStart: 0,
      enemyVelocity: 1,
      score: 0,
      highScore: 0,
      level: 1,
      enemyList: ['bug1', 'bug2', 'bug3', 'bug4', 'bug5'],
    };
  }

  preload() {
    this.load.image('ship', '/images/game/ship.webp');
    this.load.image('playerbullet', '/images/game/playerbullet.webp');
    this.load.image('boss', '/images/game/boss.webp');
    this.load.image('bug1', '/images/game/bug1.webp');
    this.load.image('bug2', '/images/game/bug2.webp');
    this.load.image('bug3', '/images/game/bug3.webp');
    this.load.image('bug4', '/images/game/bug4.webp');
    this.load.image('bug5', '/images/game/bug5.webp');
    this.load.image('enemybullet', '/images/game/enemybullet.webp');
    this.load.image('platform', '/images/game/platform.webp');
    this.load.image('bg', '/images/game/spaceinvadersbg.webp');
  }

  create() {
    this.initScaler();

    this.gameState.active = true;
    this.gameState.cursors = this.input.keyboard.createCursorKeys();
    this.add
      .image(this.cameras.main.centerX, this.cameras.main.centerY, 'bg')
      .setOrigin(0.5, 0.5)
      .setScale(1, 1.2);

    gameInit(this);
    gamePointerInit(this);
    addTexts(this);
    addPlayer(this, 'ship', 'playerbullet');
    addPlatform(this, 'platform');
    addEnemies(this, this.gameState.enemyList);
    genEnemyBullets(this, 'enemybullet');
    addBoss(this, 'boss');
    addColliders(this);
  }

  update(gameTime, delta) {
    if (!this.gameState.active) {
      return;
    }

    if (this.gameState.startTime === 0) {
      this.gameState.startTime = gameTime;
      return;
    }

    if (gameTime - this.gameState.startTime < ENEMY_FIRE_DELAY) {
      return;
    }

    if (
      this.periodTime === undefined ||
      this.periodTime > PLAYER_BULLET_DELAY / this.gameState.level
    ) {
      genPlayerBullets(this, 'playerbullet');
      this.periodTime = 0;
    } else {
      this.periodTime += delta;
    }

    if (this.gameState.bossStart === 0) {
      this.gameState.bossStart = gameTime;
    }

    if (this.gameState.pelletsLoop?.paused) {
      this.gameState.pelletsLoop.paused = false;
    }

    if (!this.gameState.enemies.visible) {
      this.gameState.enemies.setVisible(true);
    }

    if (
      !this.gameState.bossMove.isPlaying() &&
      gameTime - this.gameState.bossStart > BOSS_DELAY
    ) {
      this.gameState.bossMove.play();
    }

    if (!this.gameState.enemies?.getChildren().length) {
      this.gameState.level += 0.5;
      this.gameState.enemyVelocity = this.gameState.level;
      generateEnemyGroup(
        this.gameState.enemies,
        this.gameState.enemyList,
        this.sizeScale()
      );
      this.gameState.active = true;
    }

    gameControls(this);

    genEnemyMovement(this);
  }
}
