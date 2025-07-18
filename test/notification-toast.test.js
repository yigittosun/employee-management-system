import { fixture, html, expect, oneEvent } from '@open-wc/testing';
import '../src/components/notification-toast.js';

describe('NotificationToast', () => {
  it('shows message and auto-hides after timeout', async () => {
    const el = await fixture(html`<notification-toast></notification-toast>`);
    el.show('Hello', 50);
    await el.updateComplete;
    expect(el.open).to.be.true;

    await oneEvent(el, 'closed');
    expect(el.open).to.be.false;
  });

  it('can be manually hidden', async () => {
    const el = await fixture(html`<notification-toast></notification-toast>`);
    el.show('Bye', 1000);
    await el.updateComplete;
    setTimeout(() => el.hide(), 0);
    await oneEvent(el, 'closed');
    expect(el.open).to.be.false;
  });
});
