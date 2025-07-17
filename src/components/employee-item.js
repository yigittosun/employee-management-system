import {LitElement, html, css} from 'lit';

export class EmployeeItem extends LitElement {
  static properties = {
    employee: {type: Object},
  };
  static styles = css`
    .item {
      display: flex;
      justify-content: space-between;
      padding: 0.5rem;
      border-bottom: 1px solid #ddd;
    }
    .actions button {
      margin-left: 0.5rem;
    }
  `;

  constructor() {
    super();
    this.employee = {};
  }

  render() {
    const {name, position} = this.employee;
    return html`
      <div class="item">
        <div>
          <strong>${name}</strong><br />
          <small>${position}</small>
        </div>
        <div class="actions">
          <button
            @click="() => this.dispatchEvent(new CustomEvent('edit', { detail: id }))"
          >
            Edit
          </button>
          <button
            @click="() => this.dispatchEvent(new CustomEvent('delete', { detail: id }))"
          >
            Delete
          </button>
        </div>
      </div>
    `;
  }
}
customElements.define('employee-item', EmployeeItem);
