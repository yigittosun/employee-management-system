import { fixture, html, expect, oneEvent } from '@open-wc/testing';
import '../src/components/employee-form.js';

describe('EmployeeForm', () => {
  it('renders all input fields and labels with required indicators', async () => {
    const el = await fixture(html`<employee-form></employee-form>`);
    await el.updateComplete;

    const fields = [
      'firstName',
      'lastName',
      'doe',
      'dob',
      'phone',
      'email',
      'department',
      'position'
    ];

    for (const name of fields) {
      const input = el.shadowRoot.querySelector(`[name="${name}"]`);
      expect(input, `input ${name} should exist`).to.exist;
      const span = el.shadowRoot.querySelector(`.field [name="${name}"]`)
        .closest('.field')
        .querySelector('label .required');
      expect(span, `${name} label should have required asterisk`).to.exist;
    }
  });

  it('shows validation errors when submitting empty form', async () => {
    const el = await fixture(html`<employee-form></employee-form>`);
    await el.updateComplete;

    el.shadowRoot.querySelector('form')
      .dispatchEvent(new Event('submit', { bubbles: true, cancelable: true }));
    await el.updateComplete;

    const errs = el.shadowRoot.querySelectorAll('.error');
    expect(errs.length).to.equal(8);
    errs.forEach(div => {
      expect(div.textContent.trim()).to.not.equal('', 'error message should show');
    });
  });

  it('shows invalid email error only when email invalid', async () => {
    const el = await fixture(html`<employee-form></employee-form>`);
    await el.updateComplete;

    const data = {
      firstName: 'John',
      lastName:  'Doe',
      doe:       '2023-01-01',
      dob:       '1990-01-01',
      phone:     '123456',
      email:     'bad-email',
      department:'Eng',
      position:  'Developer'
    };

    for (const [name, val] of Object.entries(data)) {
      const input = el.shadowRoot.querySelector(`[name="${name}"]`);
      input.value = val;
      const evtName = input.tagName === 'SELECT' ? 'change' : 'input';
      input.dispatchEvent(new Event(evtName, { bubbles: true }));
    }

    el.shadowRoot.querySelector('form')
      .dispatchEvent(new Event('submit', { bubbles: true, cancelable: true }));
    await el.updateComplete;

    const fields = el.shadowRoot.querySelectorAll('.field');
    fields.forEach(field => {
      const input = field.querySelector('input, select');
      const name = input.name;
      const errText = field.querySelector('.error').textContent.trim();
      if (name === 'email') {
        expect(errText).to.not.equal('', 'email must show invalid format error');
      } else {
        expect(errText).to.equal('', `${name} should have no error`);
      }
    });
  });

  it('dispatches submit event with detail when form valid', async () => {
    const el = await fixture(html`<employee-form></employee-form>`);
    await el.updateComplete;

    const detail = {
      firstName: 'Alice',
      lastName:  'Smith',
      doe:       '2023-02-01',
      dob:       '1992-02-02',
      phone:     '987654',
      email:     'alice@example.com',
      department:'HR',
      position:  'Manager'
    };

    for (const [name, val] of Object.entries(detail)) {
      const input = el.shadowRoot.querySelector(`[name="${name}"]`);
      input.value = val;
      const evtName = input.tagName === 'SELECT' ? 'change' : 'input';
      input.dispatchEvent(new Event(evtName, { bubbles: true }));
    }

    setTimeout(() => {
      el.shadowRoot.querySelector('form')
        .dispatchEvent(new Event('submit', { bubbles: true, cancelable: true }));
    }, 0);
    const ev = await oneEvent(el, 'submit');
    expect(ev.detail).to.deep.equal(detail);
  });
});
