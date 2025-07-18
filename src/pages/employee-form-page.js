import { LitElement, html, css } from 'lit';

class EmployeeFormPage extends LitElement {
  static properties = {
    employeeId: { type: String }
  };

  static styles = css`
    :host {
      display: block;
      padding: 2rem 1rem;
      box-sizing: border-box;
      width: 100%;
    }
    .container {
      max-width: 600px;
      margin: 0 auto;
    }
    h2 {
      margin: 0 0 2rem 0;
      font-size: 1.75rem;
      font-weight: 600;
      color: #fe7737;
    }
  `;

  constructor() {
    super();
    this.employeeId = null;
  }

  render() {
    const isEdit = this.employeeId !== null;
    
    return html`
      <div class="container">
        <h2>${isEdit ? 'Edit Employee' : 'Add Employee'}</h2>
        <p>Employee form will be here</p>
      </div>
    `;
  }
}

customElements.define('employee-form-page', EmployeeFormPage);