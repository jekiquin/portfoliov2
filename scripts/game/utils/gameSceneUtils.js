const BOSS_START = -200;

const DROP = 10;
const TEXT_STYLE = {
  fontFamily: 'Game',
  stroke: '#FF0000',
  strokeThickness: 2,
};

export function gameInit(scene) {
  scene.gameState.enemyVelocity = 1;
  scene.gameState.startTime = 0;
  scene.gameState.bossStart = 0;
  scene.gameState.score = 0;
  scene.gameState.level = 1;
}

export function gamePointerInit(scene) {
  scene.input.addPointer();
}

export function addTexts(scene) {
  const { width, height } = scene.sizer;
  scene.gameState.scoreText = scene.add
    .text(
      10,
      height - 20 * scene.sizeScale(),
      `Score: ${scene.gameState.score}`,
      {
        ...TEXT_STYLE,
        fontSize: '12px',
      }
    )
    .setOrigin(0, 0);
  scene.gameState.highScoreText = scene.add
    .text(
      width - 10,
      height - 20 * scene.sizeScale(),
      `High Score: ${scene.gameState.highScore}`,
      {
        ...TEXT_STYLE,
        fontSize: '12px',
      }
    )
    .setOrigin(1, 0);

  // deleting texts
  if (scene.gameState.gameOverText) {
    scene.gameState.gameOverText.destroy();
  }
  if (scene.gameState.yesText) {
    scene.gameState.yesText.destroy();
  }
  if (scene.gameState.noText) {
    scene.gameState.noText.destroy();
  }
}

export function addPlayer(scene, player) {
  const { width } = scene.sizer;
  scene.gameState.player = scene.physics.add
    .sprite(width / 2, 200, player)
    .setScale(0.3);
  scene.gameState.player.setPosition(
    scene.cameras.main.centerX,
    scene.cameras.main.centerY
  );
  scene.gameState.player.setCollideWorldBounds(true);

  scene.gameState.playerBullet = scene.physics.add.group();
}

export function addPlatform(scene, platform) {
  const { width, height } = scene.sizer;
  scene.gameState.platforms = scene.physics.add.staticGroup();
  scene.gameState.platforms
    .create(width / 2, height - 20 * scene.sizeScale(), platform)
    .setScale(1, 0.01)
    .refreshBody();
}

export function addEnemies(scene, enemies) {
  if (scene.gameState.enemies) {
    scene.gameState.enemies.destroy();
  }
  scene.gameState.enemies = scene.physics.add.group();
  generateEnemyGroup(scene.gameState.enemies, enemies, scene.sizeScale());
  scene.gameState.enemies.setVisible(false);

  if (scene.gameState.pellets) {
    scene.gameState.pellets.destroy();
  }
  scene.gameState.pellets = scene.physics.add.group();
}

export function addBoss(scene, boss) {
  if (scene.gameState.boss) {
    scene.gameState.boss.destroy();
  }
  scene.gameState.boss = scene.physics.add
    .sprite(BOSS_START, 30 * scene.sizeScale(), boss)
    .setGravityY(-200)
    .setScale(0.5)
    .setOrigin(1, 0);

  scene.gameState.bossMove = scene.tweens.add({
    targets: scene.gameState.boss,
    x: {
      getStart: () => BOSS_START,
      getEnd: () => scene.sizer.width - BOSS_START,
    },
    ease: 'Linear',
    duration: 6000,
    repeat: -1,
    yoyo: false,
    repeatDelay: 1000,
  });

  scene.gameState.bossMove.stop(BOSS_START);
}

export function addColliders(scene) {
  scene.physics.add.collider(scene.gameState.player, scene.gameState.platforms);

  scene.physics.add.overlap(
    scene.gameState.playerBullet,
    scene.gameState.pellets,
    (bullet, pellet) => {
      if (Math.random() < 0.8) {
        scene.gameState.score += 1;
        displayScores(scene);
        bullet.destroy();
        pellet.destroy();
      }
    }
  );

  scene.physics.add.collider(
    scene.gameState.playerBullet,
    scene.gameState.enemies,
    (bullet, enemy) => {
      switch (enemy.texture.key) {
        case 'bug1':
          scene.gameState.score += 20;
          break;
        case 'bug2':
          scene.gameState.score += 15;
          break;
        case 'bug3':
          scene.gameState.score += 10;
          break;
        case 'bug4':
          scene.gameState.score += 5;
          break;
        case 'bug5':
        default:
          scene.gameState.score += 2;
          break;
      }
      displayScores(scene);
      enemy.destroy();
      bullet.destroy();
    }
  );

  scene.physics.add.overlap(
    scene.gameState.playerBullet,
    scene.gameState.bossMove.targets[0],
    (_, bullet) => {
      bullet.destroy();
      scene.gameState.bossMove.stop(BOSS_START);
      scene.gameState.bossStart = 0;
      scene.gameState.score += 50;
      displayScores(scene);
    }
  );

  scene.physics.add.overlap(
    scene.gameState.pellets,
    scene.gameState.player,
    () => {
      gamePlayEnd(scene);
    }
  );

  scene.physics.add.overlap(
    scene.gameState.enemies,
    scene.gameState.player,
    () => {
      gamePlayEnd(scene);
    }
  );

  scene.physics.add.collider(
    scene.gameState.platforms,
    scene.gameState.enemies,
    () => {
      gamePlayEnd(scene);
    }
  );
}

