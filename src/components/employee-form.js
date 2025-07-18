import {LitElement, html, css} from 'lit';
import {LocalizeMixin} from '../i18n/localize-mixin.js';

export class EmployeeForm extends LocalizeMixin(LitElement) {
  static properties = {employee: {type: Object}};

  static styles = css`
    :host {
      display: block;
    }
    form {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 1.5rem;
      width: 100%;
    }
    .field {
      display: flex;
      flex-direction: column;
    }
    label {
      font-size: 0.75rem;
      color: #666;
      margin-bottom: 0.25rem;
    }
    input,
    select {
      padding: 0.5rem;
      font-size: 1rem;
      border: 1px solid #ccc;
      border-radius: 4px;
      box-sizing: border-box;
    }
    .actions {
      grid-column: span 3;
      display: flex;
      justify-content: center;
      gap: 1rem;
      margin-top: 2rem;
    }
    button.save {
      background: #fe7737;
      color: #fff;
      border: none;
      padding: 0.75rem 2rem;
      border-radius: 4px;
      font-size: 1rem;
      cursor: pointer;
    }
    button.cancel {
      background: none;
      color: #6152e4;
      border: 2px solid #6152e4;
      padding: 0.75rem 2rem;
      border-radius: 4px;
      font-size: 1rem;
      cursor: pointer;
    }
  `;

  constructor() {
    super();
    this.employee = {
      firstName: '',
      lastName: '',
      doe: '',
      dob: '',
      phone: '',
      email: '',
      department: '',
      position: '',
    };
  }

  updated(changed) {
    if (changed.has('employee')) {
      const f = this.shadowRoot;
      [
        'firstName',
        'lastName',
        'doe',
        'dob',
        'phone',
        'email',
        'department',
        'position',
      ].forEach((field) => {
        const input = f.querySelector(`[name="${field}"]`);
        if (input) input.value = this.employee[field] || '';
      });
    }
  }

  _onInput(e) {
    const field = e.target.name;
    this.employee = {...this.employee, [field]: e.target.value};
  }

  _onSubmit(e) {
    e.preventDefault();
    const detail = {...this.employee};
    this.dispatchEvent(
      new CustomEvent('submit', {
        detail,
        bubbles: true,
        composed: true,
      })
    );
  }

  render() {
    const t = this.t.bind(this);
    return html`
      <form @submit=${this._onSubmit}>
        <div class="field">
          <label>${t('form.firstName')}</label>
          <input name="firstName" @input=${this._onInput} required />
        </div>
        <div class="field">
          <label>${t('form.lastName')}</label>
          <input name="lastName" @input=${this._onInput} required />
        </div>
        <div class="field">
          <label>${t('form.doe')}</label>
          <input type="date" name="doe" @input=${this._onInput} />
        </div>
        <div class="field">
          <label>${t('form.dob')}</label>
          <input type="date" name="dob" @input=${this._onInput} />
        </div>
        <div class="field">
          <label>${t('form.phone')}</label>
          <input name="phone" @input=${this._onInput} />
        </div>
        <div class="field">
          <label>${t('form.email')}</label>
          <input type="email" name="email" @input=${this._onInput} />
        </div>
        <div class="field">
          <label>${t('form.department')}</label>
          <input name="department" @input=${this._onInput} />
        </div>
        <div class="field">
          <label>${t('form.position')}</label>
          <select name="position" @input=${this._onInput}>
            <option value="">${t('form.select')}</option>
            <option>Developer</option>
            <option>Manager</option>
            <option>Designer</option>
            <option>QA Engineer</option>
            <option>DevOps Engineer</option>
          </select>
        </div>
        <div class="actions">
          <button type="submit" class="save">${t('form.save')}</button>
          <button
            type="button"
            class="cancel"
            @click=${() => window.history.back()}
          >
            ${t('form.cancel')}
          </button>
        </div>
      </form>
    `;
  }
}

customElements.define('employee-form', EmployeeForm);
