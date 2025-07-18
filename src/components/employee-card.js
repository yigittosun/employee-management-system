import { LitElement, html, css } from 'lit';
import { LocalizeMixin } from '../i18n/localize-mixin.js';

export class EmployeeCard extends LocalizeMixin(LitElement) {
  static properties = {
    employee: { type: Object }
  };

  static styles = css`
    :host { display:block; }
    .card {
      background:#fff;
      border-radius:8px;
      box-shadow:0 1px 3px rgba(0,0,0,.15);
      padding:1.25rem 1.5rem;
      width:100%;
      box-sizing:border-box;
    }
    .grid {
      display:grid;
      grid-template-columns:auto 1fr;
      row-gap:0.25rem;
      column-gap:0.5rem;
      font-size:0.95rem;
    }
    .label {
      color:#999;
      text-align:right;
      padding-right:0.25rem;
    }
    .value {
      color:#333;
    }
    .actions {
      margin-top:1rem;
      display:flex;
      gap:0.5rem;
    }
    button {
      padding:0.4rem 1rem;
      font-size:0.875rem;
      border-radius:4px;
      border:none;
      cursor:pointer;
      line-height:1;
    }
    button.edit { background:#6152e4; color:#fff; }
    button.delete { background:#ff792b; color:#fff; }
  `;

  constructor() {
    super();
    this.employee = {};
  }

  _edit() {
    this.dispatchEvent(new CustomEvent('edit', { detail:this.employee?.id, bubbles:true, composed:true }));
  }
  _delete() {
    this.dispatchEvent(new CustomEvent('delete', { detail:this.employee?.id, bubbles:true, composed:true }));
  }

  render() {
    const e = this.employee ?? {};
    const t = this.t.bind(this);
    return html`
      <div class="card">
        <div class="grid">
          <span class="label">${t('list.firstName')}:</span><span class="value">${e.firstName ?? e.name ?? ''}</span>
          <span class="label">${t('list.lastName')}:</span><span class="value">${e.lastName ?? ''}</span>
          <span class="label">${t('list.doe')}:</span><span class="value">${e.doe ?? ''}</span>
          <span class="label">${t('list.dob')}:</span><span class="value">${e.dob ?? ''}</span>
          <span class="label">${t('list.phone')}:</span><span class="value">${e.phone ?? ''}</span>
          <span class="label">${t('list.email')}:</span><span class="value">${e.email ?? ''}</span>
          <span class="label">${t('list.department')}:</span><span class="value">${e.department ?? ''}</span>
          <span class="label">${t('list.position')}:</span><span class="value">${e.position ?? ''}</span>
        </div>
        <div class="actions">
          <button class="edit" @click=${this._edit}>${t('list.edit')}</button>
          <button class="delete" @click=${this._delete}>${t('list.delete')}</button>
        </div>
      </div>
    `;
  }
}
customElements.define('employee-card', EmployeeCard);
