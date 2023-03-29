import { genPlayerBullets } from './gameSceneUtils';

export function gameControls(scene, playerBullet) {
  // player controls
  if (scene.gameState.cursors.left.isDown) {
    scene.gameState.player.setVelocityX(-160);
  } else if (scene.gameState.cursors.right.isDown) {
    scene.gameState.player.setVelocityX(160);
  } else {
    scene.gameState.player.setVelocityX(0);
  }

  // player shot
  if (
    scene.gameState.enemies &&
    Phaser.Input.Keyboard.JustDown(scene.gameState.cursors.space)
  ) {
    genPlayerBullets(scene, playerBullet);
  }
}
