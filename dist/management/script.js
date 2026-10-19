(() => {
  'use strict';
  const menu = document.querySelector('.menu-toggle');
  const navigation = document.getElementById('navigation');
  const closeMenu = () => {
    navigation.classList.remove('open');
    menu.setAttribute('aria-expanded', 'false');
    menu.setAttribute('aria-label', 'Ouvrir le menu');
  };
  menu.addEventListener('click', () => {
    const open = menu.getAttribute('aria-expanded') !== 'true';
    menu.setAttribute('aria-expanded', String(open));
    menu.setAttribute('aria-label', open ? 'Fermer le menu' : 'Ouvrir le menu');
    navigation.classList.toggle('open', open);
  });
  navigation.querySelectorAll('a').forEach(link => link.addEventListener('click', closeMenu));
  document.addEventListener('click', event => {
    if (!event.target.closest('.site-header')) closeMenu();
  });
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && menu.getAttribute('aria-expanded') === 'true') {
      closeMenu();
      menu.focus();
    }
  });
  const tabs = [...document.querySelectorAll('.demo-tabs [role="tab"]')];
  const tabList = document.querySelector('.demo-tabs');
  const orientation = matchMedia('(max-width: 620px)');
  const setOrientation = () => tabList.setAttribute('aria-orientation', orientation.matches ? 'horizontal' : 'vertical');
  setOrientation();
  orientation.addEventListener('change', setOrientation);
  const activate = (tab, focus = false) => {
    tabs.forEach(item => {
      const selected = item === tab;
      item.setAttribute('aria-selected', String(selected));
      item.tabIndex = selected ? 0 : -1;
      document.getElementById(item.getAttribute('aria-controls')).hidden = !selected;
    });
    if (focus) tab.focus();
  };
  tabs.forEach((tab, index) => {
    tab.addEventListener('click', () => activate(tab));
    tab.addEventListener('keydown', event => {
      const nextKey = orientation.matches ? 'ArrowRight' : 'ArrowDown';
      const previousKey = orientation.matches ? 'ArrowLeft' : 'ArrowUp';
      let target;
      if (event.key === nextKey) target = (index + 1) % tabs.length;
      if (event.key === previousKey) target = (index + tabs.length - 1) % tabs.length;
      if (event.key === 'Home') target = 0;
      if (event.key === 'End') target = tabs.length - 1;
      if (target !== undefined) {
        event.preventDefault();
        activate(tabs[target], true);
      }
    });
  });
  const dialog = document.getElementById('legal-dialog');
  document.getElementById('legal-open').addEventListener('click', () => dialog.showModal());
  document.getElementById('legal-close').addEventListener('click', () => dialog.close());
  dialog.addEventListener('click', event => {
    if (event.target === dialog) {
      const bounds = dialog.getBoundingClientRect();
      if (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom) dialog.close();
    }
  });
  document.getElementById('year').textContent = new Date().getFullYear();
})();
