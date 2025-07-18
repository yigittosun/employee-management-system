import {LitElement, html, css} from 'lit';
import './components/app-header.js';

class MainLayout extends LitElement {
  static styles = css`

    .layout {
      display: flex;
      flex-direction: column;
      min-height: 100vh;
    }
    .content {
      flex: 1;
    }
  `;

  render() {
    return html`
      <div class="layout">
        <app-header></app-header>
        <div class="content">
          <slot></slot>
        </div>
      </div>
    `;
  }
}

customElements.define('main-layout', MainLayout);
