import {LitElement, html, css} from 'lit';

export class NotificationToast extends LitElement {
  static properties = {
    open: {type: Boolean, reflect: true},
    message: {type: String},
  };

  static styles = css`
    :host {
      position: fixed;
      top: 2rem;
      right: 2rem;
      z-index: 5000;
      display: none;
    }
    :host([open]) {
      display: block;
      animation: slide-in 0.2s;
    }
    .toast {
      background: #22bb33;
      color: #fff;
      padding: 1rem 2rem;
      border-radius: 8px;
      box-shadow: 0 6px 24px rgba(0, 0, 0, 0.14);
      font-size: 1rem;
      min-width: 180px;
      max-width: 380px;
      letter-spacing: 0.03em;
      opacity: 0.97;
      pointer-events: none;
    }
    @keyframes slide-in {
      from {
        transform: translateY(-24px);
        opacity: 0;
      }
      to {
        transform: translateY(0);
        opacity: 1;
      }
    }
  `;

  constructor() {
    super();
    this.open = false;
    this.message = '';
    this._timer = null;
  }

  show(msg = '', duration = 2400) {
    this.message = msg;
    this.open = true;
    clearTimeout(this._timer);
    this._timer = setTimeout(() => {
      this.open = false;
    }, duration);
  }

  render() {
    return html`<div class="toast">${this.message}</div>`;
  }
}

customElements.define('notification-toast', NotificationToast);
