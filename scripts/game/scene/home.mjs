import { DEFAULT_HEIGHT, DEFAULT_WIDTH } from '../../utils/constants.mjs';

const PULSATE_TIMING = 500;
const STOPPED_STATE = 1.25;

export default class HomeScene extends Phaser.Scene {
  constructor() {
    super({ key: 'HomeScene' });
    this.gameState = {
      pulsateTime: 0,
      pulsateToggle: true,
      logoRestStart: 0,
    };
  }

  preload() {
    this.load.image('bg', 'assets/images/game/spaceinvadersbg.webp');
    this.load.image('logo', 'assets/images/game/spaceinvaderslogo.webp');
    this.load.image('button', 'assets/images/game/spaceinvadersbutton.webp');
    this.load.image('platform', 'assets/images/game/platform.webp');
  }

  create() {
    const width = this.scale.gameSize.width;
    const height = this.scale.gameSize.height;

    this.parent = new Phaser.Structs.Size(width, height);
    this.sizer = new Phaser.Structs.Size(
      DEFAULT_WIDTH,
      DEFAULT_HEIGHT,
      Phaser.Structs.Size.HEIGHT_CONTROLS_WIDTH,
      this.parent
    );

    this.parent.setSize(width, height);
    this.sizer.setSize(width, height);

    this.backgroundScene = this.scene.get('BackgroundScene');

    this.updateCamera();

    this.scale.on('resize', this.resize, this);

    this.gameState.hideButton = true;
    this.add
      .image(this.cameras.main.centerX, this.cameras.main.centerY, 'bg')
      .setOrigin(0.5, 0.5)
      .setScale(1, 1.2);

    this.gameState.logo = this.physics.add
      .image(this.cameras.main.centerX, 0, 'logo')
      .setScale(0.5)
      .setOrigin(0.5, 0);

    this.gameState.startButton = this.add
      .image(
        this.cameras.main.centerX,
        (3 * this.cameras.main.centerY) / 2,
        'button'
      )
      .setScale(0.5)
      .setInteractive()
      .setVisible(false);

    this.gameState.startButton.on('pointerup', () => {
      this.scene.start('GameScene');
    });

    this.gameState.platforms = this.physics.add.staticGroup();
    this.gameState.platforms
      .create(270, 300, 'platform')
      .setScale(1, 0.01)
      .refreshBody();

    this.gameState.logo.setVelocity(0, 60);
    this.gameState.logo.setBounce(1, 0.6);
    this.physics.add.collider(this.gameState.logo, this.gameState.platforms);
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

  updateCamera() {
    const camera = this.cameras.main;

    const x = Math.ceil((this.parent.width - this.sizer.width) * 0.5);
    const y = 0;
    const scaleX = this.sizer.width / DEFAULT_WIDTH;
    const scaleY = this.sizer.height / DEFAULT_HEIGHT;

    camera.setViewport(x, y, this.sizer.width, this.sizer.height);
    camera.setZoom(Math.max(scaleX, scaleY));
    camera.centerOn(DEFAULT_WIDTH / 2, DEFAULT_HEIGHT / 2);
  }

  getZoom() {
    return this.cameras.main.zoom;
  }

  resize(gameSize, baseSize, displaySize, resolution) {
    const width = gameSize.width;
    const height = gameSize.height;

    this.parent.setSize(width, height);
    this.sizer.setSize(width, height);

    this.updateCamera();
  }
}
