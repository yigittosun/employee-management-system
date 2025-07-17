import { Router } from '@vaadin/router';
import '@vaadin/icons';
import '@vaadin/icon/vaadin-icon.js';

import '../components/header.js';
import '../components/employee-list.js';
import '../components/employee-item.js';
import '../components/employee-form.js';

import '../pages/employee-list-page.js';
import '../pages/employee-form-page.js';

const outlet = document.getElementById('outlet');
const router = new Router(outlet);

router.setRoutes([
  { path: '/', component: 'employee-list-page' },
  { path: '/add', component: 'employee-form-page' },
  { path: '/edit/:id', component: 'employee-form-page' },
]);
