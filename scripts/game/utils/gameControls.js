export function gameControls(scene) {
  // player controls
  if (scene.gameState.cursors.left.isDown) {
    scene.gameState.player.setVelocityX(-160);
  } else if (scene.gameState.cursors.right.isDown) {
    scene.gameState.player.setVelocityX(160);
  } else {
    scene.gameState.player.setVelocityX(0);
  }

  const pointer = scene.input.activePointer;
  if (pointer.isDown) {
    const player = scene.gameState.player;
    const touch = pointer.x;

    player.x = touch;
  }
}
