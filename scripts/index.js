import '../styles/styles.scss';
import { config } from './game/index.js';
import $ from 'jquery';

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
    anchors: ['about', 'skills', 'projects'],
    scrollingSpeed: 700,
    easing: 'swing',
    loopBottom: false,
    loopTop: false,
    css3: true,
    navigation: {
      textColor: '#000',
      bulletsColor: '#000',
      position: 'left',
      tooltips: ['about', 'skills', 'projects'],
    },
    normalScrollElements: null,
    normalScrollElementTouchThreshold: 5,
    touchSensitivity: 5,
    keyboardScrolling: true,
    sectionSelector: '.section',
    animateAnchor: false,

    //events
    // onLeave: function (index, nextIndex, direction) {},
    // afterLoad: function (anchorLink, index) {},
    // afterRender: function () {},
  });
});

document.addEventListener('DOMContentLoaded', () => {
  initGame();
});
