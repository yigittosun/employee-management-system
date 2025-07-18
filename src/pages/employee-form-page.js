import {LitElement, html, css} from 'lit';
import {LocalizeMixin} from '../i18n/localize-mixin.js';
import {store, addEmployee, updateEmployee} from '../store/index.js';
import '../components/employee-form.js';
import {Router} from '@vaadin/router';

export class EmployeeFormPage extends LocalizeMixin(LitElement) {
  static properties = {employeeId: {type: String}, employee: {type: Object}};

  static styles = css`
    :host {
      display: block;
      padding: 2rem;
      box-sizing: border-box;
    }
    .container {
      max-width: 1000px;
      margin: 0 auto;
      background: #fff;
      border-radius: 8px;
      padding: 2rem;
      box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
    }
    h3 {
      margin: 0 0 1.5rem;
      color: #fe7737;
    }
  `;

  constructor() {
    super();
    this.employeeId = null;
    this.employee = {
      firstName: '',
      lastName: '',
      doe: '',
      dob: '',
      phone: '',
      email: '',
      department: '',
      position: '',
    };
    this.unsubscribe = store.subscribe(() => this.requestUpdate());
  }

  connectedCallback() {
    super.connectedCallback();
    const match = window.location.pathname.match(/\/edit\/(.+)/);
    if (match && match[1]) {
      this.employeeId = match[1];
      const found = store
        .getState()
        .employees.find((e) => e.id === this.employeeId);
      if (found) this.employee = {...found};
    } else {
      this.employeeId = null;
      this.employee = {
        firstName: '',
        lastName: '',
        doe: '',
        dob: '',
        phone: '',
        email: '',
        department: '',
        position: '',
      };
    }
  }

  disconnectedCallback() {
    this.unsubscribe();
    super.disconnectedCallback();
  }

  _handleSubmit(e) {
    if (this.employeeId) {
      store.dispatch(updateEmployee(e.detail));
      document.getElementById('toast')?.show(this.t('toast.updated'));
    } else {
      store.dispatch(addEmployee(e.detail));
      document.getElementById('toast')?.show(this.t('toast.added'));
    }
    Router.go('/');
  }

  render() {
    const isEdit = !!this.employeeId;
    return html`
      <div>
        <h3>${isEdit ? this.t('form.titleEdit') : this.t('form.titleAdd')}</h3>
        <div class="container">
          <employee-form
            .employee=${this.employee}
            @submit=${this._handleSubmit}
          ></employee-form>
        </div>
      </div>
    `;
  }
}

customElements.define('employee-form-page', EmployeeFormPage);
