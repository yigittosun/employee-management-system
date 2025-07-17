import {LitElement, html, css} from 'lit';

export class AppHeader extends LitElement {
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
  `;

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
            <span>Employees</span>
          </a>
          <a class="nav-link add" href="/add">
            <vaadin-icon icon="vaadin:plus" aria-label="Add"></vaadin-icon>
            <span>Add New</span>
          </a>
        </nav>
      </div>
    `;
  }
}
customElements.define('app-header', AppHeader);
