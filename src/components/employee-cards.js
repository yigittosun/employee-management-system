import { LitElement, html, css } from 'lit';
import './employee-card.js';

export class EmployeeCards extends LitElement {
  static properties = {
    employees: { type: Array }
  };

  static styles = css`
    :host { display:block; }
    .grid {
      display:grid;
      grid-template-columns:repeat(auto-fill, minmax(280px,1fr));
      gap:2rem;
      align-items:start;
    }
  `;

  constructor() {
    super();
    this.employees = [];
  }

  _forward(e) {
    this.dispatchEvent(new CustomEvent(e.type, { detail: e.detail, bubbles:true, composed:true }));
  }

  render() {
    const list = Array.isArray(this.employees) ? this.employees : [];
    return html`
      <div class="grid">
        ${list.map(emp => html`
          <employee-card
            .employee=${emp}
            @edit=${this._forward}
            @delete=${this._forward}
          ></employee-card>
        `)}
      </div>
    `;
  }
}
customElements.define('employee-cards', EmployeeCards);
