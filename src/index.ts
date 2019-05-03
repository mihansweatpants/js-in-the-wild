import './styles.css';
import './views/examples-list';

import { Router } from '@vaadin/router';

window.addEventListener('load', () => {
  initRouter();
  registerSW();
});

function initRouter() {
  const router = new Router(document.querySelector('main'));

  // tslint:disable space-in-parens
  router.setRoutes([
    {
      path: '/',
      component: 'examples-list',
    },
    {
      path: '(.*)',
      component: 'not-found-view',
      action: () => import(/* webpackChunckName: "not-found-view" */ '~/views/not-found'),
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
