import {
  addAssets,
  addColliderAndPhysics,
  addPlatform,
} from '../utils/homeSceneUtils.js';
import Scene from './scene.js';

const PULSATE_TIMING = 500;
const STOPPED_STATE = 1.25;
export default class HomeScene extends Scene {
  constructor() {
    super({ key: 'HomeScene' });
    this.gameState = {
      pulsateTime: 0,
      pulsateToggle: true,
      logoRestStart: 0,
    };
  }

  preload() {
    this.load.image('bg', '/images/game/spaceinvadersbg.webp');
    this.load.image('logo', '/images/game/spaceinvaderslogo.webp');
    this.load.image('button', '/images/game/spaceinvadersbutton.webp');
    this.load.image('platform', '/images/game/platform.webp');
  }

  create() {
    this.initScaler();

    this.gameState.hideButton = true;
    this.add
      .image(this.cameras.main.centerX, this.cameras.main.centerY, 'bg')
      .setOrigin(0.5, 0.5)
      .setScale(1, 1.2);

    addAssets(this);
    addPlatform(this);
    addColliderAndPhysics(this);
  }

  update(gameTime) {
    if (gameTime - this.gameState.pulsateTime > PULSATE_TIMING) {
      this.gameState.pulsateTime = gameTime;
      const buttonScale = this.gameState.pulsateToggle ? 0.52 : 0.5;
      this.gameState.startButton.setScale(buttonScale);
      this.gameState.pulsateToggle = !this.gameState.pulsateToggle;
    }

    if (
      this.gameState.hideButton &&
      this.gameState.logo.body.acceleration.y === 0 &&
      this.gameState.logo.body.velocity.y < -STOPPED_STATE
    ) {
      this.gameState.hideButton = false;
      this.gameState.startButton.setVisible(true);
    }
  }
}
