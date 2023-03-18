import '../styles/styles.scss';
import { config } from './game/index.js';
import $ from 'jquery';
import { PAGES } from './utils/constants';

window.$ = $;

const initGame = () => {
  const game = new Phaser.Game(config);
};

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
    loopBottom: true,
    loopTop: false,
    css3: true,
    navigation: {
      textColor: '#93edc7',
      bulletsColor: '#93edc7',
      position: 'left',
      tooltips: PAGES,
    },
    normalScrollElements: null,
    normalScrollElementTouchThreshold: 5,
    touchSensitivity: 5,
    keyboardScrolling: true,
    sectionSelector: '.section',
    animateAnchor: false,

    //events
    // onLeave: function (index, nextIndex, direction) {},
    afterLoad: function (anchorLink, index) {
      $(`.section#${anchorLink}`).scrollTop(0);
    },
    // afterRender: function () {},
  });
});

document.addEventListener('DOMContentLoaded', () => {
  initGame();
});
