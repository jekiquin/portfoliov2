export function gameControls(scene) {
  // player controls
  if (scene.gameState.cursors.left.isDown) {
    scene.gameState.player.setVelocityX(-160);
  } else if (scene.gameState.cursors.right.isDown) {
    scene.gameState.player.setVelocityX(160);
  } else {
    scene.gameState.player.setVelocityX(0);
  }
}
