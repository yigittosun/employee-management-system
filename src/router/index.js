import {Router} from '@vaadin/router';
import '@vaadin/icons/vaadin-icons.js';
import '@vaadin/icon/vaadin-icon.js';

import '../layout.js';
import '../pages/employee-list-page.js';
import '../pages/employee-form-page.js';

window.addEventListener('DOMContentLoaded', () => {
  const outlet = document.getElementById('outlet');
  if (!outlet) {
    console.error('Router outlet not found!');
    return;
  }

  try {
    const router = new Router(outlet);
    router.setRoutes([
      {
        path: '/',
        component: 'employee-list-page',
        action: (context, commands) => {
          return commands.component('employee-list-page');
        },
      },
      {
        path: '/add',
        component: 'employee-form-page',
        action: (context, commands) => {
          return commands.component('employee-form-page');
        },
      },
      {
        path: '/edit/:id',
        component: 'employee-form-page',
        action: (context, commands) => {
          return commands.component('employee-form-page');
        },
      },
    ]);
  } catch (error) {
    console.error('Router initialization error:', error);
  }
});
