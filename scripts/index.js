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
  showSkillsSection,
  hideSkillsSection,
} from './page/animations';
import { initShowDog } from './page/dog';

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
    normalScrollElementTouchThreshold: 3,
    touchSensitivity: 5,
    keyboardScrolling: true,
    sectionSelector: '.section',
    animateAnchor: false,

    //events
    onLeave: function (index, nextIndex, direction) {
      if (PAGES[index - 1] === 'about') {
        removeAvatarAnimation();
        removeDescriptionsAnimation();
      }
      if (PAGES[index - 1] === 'skills') {
        hideSkillsSection();
      }
    },
    afterLoad: function (anchorLink) {
      $(`.section#${anchorLink}`).scrollTop(0);

      if (anchorLink === 'about') {
        showAvatarAnimation();
        addDescriptionsAnimation();
      }

      if (anchorLink === 'skills') {
        console.log('skills in');
        showSkillsSection();
      }
    },
    // afterRender: function () {},
  });
});

document.addEventListener('DOMContentLoaded', () => {
  initShowDog();
  initGame();
  initThreeScene();
});

addEventListener('resize', () => {
  init();
});
