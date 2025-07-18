import { fixture, html, expect } from '@open-wc/testing';
import { Router } from '@vaadin/router';
import '../src/components/employee-card.js';

describe('EmployeeCard', () => {
  const employee = {
    id: '42',
    firstName: 'Charlie',
    lastName: 'Wilson',
    email: 'charlie@example.com',
    department: 'IT',
    position: 'SysAdmin',
    phone: '555-0127',
    dob: '1987-05-15',
    doe: '2023-05-15'
  };

  it('navigates to the edit route when the edit button is clicked', async () => {
    const el = await fixture(html`
      <employee-card .employee=${employee}></employee-card>
    `);

    let navigatedTo;
    const originalGo = Router.go;
    Router.go = (path) => { navigatedTo = path; };

    el.shadowRoot.querySelector('button.edit').click();

    expect(navigatedTo).to.equal(`/edit/${employee.id}`);

    Router.go = originalGo;
  });

  it('opens the confirmation dialog when the delete button is clicked', async () => {
    const el = await fixture(html`
      <employee-card .employee=${employee}></employee-card>
    `);

    expect(el._deleteDialogOpen).to.be.false;
    expect(el._employeeToDelete).to.be.null;

    el.shadowRoot.querySelector('button.delete').click();
    await el.updateComplete;

    expect(el._deleteDialogOpen).to.be.true;
    expect(el._employeeToDelete).to.deep.equal(employee);
  });
});
