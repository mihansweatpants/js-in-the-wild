import './styles.css';
import './views/list-view';

import { Router } from '@vaadin/router';

window.addEventListener('load', () => {
  initRouter();
  registerSW();
});

function initRouter() {
  const router = new Router(document.querySelector('main'));

  router.setRoutes([
    {
      path: '/',
      component: 'list-view',
    },
    {
      path: '/about',
      component: 'about-view',
      action: () => import('~/views/about-view'),
    },
    {
      path: '(.*)',
      component: 'not-found-view',
      action: () => import('~/views/not-found-view'),
    },
  ]);
}

async function registerSW() {
  if ('serviceWorker' in navigator) {
    try {
      await navigator.serviceWorker.register('./sw.js');
    } catch (e) {
      console.log('ServiceWorker registration failed :(');
    }
  } else {
    console.log('Your browser does not support ServiceWorker');
  }
}
