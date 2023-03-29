import '../styles/styles.scss';
import { initGame } from './game/index.js';
import $ from 'jquery';
import { PAGES } from './utils/constants';
import { init, initThreeScene } from './three';
import {
  removeAvatarAnimation,
  showAvatarAnimation,
  addDescriptionsAnimation,
  removeDescriptionsAnimation,
  initSkillsIndicator,
} from './page/animations';
import { initShowDog } from './page/dog';
import { observeSkills, unobserveSkills } from './page/intersectionObserver';
import { initToken } from './page/token';
import { documentHeightUpdate } from './page/documentHeight';

// adding jquery module to vanilla js. Needed for pagepiling
window.$ = $;

// ------------------------ Event listeners ------------------------

$(document).ready(function () {
  $('.header__menu-item--about').addClass('active');
  $('#pagepiling').pagepiling({
    menu: '#menu',
    direction: 'vertical',
    verticalCentered: true,
    sectionsColor: [],
    anchors: PAGES,
    scrollingSpeed: 700,
    easing: 'swing',
    loopBottom: false,
    loopTop: false,
    css3: true,
    navigation: {
      textColor: '#93edc7',
      bulletsColor: '#93edc7',
      position: 'left',
      tooltips: PAGES,
    },
    normalScrollElements: null,
    normalScrollElementTouchThreshold: 10,
    touchSensitivity: 0.005,
    keyboardScrolling: true,
    sectionSelector: '.section',
    animateAnchor: false,

    //events
    onLeave: function (index, nextIndex, direction) {
      $(`.section#${PAGES[index - 1]}`).scrollTop(0);
      switch (PAGES[index - 1]) {
        case 'about':
          removeAvatarAnimation();
          removeDescriptionsAnimation();
          break;
        case 'skills':
          unobserveSkills();
          break;
        case 'projects':
          break;
        case 'intro':
          break;
        case 'contact':
          break;
        default:
          console.error(`${PAGES[index - 1]} not found`);
      }
    },
    afterLoad: function (anchorLink) {
      $(`.section#${anchorLink}`).scrollTop(0);

      switch (anchorLink) {
        case 'about':
          showAvatarAnimation();
          addDescriptionsAnimation();
          break;
        case 'skills':
          observeSkills();
          break;
        case 'projects':
          break;
        case 'intro':
          break;
        case 'contact':
          break;
        default:
          console.error(`${anchorLink} not found`);
      }
    },
    // afterRender: function () {},
  });
});

document.addEventListener('DOMContentLoaded', () => {
  documentHeightUpdate();
  initShowDog();
  initToken();
  initSkillsIndicator();
  initGame();
  initThreeScene();
});

addEventListener('resize', () => {
  documentHeightUpdate();
  init();
});
