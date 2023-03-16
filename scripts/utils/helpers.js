const sections = document.querySelectorAll('.section');
const li = document.querySelectorAll('.header__menu-item');

const menuItem = `header__menu-item`;
const menuItemActive = `${menuItem}--active`;

export const sectionScroller = ({ target }) => {
  let current;

  sections.forEach((section) => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;
    if (target.scrollTop >= sectionTop - sectionHeight / 3) {
      current = section.getAttribute('id');
    }
  });
  li.forEach((item) => {
    if (item.classList.contains(`${menuItem}--${current}`)) {
      item.classList.add(menuItemActive);
    } else if (item.classList.contains(menuItemActive)) {
      item.classList.remove(menuItemActive);
    }
  });
};