export function genPlayerBullets(scene, bullet) {
  scene.gameState.playerBullet
    .create(scene.gameState.player.x, scene.gameState.player.y, bullet)
    .setScale(0.5)
    .setGravityY(-400);
}

export function genEnemyBullets(scene, enemyBullet) {
  if (scene.gameState.pelletsLoop) {
    scene.gameState.pelletsLoop.destroy();
  }
  scene.gameState.pelletsLoop = scene.time.addEvent({
    delay: 300,
    callback: () =>
      genPellet(scene.gameState, scene.gameState.pellets, enemyBullet),
    callbackScope: scene,
    loop: true,
    paused: true,
  });
}

export function genEnemyMovement(scene) {
  const { width } = scene.sizer;
  const totalEnemies = scene.gameState.enemies?.getChildren().length;
  if (!totalEnemies) {
    scene.gameState.playerBullet
      .getChildren()
      .forEach((bullet) => bullet.destroy());
    scene.gameState.pellets.getChildren().forEach((pellet) => pellet.destroy());
    // gamePlayEnd(scene);
    scene.gameState.active = false;
    return;
  }

  const sortedEnemies = scene.gameState.enemies
    .getChildren()
    .sort((a, b) => a.x - b.x);
  scene.gameState.leftMostBug = sortedEnemies[0];
  scene.gameState.rightMostBug = sortedEnemies[sortedEnemies.length - 1];

  const isBoundary =
    scene.gameState.leftMostBug.x < 10 ||
    scene.gameState.rightMostBug.x > width - 10;

  if (isBoundary) {
    scene.gameState.enemyVelocity *= -1;
  }

  scene.gameState.enemies.getChildren().forEach((enemy) => {
    if (isBoundary) {
      enemy.y += DROP;
    }
    enemy.x += scene.gameState.enemyVelocity;
  });
}

export function generateEnemyGroup(enemyGroup, enemies, scale) {
  const factor = 50 * scale;

  for (let yEnemies = 1; yEnemies < 6; yEnemies++) {
    for (let xEnemies = 1; xEnemies < 11; xEnemies++) {
      enemyGroup
        .create(
          factor * xEnemies,
          factor + factor * yEnemies,
          enemies[yEnemies - 1]
        )
        .setScale(0.3 * scale)
        .setGravityY(-200);
    }
  }
}

function displayScores(scene) {
  scene.gameState.scoreText.setText(`Score: ${scene.gameState.score}`);
  scene.gameState.highScore = getHighScores(
    scene.gameState.score,
    scene.gameState.highScore
  );
  scene.gameState.highScoreText.setText(
    `High Score: ${scene.gameState.highScore}`
  );
}

function getHighScores(score, highScore) {
  return highScore >= score ? highScore : score;
}

function genPellet(gameState, pellets, enemyBullet) {
  const randomBug = Phaser.Utils.Array.GetRandom(
    gameState.enemies.getChildren()
  );
  if (!randomBug) {
    return;
  }
  pellets.create(randomBug.x, randomBug.y, enemyBullet).setScale(0.3);
}

function gamePlayEnd(scene) {
  scene.gameState.active = false;
  scene.physics.pause();
  if (scene.gameState.pelletsLoop) {
    scene.gameState.pelletsLoop.destroy();
  }

  scene.gameState.bossMove.stop();

  gameInit(scene);
  gameOverTexts(scene);
}

function gameOverTexts(scene) {
  const { width, height } = scene.sizer;
  scene.gameState.gameOverText = scene.add
    .text(width / 2, height / 2, 'GAME OVER! PLAY AGAIN?', TEXT_STYLE)
    .setOrigin(0.5, 0.5);
  scene.gameState.yesText = scene.add
    .text(width / 2, height / 2 + 40 * scene.sizeScale(), 'YES', TEXT_STYLE)
    .setOrigin(0.5, 0.5)
    .setInteractive();
  scene.gameState.noText = scene.add
    .text(width / 2, height / 2 + 80 * scene.sizeScale(), 'NO', TEXT_STYLE)
    .setOrigin(0.5, 0.5)
    .setInteractive();

  hoverOverTexts(scene.gameState.yesText);
  hoverOverTexts(scene.gameState.noText);

  scene.gameState.yesText.on('pointerup', () => {
    scene.scene.restart();
  });

  scene.gameState.noText.on('pointerup', () => {
    scene.scene.start('HomeScene');
  });
}

function hoverOverTexts(textObject) {
  textObject.on('pointerover', () => {
    textObject.setScale(1.2);
  });

  textObject.on('pointerout', () => {
    textObject.setScale(1);
  });
}
