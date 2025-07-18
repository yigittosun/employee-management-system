import { fixture, html, expect } from '@open-wc/testing';
import { store, addEmployee } from '../src/store/index.js';
import '../src/pages/employee-list-page.js';

describe('EmployeeListPage', () => {
  beforeEach(() => {
    localStorage.clear();
    store.dispatch({ type: 'RESET', payload: [] });
    store.dispatch(addEmployee({ firstName: 'A', lastName: 'B' }));
  });

  it('toggles between table and cards', async () => {
    const el = await fixture(html`<employee-list-page></employee-list-page>`);
    await el.updateComplete;

    expect(el.shadowRoot.querySelector('employee-table')).to.exist;

    el.shadowRoot.querySelector('button[aria-label="Cards View"]').click();
    await el.updateComplete;

    expect(el.shadowRoot.querySelector('employee-cards')).to.exist;
  });
});
