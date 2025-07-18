import {LitElement, html, css} from 'lit';
import {LocalizeMixin} from '../i18n/localize-mixin.js';
import {Router} from '@vaadin/router';
import {store, deleteEmployee} from '../store/index.js';
import '../components/confirm-dialog.js';
export class EmployeeCard extends LocalizeMixin(LitElement) {
  static properties = {
    employee: {type: Object},
    _deleteDialogOpen: {type: Boolean},
    _employeeToDelete: {type: Object},
  };

  static styles = css`
    :host {
      display: block;
      margin: 1rem 0;
      box-sizing: border-box;
      height: 100%;
    }
    .card {
      background: #fff;
      border: 1px solid #eee;
      border-radius: 8px;
      box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
      padding: 1.5rem;
      box-sizing: border-box;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      height: 100%; /* ensure full height */
    }
    .grid {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 1.5rem 2rem;
    }
    .field {
      display: flex;
      flex-direction: column;
    }
    .label {
      font-size: 0.75rem;
      color: #999;
      margin-bottom: 0.25rem;
      text-transform: capitalize;
    }
    .value {
      font-size: 1rem;
      color: #333;
      word-break: break-word;
    }
    .actions {
      margin-top: 1.5rem;
      display: flex;
      gap: 0.5rem;
    }
    button {
      display: inline-flex;
      align-items: center;
      gap: 0.5rem;
      padding: 0.5rem 1rem;
      font-size: 0.875rem;
      border-radius: 4px;
      border: none;
      cursor: pointer;
      line-height: 1;
      transition: background 0.2s;
      font-weight: 500;
    }
    button.edit {
      background: #6152e4;
      color: #fff;
    }
    button.edit:hover {
      background: #503fd1;
    }
    button.delete {
      background: #ff792b;
      color: #fff;
    }
    button.delete:hover {
      background: #e0661c;
    }
  `;

  constructor() {
    super();
    this.employee = {};
    this._deleteDialogOpen = false;
    this._employeeToDelete = null;
  }

  _edit() {
    Router.go(`/edit/${this.employee.id}`);
  }

  _delete() {
    this._employeeToDelete = this.employee;
    this._deleteDialogOpen = true;
  }

  _onDialogCancel() {
    this._deleteDialogOpen = false;
    this._employeeToDelete = null;
  }

  _onDialogProceed(e) {
    store.dispatch(deleteEmployee(e.detail.id));
    this._deleteDialogOpen = false;
    this._employeeToDelete = null;
  }

  render() {
    const e = this.employee || {};
    const t = this.t.bind(this);

    return html`
      <div class="card">
        <div class="grid">
          <div class="field">
            <span class="label">${t('list.firstName')}:</span>
            <span class="value">${e.firstName || '-'}</span>
          </div>
          <div class="field">
            <span class="label">${t('list.lastName')}:</span>
            <span class="value">${e.lastName || '-'}</span>
          </div>
          <div class="field">
            <span class="label">${t('list.doe')}:</span>
            <span class="value">${e.doe || '-'}</span>
          </div>
          <div class="field">
            <span class="label">${t('list.dob')}:</span>
            <span class="value">${e.dob || '-'}</span>
          </div>
          <div class="field">
            <span class="label">${t('list.phone')}:</span>
            <span class="value">${e.phone || '-'}</span>
          </div>
          <div class="field">
            <span class="label">${t('list.email')}:</span>
            <span class="value">${e.email || '-'}</span>
          </div>
          <div class="field">
            <span class="label">${t('list.department')}:</span>
            <span class="value">${e.department || '-'}</span>
          </div>
          <div class="field">
            <span class="label">${t('list.position')}:</span>
            <span class="value">${e.position || '-'}</span>
          </div>
        </div>
        <div class="actions">
          <button class="edit" @click=${this._edit} title=${t('list.edit')}>
            <vaadin-icon icon="vaadin:edit"></vaadin-icon>
            ${t('list.edit')}
          </button>
          <button
            class="delete"
            @click=${this._delete}
            title=${t('list.delete')}
          >
            <vaadin-icon icon="vaadin:trash"></vaadin-icon>
            ${t('list.delete')}
          </button>
        </div>
      </div>

      <confirm-dialog
        .open=${this._deleteDialogOpen}
        .employee=${this._employeeToDelete}
        @cancel=${this._onDialogCancel}
        @proceed=${this._onDialogProceed}
      ></confirm-dialog>
    `;
  }
}

customElements.define('employee-card', EmployeeCard);
