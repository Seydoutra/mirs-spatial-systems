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
  let previewMotion = () => {};
  const activate = (tab, focus = false) => {
    tabs.forEach(item => {
      const selected = item === tab;
      item.setAttribute('aria-selected', String(selected));
      item.tabIndex = selected ? 0 : -1;
      document.getElementById(item.getAttribute('aria-controls')).hidden = !selected;
    });
    if (focus) tab.focus();
    previewMotion(document.getElementById(tab.getAttribute('aria-controls')));
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

  let priceMotion = () => {};
  const prices = [...document.querySelectorAll('.price-amount')];
  const billingButtons = [...document.querySelectorAll('[data-period]')];
  const currency = new Intl.NumberFormat('fr-FR');
  billingButtons.forEach(button => button.addEventListener('click', () => {
    const annual = button.dataset.period === 'annual';
    billingButtons.forEach(item => item.setAttribute('aria-pressed', String(item === button)));
    prices.forEach((price, index) => {
      const card = price.closest('.pricing-card');
      price.textContent = currency.format(Number(price.dataset[annual ? 'annual' : 'monthly']));
      card.querySelector('.price-period').textContent = annual ? '/ an' : '/ mois';
      card.querySelector('.price-caption').textContent = annual ? `${currency.format(Number(price.dataset.annual) / 12)} GNF / mois en équivalent` : 'Facturation mensuelle';
      priceMotion(price, index);
    });
    document.getElementById('pricing-status').textContent = annual ? 'Tarifs annuels affichés, avec une réduction de 10 %.' : 'Tarifs mensuels affichés.';
  }));
  initMotion();

  function initMotion() {
    const root = document.documentElement;
    const preference = matchMedia('(prefers-reduced-motion: reduce)');
    const capable = typeof Element.prototype.animate === 'function' && 'IntersectionObserver' in window;
    const controls = [...document.querySelectorAll('.motion-toggle, .motion-toggle-text')];
    const active = new Set();
    const counters = new Set();
    let userPaused = new URLSearchParams(location.search).get('animations') === 'off';
    try { userPaused = userPaused || sessionStorage.getItem('mirs-landing-motion') === 'paused'; } catch { /* Preferences are optional. */ }
    let productVisible = false;
    let hoveringProduct = false;
    let manualPreview = false;
    let cycleTimer;
    const product = document.getElementById('apercu');
    const allowed = () => capable && !preference.matches && !userPaused;

    const animate = (element, frames, options = {}) => {
      if (!element || !allowed()) return;
      const job = element.animate(frames, { duration: 750, easing: 'cubic-bezier(.2,.7,.2,1)', fill: 'both', ...options });
      active.add(job);
      const clear = () => { active.delete(job); job.cancel(); };
      job.onfinish = clear;
      job.oncancel = () => active.delete(job);
      return job;
    };
    priceMotion = (element, index) => animate(element, [{ opacity: .2, transform: 'translateY(7px)' }, { opacity: 1, transform: 'translateY(0)' }], { duration: 400, delay: index * 50 });
    const reveal = (element, delay = 0, distance = 24) => animate(element, [
      { opacity: 0, transform: `translateY(${distance}px)` },
      { opacity: 1, transform: 'translateY(0)' },
    ], { delay });

    const count = (element, end, digits = 0) => {
      if (!allowed() || !element || element.dataset.counted) return;
      element.dataset.counted = 'true';
      const text = [...element.childNodes].find(node => node.nodeType === Node.TEXT_NODE && /\d/.test(node.textContent));
      if (!text) return;
      const number = document.createElement('span');
      number.className = 'animated-count';
      number.setAttribute('aria-hidden', 'true');
      const original = text.textContent;
      const accessibleNumber = document.createElement('span');
      accessibleNumber.className = 'sr-only';
      accessibleNumber.textContent = `${String(end).padStart(digits, '0')} `;
      number.textContent = String(end).padStart(digits, '0');
      text.replaceWith(accessibleNumber, number);
      const tail = original.replace(/\d+/, '');
      if (tail) number.after(document.createTextNode(tail));
      const start = performance.now();
      const counter = { frame: 0, finish: () => { cancelAnimationFrame(counter.frame); number.textContent = String(end).padStart(digits, '0'); counters.delete(counter); } };
      counters.add(counter);
      const tick = now => {
        if (!allowed()) return counter.finish();
        const progress = Math.min(1, (now - start) / 1250);
        const value = Math.round(end * (1 - Math.pow(1 - progress, 3)));
        number.textContent = String(value).padStart(digits, '0');
        if (progress < 1) counter.frame = requestAnimationFrame(tick);
        else counter.finish();
      };
      counter.frame = requestAnimationFrame(tick);
    };

    previewMotion = panel => {
      if (!allowed() || !panel) return;
      panel.querySelectorAll('.metric-grid>div, .kanban article, .finance-summary>div, .table-row:not(.table-head)').forEach((element, index) => reveal(element, index * 85, 12));
      panel.querySelectorAll('.metric-grid strong').forEach(element => {
        const text = element.firstChild?.textContent.trim() || '';
        if (/^\d+$/.test(text)) count(element, Number(text), text.length);
      });
      panel.querySelectorAll('.metric-track i').forEach((element, index) => {
        element.style.transformOrigin = 'left';
        animate(element, [{ transform: 'scaleX(0)' }, { transform: 'scaleX(1)' }], { duration: 1100, delay: 180 + index * 100 });
      });
      panel.querySelectorAll('.chart-area path[stroke]').forEach(path => {
        const length = path.getTotalLength();
        path.style.strokeDasharray = `${length}`;
        const job = animate(path, [{ strokeDashoffset: `${length}` }, { strokeDashoffset: '0' }], { duration: 1700, delay: 180 });
        if (job) {
          const clear = job.onfinish;
          job.onfinish = () => { path.style.removeProperty('stroke-dasharray'); clear(); };
          job.oncancel = () => { path.style.removeProperty('stroke-dasharray'); active.delete(job); };
        }
      });
      panel.querySelectorAll('.chart-area path[fill]').forEach(path => animate(path, [{ opacity: 0 }, { opacity: 1 }], { duration: 1200, delay: 400 }));
      panel.querySelectorAll('.task').forEach((element, index) => reveal(element, 220 + index * 120, 8));
    };

    const schedulePreview = () => {
      clearTimeout(cycleTimer);
      if (!allowed() || document.hidden || !productVisible || hoveringProduct || manualPreview) return;
      cycleTimer = setTimeout(() => {
        if (!allowed() || document.hidden || hoveringProduct || manualPreview) return;
        const current = tabs.findIndex(tab => tab.getAttribute('aria-selected') === 'true');
        activate(tabs[(current + 1) % tabs.length]);
        schedulePreview();
      }, 8000);
    };
    const update = () => {
      root.dataset.motion = allowed() ? 'running' : preference.matches ? 'reduced' : 'paused';
      root.classList.toggle('motion-hidden', document.hidden);
      const label = preference.matches ? 'Animations réduites selon vos préférences' : allowed() ? 'Mettre les animations en pause' : 'Activer les animations';
      controls.forEach(button => {
        button.setAttribute('aria-pressed', String(!allowed()));
        button.setAttribute('aria-label', label);
        button.title = label;
        button.disabled = preference.matches || !capable;
        if (button.classList.contains('motion-toggle-text')) button.textContent = label;
      });
      if (!allowed()) {
        [...active].forEach(job => job.cancel());
        [...counters].forEach(counter => counter.finish());
        product.style.removeProperty('--tilt-x');
        product.style.removeProperty('--tilt-y');
      }
      schedulePreview();
    };
    controls.forEach(button => button.addEventListener('click', () => {
      userPaused = !userPaused;
      try { sessionStorage.setItem('mirs-landing-motion', userPaused ? 'paused' : 'running'); } catch { /* No storage is required. */ }
      update();
    }));
    preference.addEventListener('change', update);
    document.addEventListener('visibilitychange', () => {
      root.classList.toggle('motion-hidden', document.hidden);
      active.forEach(job => { if (document.hidden) job.pause(); else if (allowed()) job.play(); });
      schedulePreview();
    });
    product.addEventListener('mouseenter', () => { hoveringProduct = true; schedulePreview(); });
    product.addEventListener('mouseleave', () => { hoveringProduct = false; schedulePreview(); });
    const stopPreview = () => { manualPreview = true; clearTimeout(cycleTimer); };
    product.addEventListener('focusin', stopPreview);
    tabList.addEventListener('pointerdown', stopPreview);
    tabList.addEventListener('click', stopPreview);
    tabList.addEventListener('keydown', stopPreview);
    let tiltFrame = 0;
    product.addEventListener('pointermove', event => {
      if (!allowed() || event.pointerType !== 'mouse' || !matchMedia('(hover: hover) and (pointer: fine)').matches) return;
      cancelAnimationFrame(tiltFrame);
      const { clientX, clientY } = event;
      tiltFrame = requestAnimationFrame(() => {
        const box = product.getBoundingClientRect();
        product.style.setProperty('--tilt-x', `${((clientY - box.top) / box.height - .5) * -2.5}deg`);
        product.style.setProperty('--tilt-y', `${((clientX - box.left) / box.width - .5) * 2.5}deg`);
      });
    });
    product.addEventListener('pointerleave', () => { cancelAnimationFrame(tiltFrame); product.style.removeProperty('--tilt-x'); product.style.removeProperty('--tilt-y'); });
    update();
    if (!capable) return;

    const elements = [...document.querySelectorAll('.section-heading > *, .expertise-number, .expertise-copy > *, .feature-card, .steps article, .module-card, .trial-card > div, .faq-list details, .final-section > :not(.final-glow), .footer-main > div, .footer-bottom, .pricing-card, .pricing-switch, .pricing-note')];
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        const element = entry.target;
        const siblings = [...element.parentElement.children].filter(sibling => elements.includes(sibling));
        const delay = Math.min(siblings.indexOf(element) * 80, 240);
        element.classList.add('is-revealed');
        reveal(element, delay);
        if (element.classList.contains('expertise-number')) count(element.querySelector('strong'), 20);
        if (element.closest('.trial-card')) count(element.querySelector('.trial-duration'), 72);
        element.querySelectorAll('.mini-project>div, .mini-timeline span, .document-flow>div').forEach((child, index) => reveal(child, 200 + index * 100, 9));
        element.querySelectorAll('.bars i').forEach((bar, index) => {
          bar.style.transformOrigin = 'bottom';
          animate(bar, [{ transform: 'scaleY(.08)', opacity: .3 }, { transform: 'scaleY(1)', opacity: 1 }], { duration: 1100, delay: 180 + index * 70 });
        });
        observer.unobserve(element);
      });
    }, { threshold: .12, rootMargin: '0px 0px -25px 0px' });
    elements.forEach(element => observer.observe(element));
    const productObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        productVisible = entry.isIntersecting;
        if (productVisible && !product.dataset.motionSeen) {
          product.dataset.motionSeen = 'true';
          reveal(product, 0, 32);
          previewMotion(document.querySelector('.demo-panel:not([hidden])'));
        }
        schedulePreview();
      });
    }, { threshold: .28 });
    productObserver.observe(product);
    const intro = document.querySelectorAll('.site-header, .hero-badge, .headline-line, .hero-copy, .hero>.button-row, .hero-note');
    intro.forEach((element, index) => reveal(element, index * 90, element.classList.contains('headline-line') ? 36 : 16));
  }
})();
