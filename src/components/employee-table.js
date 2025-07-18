import {LitElement, html, css} from 'lit';
import {LocalizeMixin} from '../i18n/localize-mixin.js';
import {Router} from '@vaadin/router';
import {store, deleteEmployee} from '../store/index.js';
import '../components/confirm-dialog.js';

export class EmployeeTable extends LocalizeMixin(LitElement) {
  static properties = {
    employees: {type: Array},
    _deleteDialogOpen: {type: Boolean},
    _employeeToDelete: {type: Object},
  };

  static styles = css`
    :host {
      display: block;
    }
    .table-container {
      overflow-x: auto;
      border-radius: 8px;
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
      background: #fff;
      margin-bottom: 1rem;
    }
    table {
      width: 100%;
      border-collapse: collapse;
      font-size: 0.9375rem;
    }
    thead th {
      padding: 0.75rem 1rem;
      color: #fe7737;
      font-weight: 600;
      text-transform: capitalize;
      font-size: 0.75rem;
      letter-spacing: 0.05em;
      border-bottom: 1px solid #eee;
      text-align: left;
      white-space: nowrap;
    }
    tbody td {
      padding: 0.75rem 1rem;
      border-bottom: 1px solid #eee;
      color: #333;
      white-space: nowrap;
    }
    tbody tr:hover {
      background: #fffaf5;
    }
    .actions {
      display: inline-flex;
      gap: 0.5rem;
      align-items: center;
    }
    button.icon {
      border: none;
      background: none;
      padding: 0;
      cursor: pointer;
      line-height: 1;
      display: inline-flex;
      align-items: center;
      justify-content: center;
    }
    button.icon.edit {
      color: #fe7737;
    }
    button.icon.delete {
      color: #ff792b;
    }
  `;

  constructor() {
    super();
    this.employees = [];
    this._deleteDialogOpen = false;
    this._employeeToDelete = null;
  }

  _toggleAll(e) {
    const checked = e.target.checked;
    this.shadowRoot
      .querySelectorAll('tbody input[type="checkbox"]')
      .forEach((cb) => (cb.checked = checked));
  }

  _edit(id) {
    Router.go(`/edit/${id}`);
  }

  _delete(id) {
    const emp = this.employees.find((e) => e.id === id);
    this._employeeToDelete = emp;
    this._deleteDialogOpen = true;
  }

  _onDialogCancel() {
    this._deleteDialogOpen = false;
    this._employeeToDelete = null;
  }

  _onDialogProceed(e) {
    store.dispatch(deleteEmployee(e.detail.id));
    document.getElementById('toast')?.show(this.t('toast.deleted'));
    this._deleteDialogOpen = false;
    this._employeeToDelete = null;
  }

  render() {
    const t = this.t.bind(this);
    const list = Array.isArray(this.employees) ? this.employees : [];

    return html`
      <div class="table-container">
        <table>
          <thead>
            <tr>
              <th><input @change=${this._toggleAll} type="checkbox" /></th>
              <th>${t('list.firstName')}</th>
              <th>${t('list.lastName')}</th>
              <th>${t('list.doe')}</th>
              <th>${t('list.dob')}</th>
              <th>${t('list.phone')}</th>
              <th>${t('list.email')}</th>
              <th>${t('list.department')}</th>
              <th>${t('list.position')}</th>
              <th>${t('list.actions')}</th>
            </tr>
          </thead>
          <tbody>
            ${list.map(
              (emp) => html`
                <tr>
                  <td><input type="checkbox" /></td>
                  <td>${emp.firstName}</td>
                  <td>${emp.lastName}</td>
                  <td>${emp.doe}</td>
                  <td>${emp.dob}</td>
                  <td>${emp.phone}</td>
                  <td>${emp.email}</td>
                  <td>${emp.department}</td>
                  <td>${emp.position}</td>
                  <td>
                    <span class="actions">
                      <button
                        class="icon edit"
                        @click=${() => this._edit(emp.id)}
                        title=${t('list.edit')}
                      >
                        <vaadin-icon icon="vaadin:edit"></vaadin-icon>
                      </button>
                      <button
                        class="icon delete"
                        @click=${() => this._delete(emp.id)}
                        title=${t('list.delete')}
                      >
                        <vaadin-icon icon="vaadin:trash"></vaadin-icon>
                      </button>
                    </span>
                  </td>
                </tr>
              `
            )}
          </tbody>
        </table>
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

customElements.define('employee-table', EmployeeTable);
