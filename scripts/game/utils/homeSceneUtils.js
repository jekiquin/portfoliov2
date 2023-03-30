export function addPlatform(scene) {
  scene.gameState.platforms = scene.physics.add.staticGroup();
  scene.gameState.platforms
    .create(0, 300, 'platform')
    .setScale(2, 0.01)
    .refreshBody();
}

export function addColliderAndPhysics(scene) {
  scene.gameState.logo.setVelocity(0, 60);
  scene.gameState.logo.setBounce(1, 0.6);
  scene.physics.add.collider(scene.gameState.logo, scene.gameState.platforms);
}

export function addAssets(scene) {
  scene.gameState.logo = scene.physics.add
    .image(scene.cameras.main.centerX, 0, 'logo')
    .setScale(0.5 * scene.sizeScale())
    .setOrigin(0.5, 0);

  scene.gameState.startButton = scene.add
    .image(
      scene.cameras.main.centerX,
      (3 * scene.cameras.main.centerY) / 2,
      'button'
    )
    .setScale(0.5 * scene.sizeScale())
    .setInteractive()
    .setVisible(false);

  scene.gameState.startButton.on('pointerup', () => {
    scene.scene.start('GameScene');
  });
}
