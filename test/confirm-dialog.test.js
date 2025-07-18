import { fixture, html, expect, oneEvent } from '@open-wc/testing';
import '../src/components/confirm-dialog.js';

describe('ConfirmDialog', () => {
  const emp = { firstName: 'Foo', lastName: 'Bar' };

  it('renders title and interpolated description', async () => {
    const el = await fixture(html`
      <confirm-dialog .open=${true} .employee=${emp}></confirm-dialog>
    `);
    await el.updateComplete;
    const title = el.shadowRoot.querySelector('.title').textContent.trim();
    const desc  = el.shadowRoot.querySelector('.desc').textContent;
    expect(title).to.equal(el.t('dialog.title'));
    expect(desc).to.contain('Foo Bar');
  });

  it('dispatches cancel event when cancel button clicked', async () => {
    const el = await fixture(html`<confirm-dialog .open=${true}></confirm-dialog>`);
    setTimeout(() => el.shadowRoot.querySelector('.cancel').click());
    const ev = await oneEvent(el, 'cancel');
    expect(ev).to.exist;
  });

  it('dispatches proceed event with employee detail', async () => {
    const el = await fixture(html`
      <confirm-dialog .open=${true} .employee=${emp}></confirm-dialog>
    `);
    setTimeout(() => el.shadowRoot.querySelector('.proceed').click());
    const ev = await oneEvent(el, 'proceed');
    expect(ev.detail).to.deep.equal(emp);
  });
});
