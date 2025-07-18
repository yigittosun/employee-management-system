import {expect} from '@open-wc/testing';
import '../src/layout.js';
import '../src/pages/employee-list-page.js';
import '../src/pages/employee-form-page.js';
import '../src/router/index.js';

describe('App Router Integration', () => {
  let outlet;
  let originalConsoleError;

  before(() => {
    if (!document.doctype) {
      document.insertBefore(
        document.implementation.createDocumentType('html', '', ''),
        document.childNodes[0]
      );
    }
    originalConsoleError = console.error;
    console.error = () => {};
  });

  after(() => {
    console.error = originalConsoleError;
  });

  beforeEach(() => {
    document.body.innerHTML = '';
    outlet = document.createElement('div');
    outlet.id = 'outlet';
    document.body.appendChild(outlet);
  });

  it('should render employee-list-page at root "/"', async () => {
    history.pushState({}, '', '/');
    window.dispatchEvent(new Event('DOMContentLoaded'));
    await new Promise((r) => setTimeout(r, 0));
    const listPage = document.querySelector('employee-list-page');
    expect(listPage).to.exist;
  });

  it('renders employee-form-page at "/add"', async () => {
    history.pushState({}, '', '/add');
    window.dispatchEvent(new Event('DOMContentLoaded'));
    await new Promise((r) => setTimeout(r, 0));
    const formPage = document.querySelector('employee-form-page');
    expect(formPage).to.exist;
  });

  it('should render employee-form-page with correct id on "/edit/:id"', async () => {
    history.pushState({}, '', '/edit/123');
    window.dispatchEvent(new Event('DOMContentLoaded'));
    await new Promise((r) => setTimeout(r, 0));
    const formPage = document.querySelector('employee-form-page');
    expect(formPage).to.exist;
    expect(formPage.employeeId).to.equal('123');
  });

  it('should log error when outlet missing', () => {
    document.body.innerHTML = '';
    let errorCalled = false;
    const origErr = console.error;
    console.error = (msg) => {
      if (msg.includes('Router outlet not found')) errorCalled = true;
    };
    window.dispatchEvent(new Event('DOMContentLoaded'));
    expect(errorCalled).to.be.true;
    console.error = origErr;
  });
});
