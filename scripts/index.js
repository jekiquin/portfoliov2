import '../styles/styles.scss';
import { init, initThreeScene } from './three';
import { initSkillsIndicator } from './page/animations';
import { initShowDog } from './page/dog';
import { initToken } from './page/token';
import { documentHeightUpdate } from './page/documentHeight';
import { pagePilingInit, pagePilingMobile } from './page/pagePiling';
import { initGame } from './game';

// ------------------------ Event listeners ------------------------

document.addEventListener('DOMContentLoaded', () => {
  pagePilingInit();
  pagePilingMobile();
  documentHeightUpdate();
  initShowDog();
  initToken();
  initSkillsIndicator();
  initThreeScene();
  initGame();
});

addEventListener('resize', () => {
  pagePilingMobile();
  documentHeightUpdate();
  init();
});
