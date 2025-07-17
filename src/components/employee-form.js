import {LitElement, html, css} from 'lit';

export class EmployeeForm extends LitElement {
  static properties = {
    employee: {type: Object},
  };
  static styles = css`
    form {
      max-width: 400px;
      margin: 1rem auto;
      display: flex;
      flex-direction: column;
    }
    input,
    button {
      margin: 0.5rem 0;
      padding: 0.5rem;
      font-size: 1rem;
    }
  `;

  constructor() {
    super();
    this.employee = {name: '', position: ''};
  }

  _onSubmit(e) {
    e.preventDefault();
    this.dispatchEvent(
      new CustomEvent('submit', {
        detail: {...this.employee},
      })
    );
  }

  _onInput(e) {
    const field = e.target.name;
    this.employee = {...this.employee, [field]: e.target.value};
  }

  render() {
    return html`
      <form @submit="${this._onSubmit}">
        <input
          name="name"
          .value="${this.employee.name}"
          @input="${this._onInput}"
          placeholder="Name"
          required
        />
        <input
          name="position"
          .value="${this.employee.position}"
          @input="${this._onInput}"
          placeholder="Position"
          required
        />
        <button type="submit">Save</button>
      </form>
    `;
  }
}
customElements.define('employee-form', EmployeeForm);
