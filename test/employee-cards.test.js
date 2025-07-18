import { fixture, html, expect, oneEvent } from '@open-wc/testing';
import '../src/components/employee-cards.js';

describe('EmployeeCards', () => {
  const employees = [
    { id: '1', firstName: 'A', lastName: 'B', doe: '', dob: '', phone: '', email: '', department: '', position: '' },
    { id: '2', firstName: 'C', lastName: 'D', doe: '', dob: '', phone: '', email: '', department: '', position: '' }
  ];

  it('renders one card per employee', async () => {
    const el = await fixture(html`<employee-cards .employees=${employees}></employee-cards>`);
    await el.updateComplete;
    const cards = el.shadowRoot.querySelectorAll('employee-card');
    expect(cards.length).to.equal(2);
    expect(cards[0].employee).to.deep.equal(employees[0]);
  });

  it('forwards edit events from child cards', async () => {
    const el = await fixture(html`<employee-cards .employees=${employees}></employee-cards>`);
    await el.updateComplete;

    setTimeout(() => {
      const child = el.shadowRoot.querySelectorAll('employee-card')[0];
      child.dispatchEvent(new CustomEvent('edit', { detail: employees[0].id, bubbles: true, composed: true }));
    }, 0);

    const ev = await oneEvent(el, 'edit');
    expect(ev.detail).to.equal('1');
  });

  it('forwards delete events from child cards', async () => {
    const el = await fixture(html`<employee-cards .employees=${employees}></employee-cards>`);
    await el.updateComplete;

    setTimeout(() => {
      const child = el.shadowRoot.querySelectorAll('employee-card')[1];
      child.dispatchEvent(new CustomEvent('delete', { detail: employees[1].id, bubbles: true, composed: true }));
    }, 0);

    const ev = await oneEvent(el, 'delete');
    expect(ev.detail).to.equal('2');
  });
});
