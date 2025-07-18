import {LitElement, html, css} from 'lit';
import {LocalizeMixin} from '../i18n/localize-mixin.js';
import '../components/employee-table.js';
import '../components/employee-cards.js';

export class EmployeeListPage extends LocalizeMixin(LitElement) {
  static properties = {
    employees: {type: Array},
    viewMode: {type: String},
  };

  static styles = css`
    :host {
      display: block;
      width: 100vw;
      padding: 0;
      margin: 0;
      box-sizing: border-box;
    }
    .header-row {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 2rem;
    }
    h3 {
      margin: 0;
      color: #fe7737;
    }
    .view-toggle {
      display: inline-flex;
      gap: 0.5rem;
    }
    .view-btn {
      width: 32px;
      height: 32px;
      border-radius: 4px;
      border: 1px solid #fe7737;
      background: #fff;
      color: #fe7737;
      cursor: pointer;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      font-size: 1rem;
    }
    .view-btn.active {
      background: #fe7737;
      color: #fff;
    }
    .content-wrap {
      width: 100%;
      margin: 0;
      padding: 0 2rem 1rem;
      box-sizing: border-box;
    }
    .empty {
      width: 100%;
      margin: 2rem 0;
      text-align: center;
      color: #666;
      font-style: italic;
    }
  `;

  constructor() {
    super();
    this.employees = [];
    this.viewMode = 'table';
  }

  _setView(mode) {
    this.viewMode = mode;
  }

  render() {
    const isTable = this.viewMode === 'table';
    const hasData = Array.isArray(this.employees) && this.employees.length > 0;

    return html`
      <div class="header-row">
        <h3>${this.t('list.title')}</h3>
        <div class="view-toggle" role="group" aria-label="view mode">
          <button
            class="view-btn ${isTable ? 'active' : ''}"
            @click=${() => this._setView('table')}
            title="Table View"
            aria-label="Table View"
          >
            <vaadin-icon icon="vaadin:lines" aria-label="Lines"></vaadin-icon>
          </button>
          <button
            class="view-btn ${!isTable ? 'active' : ''}"
            @click=${() => this._setView('cards')}
            title="Cards View"
            aria-label="Cards View"
          >
            <vaadin-icon
              icon="vaadin:grid-small-o"
              aria-label="Grid-small-o"
            ></vaadin-icon>
          </button>
        </div>
      </div>

      <div class="content-wrap">
        ${isTable
          ? hasData
            ? html`<employee-table
                .employees=${this.employees}
              ></employee-table>`
            : html`<div class="empty">${this.t('list.empty')}</div>`
          : hasData
          ? html`<employee-cards .employees=${this.employees}></employee-cards>`
          : html`<div class="empty">${this.t('list.empty')}</div>`}
      </div>
    `;
  }
}

customElements.define('employee-list-page', EmployeeListPage);
