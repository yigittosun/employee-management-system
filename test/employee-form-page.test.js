import { fixture, html, expect } from '@open-wc/testing';
import '../src/pages/employee-form-page.js';
import { store, addEmployee, updateEmployee } from '../src/store/index.js';
import { Router } from '@vaadin/router';

describe('EmployeeFormPage', () => {
  beforeEach(() => {
    localStorage.setItem('employees', JSON.stringify([]));
  });

  it('dispatches addEmployee and navigates home on new submit', async () => {
    history.pushState({}, '', '/add');
    const el = await fixture(html`<employee-form-page></employee-form-page>`);
    await el.updateComplete;
    const form = el.shadowRoot.querySelector('employee-form');

    const detail = {
      firstName: 'A',
      lastName: 'B',
      doe: '2023-01-01',
      dob: '1990-01-01',
      phone: '111-222-3333',
      email: 'a@b.com',
      department: 'Engineering',
      position: 'Developer'
    };

    let dispatched;
    const origDispatch = store.dispatch;
    store.dispatch = action => (dispatched = action, origDispatch(action));

    let navigated;
    const origGo = Router.go;
    Router.go = path => (navigated = path);

    form.dispatchEvent(new CustomEvent('submit', { detail, bubbles: true, composed: true }));
    await el.updateComplete;

    expect(dispatched.type).to.equal(addEmployee.type);
    expect(dispatched.payload).to.deep.equal(detail);
    expect(navigated).to.equal('/');

    store.dispatch = origDispatch;
    Router.go = origGo;
  });

  it('dispatches updateEmployee and navigates home on edit submit', async () => {
    const emp = { id: '321', firstName: 'X', lastName: 'Y', doe:'', dob:'', phone:'', email:'', department:'', position:'' };
    store.dispatch(addEmployee(emp));

    history.pushState({}, '', '/edit/321');
    const el = await fixture(html`<employee-form-page></employee-form-page>`);
    await el.updateComplete;
    const form = el.shadowRoot.querySelector('employee-form');

    const detail = { ...emp, firstName: 'Z' };

    let dispatched;
    const origDispatch = store.dispatch;
    store.dispatch = action => (dispatched = action, origDispatch(action));

    let navigated;
    const origGo = Router.go;
    Router.go = path => (navigated = path);

    form.dispatchEvent(new CustomEvent('submit', { detail, bubbles: true, composed: true }));
    await el.updateComplete;

    expect(dispatched.type).to.equal(updateEmployee.type);
    expect(dispatched.payload).to.deep.equal(detail);
    expect(navigated).to.equal('/');

    store.dispatch = origDispatch;
    Router.go = origGo;
  });
});
