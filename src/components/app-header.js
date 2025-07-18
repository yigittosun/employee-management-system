import {LitElement, html, css} from 'lit';
import {LocalizeMixin} from '../i18n/localize-mixin.js';
import {getLang, setLang} from '../i18n/i18n.js';

export class AppHeader extends LocalizeMixin(LitElement) {
  static properties = {
     menuOpen: { type: Boolean, reflect: true },
  };

  static styles = css`
    :host {
      display: block;
      background: #fff;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
      font-family: 'Quicksand', sans-serif;
    }
    .container {
      position: relative;           
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
    .title img {
      height: 30px;
      vertical-align: middle;
      margin-right: 1rem;
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
      cursor: pointer;
      user-select: none;
    }
    .menu-toggle {
      display: none;
      background: none;
      border: none;
      font-size: 1.5rem;
      cursor: pointer;
      color: #fe7737;
    }

    @media (max-width: 600px) {
      .menu-toggle {
        display: inline-flex;
      }
      .nav-items {
        display: none;
      }
     .nav-items.open {
        display: flex;
        flex-direction: column;
        position: absolute;
        top: 100%;
        right: 1rem;
        background: #fff;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        padding: 0.5rem 1rem;
        gap: 0.5rem;
      }
    }
  `;

  constructor() {
    super();
    this.menuOpen = false;
  }

  _toggleMenu() {
    this.menuOpen = !this.menuOpen;
  }

  _toggleLang() {
    const current = getLang();
    const next = current === 'tr' ? 'en' : 'tr';
    document.documentElement.lang = next;
    setLang(next);
  }

  _renderLangButton() {
    const current = getLang();
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
    const t = this.t.bind(this);

    return html`
      <div class="container">
        <div class="title">
          <img src="../../public/images/ing.webp" alt="Logo" />
          <a href="/">ING</a>
        </div>

        <button
          class="menu-toggle"
          @click=${this._toggleMenu}
          aria-label="Toggle menu"
        >
          ☰
        </button>

       <div class="nav-items ${this.menuOpen ? 'open' : ''}">
          <nav>
            <a class="nav-link" href="/">
              <vaadin-icon icon="vaadin:users"></vaadin-icon>
              <span>${t('header.employees')}</span>
            </a>
            <a class="nav-link add" href="/add">
              <vaadin-icon icon="vaadin:plus"></vaadin-icon>
              <span>${t('header.addNew')}</span>
            </a>
            ${this._renderLangButton()}
          </nav>
        </div>
      </div>
    `;
  }
}
customElements.define('app-header', AppHeader);
