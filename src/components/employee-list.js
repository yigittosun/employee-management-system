import {LitElement, html, css} from 'lit';
import './employee-item.js';

export class EmployeeListComponent extends LitElement {
  static properties = {
    employees: {type: Array},
  };

  static styles = css`
    .employee-list {
      max-width: 600px;
      margin: 0 auto;
      padding: 1rem;
      background-color: #f9f9f9;
      border-radius: 8px;
    }
    .employee-list h2 {
      text-align: center;
      color: #333;
    }
    .employee-list ul {
      list-style: none;
      padding: 0;
    }
    .employee-list li {
      margin-bottom: 1rem;
    }
  `;

  constructor() {
    super();
    this.employees = [];
  }

  render() {
    return html`
      <div class="list">
        ${this.employees.map(
          (emp) =>
            html`<employee-item
              .employee="${emp}"
              @edit="${(e) => this.dispatchEvent(e)}"
              @delete="${(e) => this.dispatchEvent(e)}"
            ></employee-item>`
        )}
      </div>
    `;
  }
}

customElements.define('employee-list', EmployeeListComponent);
