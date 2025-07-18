import { fixture, html, expect } from '@open-wc/testing';
import '../src/components/employee-table.js';
import { store, deleteEmployee } from '../src/store/index.js';
import { Router } from '@vaadin/router';

describe('EmployeeTable', () => {
  it('renders given employees as table rows', async () => {
    const employees = [
      { id: '1', firstName: 'A', lastName: 'B', doe: '', dob: '', phone: '', email: '', department: '', position: '' },
      { id: '2', firstName: 'C', lastName: 'D', doe: '', dob: '', phone: '', email: '', department: '', position: '' }
    ];
    const el = await fixture(
      html`<employee-table .employees=${employees}></employee-table>`
    );
    await el.updateComplete;
    const rows = el.shadowRoot.querySelectorAll('tbody tr');
    expect(rows.length).to.equal(2);
  });

  it('toggles all checkboxes when header checkbox clicked', async () => {
    const employees = [
      { id: '1' }, { id: '2' }
    ];
    const el = await fixture(
      html`<employee-table .employees=${employees}></employee-table>`
    );
    await el.updateComplete;
    const headerCb = el.shadowRoot.querySelector('thead input[type="checkbox"]');
    headerCb.click();
    await el.updateComplete;
    const bodyCbs = el.shadowRoot.querySelectorAll('tbody input[type="checkbox"]');
    bodyCbs.forEach(cb => expect(cb.checked).to.be.true);
  });

  it('navigates to edit page when edit button clicked', async () => {
    const employees = [{ id: '42' }];
    const originalGo = Router.go;
    let calledPath;
    Router.go = (path) => { calledPath = path; };

    const el = await fixture(
      html`<employee-table .employees=${employees}></employee-table>`
    );
    await el.updateComplete;
    const editBtn = el.shadowRoot.querySelector('button.icon.edit');
    editBtn.click();
    expect(calledPath).to.equal('/edit/42');

    Router.go = originalGo;
  });

  it('opens confirm dialog when delete button clicked', async () => {
    const employees = [{ id: '99', firstName: 'Z', lastName: 'W' }];
    const el = await fixture(
      html`<employee-table .employees=${employees}></employee-table>`
    );
    await el.updateComplete;
    const deleteBtn = el.shadowRoot.querySelector('button.icon.delete');
    deleteBtn.click();
    await el.updateComplete;

    const dialog = el.shadowRoot.querySelector('confirm-dialog');
    expect(dialog.open).to.be.true;
    expect(dialog.employee.id).to.equal('99');
  });

  it('dispatches deleteEmployee when confirm dialog proceeds', async () => {
    const employees = [{ id: '77' }];
    const el = await fixture(
      html`<employee-table .employees=${employees}></employee-table>`
    );
    await el.updateComplete;

    el.shadowRoot.querySelector('button.icon.delete').click();
    await el.updateComplete;
    const dialog = el.shadowRoot.querySelector('confirm-dialog');

    const originalDispatch = store.dispatch;
    let dispatched;
    store.dispatch = (action) => { dispatched = action; return originalDispatch(action); };

    dialog.dispatchEvent(new CustomEvent('proceed', { detail: { id: '77' }, bubbles: true }));
    await el.updateComplete;

    expect(dispatched.type).to.equal(deleteEmployee.type);
    expect(dispatched.payload).to.equal('77');

    store.dispatch = originalDispatch;
  });
});
