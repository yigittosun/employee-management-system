import { LitElement, html } from 'lit';
import '../components/employee-form.js';

class EmployeeFormPage extends LitElement {
  render() {
    return html`
      <employee-form @submit="${this._onSubmit}"></employee-form>
    `;
  }
}
customElements.define('employee-form-page', EmployeeFormPage);
