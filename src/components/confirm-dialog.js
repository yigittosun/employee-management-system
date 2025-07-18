import {LitElement, html, css} from 'lit';
import {LocalizeMixin} from '../i18n/localize-mixin.js';

export class ConfirmDialog extends LocalizeMixin(LitElement) {
  static properties = {
    open: {type: Boolean, reflect: true},
    employee: {type: Object},
  };

  static styles = css`
    :host {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      display: none;
      align-items: center;
      justify-content: center;
      z-index: 2000;
    }
    :host([open]) {
      display: flex;
      background: rgba(0, 0, 0, 0.55);
    }
    .modal {
      background: #fff;
      border-radius: 8px;
      padding: 2rem 1.5rem 1.5rem;
      min-width: 340px;
      max-width: 95vw;
      box-shadow: 0 4px 16px rgba(0, 0, 0, 0.13);
      position: relative;
      display: flex;
      flex-direction: column;
      gap: 1.2rem;
    }
    .close {
      position: absolute;
      right: 1rem;
      top: 1rem;
      border: none;
      background: none;
      color: #fe7737;
      font-size: 2.2rem;
      cursor: pointer;
      line-height: 1;
      width: 2.8rem;
      height: 2.8rem;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 0;
    }
    .title {
      color: #fe7737;
      font-size: 1.2rem;
      font-weight: 700;
      margin-bottom: 0.2rem;
    }
    .desc {
      color: #444;
      font-size: 1rem;
      margin-bottom: 1rem;
    }
    .actions {
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
      justify-content: stretch;
      align-items: stretch;
    }
    .proceed {
      background: #fe7737;
      color: #fff;
      border: none;
      border-radius: 10px;
      font-size: 1rem;
      font-weight: 600;
      padding: 0.8rem 0;
      width: 100%;
      cursor: pointer;
    }
    .cancel {
      border: 2px solid #6152e4;
      color: #6152e4;
      background: #fff;
      border-radius: 10px;
      font-size: 1rem;
      font-weight: 500;
      padding: 0.8rem 0;
      width: 100%;
      cursor: pointer;
    }
  `;

  constructor() {
    super();
    this.open = false;
    this.employee = {};
  }

  _close() {
    this.open = false;
    this.dispatchEvent(new CustomEvent('cancel'));
  }
  _proceed() {
    this.open = false;
    this.dispatchEvent(new CustomEvent('proceed', {detail: this.employee}));
  }

  render() {
    const t = this.t.bind(this);
    const name = `${this.employee?.firstName ?? ''} ${
      this.employee?.lastName ?? ''
    }`.trim();
    let desc = t('dialog.desc');
    desc = desc.replace('{{name}}', name);

    return html`
      <div class="modal" @click=${(e) => e.stopPropagation()}>
        <button class="close" @click=${this._close}>×</button>
        <div class="title">${t('dialog.title')}</div>
        <div class="desc">${desc}</div>
        <div class="actions">
          <button class="proceed" @click=${this._proceed}>
            ${t('dialog.proceed')}
          </button>
          <button class="cancel" @click=${this._close}>
            ${t('dialog.cancel')}
          </button>
        </div>
      </div>
    `;
  }
}

customElements.define('confirm-dialog', ConfirmDialog);
