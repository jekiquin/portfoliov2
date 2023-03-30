import {
  DEFAULT_WIDTH,
  DEFAULT_HEIGHT,
  HEIGHT,
  WIDTH,
} from '../../utils/constants.js';

export default class Scene extends Phaser.Scene {
  initScaler() {
    const width = this.scale.gameSize.width;
    const height = this.scale.gameSize.height;

    this.parent = new Phaser.Structs.Size(width, height);
    this.sizer = new Phaser.Structs.Size(
      DEFAULT_WIDTH,
      DEFAULT_HEIGHT,
      Phaser.Structs.Size.WIDTH_CONTROLS_HEIGHT,
      this.parent
    );

    this.parent.setSize(width, height);
    this.sizer.setSize(width, height);

    this.updateCamera();

    this.scale.on('resize', this.resize, this);
  }

  sizeScale() {
    return WIDTH / DEFAULT_WIDTH;
  }

  updateCamera() {
    const camera = this.cameras.main;

    const y = (this.parent.height - this.sizer.height) * 0.5;
    const x = 0;
    const scaleX = this.sizer.width / DEFAULT_WIDTH;
    const scaleY = this.sizer.height / DEFAULT_HEIGHT;

    console.log(
      this.sizer.height,
      this.sizer.width,
      this.parent.height,
      this.parent.width
    );
    camera.setViewport(x, y, this.sizer.width, this.sizer.height);
    console.log(scaleX, scaleY, this.sizeScale());
    camera.setZoom(scaleX, scaleY);
    camera.centerOn(this.sizer.width / 2, DEFAULT_HEIGHT / 2);
  }

  getZoom() {
    return this.cameras.main.zoom;
  }

  resize(gameSize, baseSize, displaySize, resolution) {
    const width = gameSize.width;
    const height = gameSize.height;
    console.log({ width, height });

    this.parent.setSize(width, height);
    this.sizer.setSize(width, height);

    this.updateCamera();
  }
}
