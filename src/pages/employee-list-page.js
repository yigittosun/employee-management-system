import { LitElement, html } from 'lit';
import '../components/employee-list.js';

class EmployeeListPage extends LitElement {
  static properties = {
    employees: { type: Array },
  };

  constructor() {
    super();
    this.employees = [];
  }

  connectedCallback() {
    super.connectedCallback();
  }

render() {
  const list = Array.isArray(this.employees) ? this.employees : [];
  return html`
    <div class="list">
      ${list.map(emp => html`
        <employee-item
          .employee=${emp}
          @edit=${e => this.dispatchEvent(e)}
          @delete=${e => this.dispatchEvent(e)}
        ></employee-item>
      `)}
    </div>
  `;
}

  _onEdit(e) {
    const employeeId = e.detail.id;
    this.dispatchEvent(new CustomEvent('edit', { detail: employeeId }));
  }
  _onDelete(e) {
    const employeeId = e.detail.id;
    this.dispatchEvent(new CustomEvent('delete', { detail: employeeId }));
  }
}
customElements.define('employee-list-page', EmployeeListPage);
