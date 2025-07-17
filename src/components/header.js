import {LitElement, html, css} from 'lit';
import {LocalizeMixin} from '../i18n/localize-mixin.js';
import {getLang, setLang} from '../i18n/i18n.js';

export class AppHeader extends LocalizeMixin(LitElement) {
  static styles = css`
    :host {
      display: block;
      background: #fff;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
      font-family: 'Quicksand', sans-serif;
    }
    .container {
      max-width: 1200px;
      margin: 0 auto;
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0.75rem 1rem;
    }
    .title {
      font-size: 1.375rem;
      font-weight: bold;
      color: #000;
      margin-left: 0.5rem;
      flex: 1;
    }
    .title a {
      color: inherit;
      text-decoration: none;
    }
    nav {
      display: inline-flex;
      align-items: center;
      gap: 1rem;
      color: #fe7737;
      font-size: 1rem;
      line-height: 1;
    }
    .nav-link {
      display: inline-flex;
      align-items: center;
      gap: 0.25em;
      text-decoration: none;
      color: inherit;
      font-weight: 500;
      line-height: 1;
    }
    .nav-link vaadin-icon {
      width: 1em;
      height: 1em;
      margin-right: 0.25em;
    }
    .nav-link.add {
      opacity: 0.55;
      font-weight: 600;
    }
    .nav-link.add:hover,
    .nav-link.add:focus-visible {
      opacity: 1;
      color: #fe7737;
      outline: none;
    }
    .lang-btn {
      margin-left: 0.5rem;
      background: none;
      border: none;
      padding: 0;
      cursor: pointer;
      line-height: 1;
      font-size: 1.5em;
      user-select: none;
    }
  `;

  _toggleLang() {
    const current = getLang();
    const next = current === 'tr' ? 'en' : 'tr';
    document.documentElement.lang = next;
    setLang(next);
  }

  _renderLangButton() {
    const current = getLang();
    // Bayrak: ŞU ANKİ dili göster
    const flag = current === 'tr' ? '🇹🇷' : '🇬🇧';
    const title =
      current === 'tr'
        ? this.t('header.switchToEnglish')
        : this.t('header.switchToTurkish');
    return html`
      <button
        class="lang-btn"
        @click=${this._toggleLang}
        title=${title}
        aria-label=${title}
      >
        ${flag}
      </button>
    `;
  }

  render() {
    return html`
      <div class="container">
        <div class="title"><a href="/">ING</a></div>
        <nav>
          <a class="nav-link" href="/">
            <vaadin-icon
              icon="vaadin:users"
              aria-label="Employees"
            ></vaadin-icon>
            <span>${this.t('header.employees')}</span>
          </a>
          <a class="nav-link add" href="/add">
            <vaadin-icon icon="vaadin:plus" aria-label="Add"></vaadin-icon>
            <span>${this.t('header.addNew')}</span>
          </a>
          ${this._renderLangButton()}
        </nav>
      </div>
    `;
  }
}
customElements.define('app-header', AppHeader);
