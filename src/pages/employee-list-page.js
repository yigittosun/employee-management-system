import {LitElement, html, css} from 'lit';
import {LocalizeMixin} from '../i18n/localize-mixin.js';
import '../components/employee-table.js';
import '../components/employee-cards.js';
import {store} from '../store/index.js';

const PAGE_SIZE = 10;

export class EmployeeListPage extends LocalizeMixin(LitElement) {
  static properties = {
    employees: {type: Array},
    viewMode: {type: String},
    page: {type: Number},
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
    .pagination {
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 0.3rem;
      margin-top: 1.5rem;
      user-select: none;
      font-family: inherit;
    }

    .pagination-btn {
      background: #fff;
      border: none;
      color: #222;
      min-width: 32px;
      min-height: 32px;
      padding: 0;
      margin: 0 0.1rem;
      border-radius: 50%;
      cursor: pointer;
      font-size: 1rem;
      font-weight: 500;
      transition: background 0.15s, color 0.15s;
      display: flex;
      align-items: center;
      justify-content: center;
      outline: none;
    }
    .pagination-btn:disabled {
      color: #c4c4c4;
      cursor: not-allowed;
      background: transparent;
    }

    .pagination-btn.active {
      background: #fe7737;
      color: #fff;
      font-weight: 700;
      border: none;
      box-shadow: 0 1px 3px #fe773738;
    }
    .pagination-btn:not(.active):hover {
      background: #f5f5f5;
    }

    .pagination-ellipsis {
      padding: 0 6px;
      color: #c4c4c4;
      user-select: none;
      pointer-events: none;
      font-size: 1rem;
    }

    .arrow {
      font-size: 1.15em;
      font-weight: 700;
    }
    .arrow.active {
      color: #fe7737;
    }
    .arrow:disabled {
      color: #c4c4c4;
    }
  `;

  constructor() {
    super();
    this.employees = [];
    this.viewMode = 'table';
    this.page = 1;
  }

  connectedCallback() {
    super.connectedCallback();
    this._unsubscribe = store.subscribe(() => {
      this.employees = store.getState().employees;
    });
    this.employees = store.getState().employees;
  }

  disconnectedCallback() {
    this._unsubscribe();
    super.disconnectedCallback();
  }

  _setView(mode) {
    this.viewMode = mode;
    this.page = 1;
  }

  _setPage(page) {
    this.page = page;
  }

  renderPagination(total, pageSize, page) {
    const pageCount = Math.ceil(total / pageSize);
    if (pageCount <= 1) return null;

    const createPageItems = () => {
      const pages = [];
      if (pageCount <= 7) {
        for (let i = 1; i <= pageCount; i++) pages.push(i);
      } else {
        if (page <= 4) {
          pages.push(1, 2, 3, 4, 5, '...', pageCount);
        } else if (page >= pageCount - 3) {
          pages.push(
            1,
            '...',
            pageCount - 4,
            pageCount - 3,
            pageCount - 2,
            pageCount - 1,
            pageCount
          );
        } else {
          pages.push(1, '...', page - 1, page, page + 1, '...', pageCount);
        }
      }
      return pages;
    };
    const items = createPageItems();

    return html`
      <div class="pagination">
        <button
          class="pagination-btn arrow"
          ?disabled=${page === 1}
          @click=${() => this._setPage(page - 1)}
          aria-label="Previous"
        >
          &lsaquo;
        </button>
        ${items.map((p) =>
          p === '...'
            ? html`<span class="pagination-ellipsis">...</span>`
            : html`
                <button
                  class="pagination-btn ${p === page ? 'active' : ''}"
                  @click=${() => this._setPage(p)}
                  aria-current=${p === page ? 'page' : undefined}
                >
                  ${p}
                </button>
              `
        )}
        <button
          class="pagination-btn arrow"
          ?disabled=${page === pageCount}
          @click=${() => this._setPage(page + 1)}
          aria-label="Next"
        >
          &rsaquo;
        </button>
      </div>
    `;
  }

  render() {
    const isTable = this.viewMode === 'table';
    const hasData = Array.isArray(this.employees) && this.employees.length > 0;
    const start = (this.page - 1) * PAGE_SIZE;
    const end = start + PAGE_SIZE;
    const employeesToShow = hasData ? this.employees.slice(start, end) : [];

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
                .employees=${employeesToShow}
              ></employee-table>`
            : html`<div class="empty">${this.t('list.empty')}</div>`
          : hasData
          ? html`<employee-cards
              .employees=${employeesToShow}
            ></employee-cards>`
          : html`<div class="empty">${this.t('list.empty')}</div>`}
      </div>

      ${hasData
        ? this.renderPagination(this.employees.length, PAGE_SIZE, this.page)
        : ''}
    `;
  }
}

customElements.define('employee-list-page', EmployeeListPage);
