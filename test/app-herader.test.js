import { fixture, html, expect } from '@open-wc/testing';
import '../src/components/app-header.js';

describe('AppHeader', () => {
  it('renders logo, title and navigation links', async () => {
    const el = await fixture(html`<app-header></app-header>`);
    const titleLink = el.shadowRoot.querySelector('.title a');
    expect(titleLink).to.exist;
    expect(titleLink.textContent.trim()).to.equal('ING');

    const navLinks = el.shadowRoot.querySelectorAll('nav .nav-link');
    expect(navLinks.length).to.equal(2);
    expect(navLinks[0].textContent.trim()).to.contain(el.t('header.employees'));
    expect(navLinks[1].textContent.trim()).to.contain(el.t('header.addNew'));
  });

  it('renders language toggle button with correct flag and toggles language', async () => {
    document.documentElement.lang = 'en';
    const el = await fixture(html`<app-header></app-header>`);
    await el.updateComplete;

    const langBtn = el.shadowRoot.querySelector('button.lang-btn');
    expect(langBtn).to.exist;
    expect(langBtn.textContent.trim()).to.equal('🇬🇧');

    langBtn.click();
    await el.updateComplete;
    expect(document.documentElement.lang).to.equal('tr');
    expect(langBtn.textContent.trim()).to.equal('🇹🇷');

    langBtn.click();
    await el.updateComplete;
    expect(document.documentElement.lang).to.equal('en');
    expect(langBtn.textContent.trim()).to.equal('🇬🇧');
  });
});
