import {LitElement, html, css} from 'lit';
import {LocalizeMixin} from '../i18n/localize-mixin.js';

export class EmployeeForm extends LocalizeMixin(LitElement) {
  static properties = {
    employee: {type: Object},
    errors: {type: Object},
  };

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
      width: 100%; 
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
    .error {
      color: #ff792b;
      font-size: 0.85rem;
      margin-top: 0.2rem;
      min-height: 1.2em;
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
    label .required {
      color: #ff4d4f;
      margin-left: 2px;
      font-weight: bold;
      font-size: 1.1em;
    }
    @media (max-width: 900px) {
      form {
        grid-template-columns: repeat(2, 1fr);
      }
      .actions {
        grid-column: span 2;
      }
    }
    @media (max-width: 600px) {
      form {
        grid-template-columns: 1fr;
      }
      .actions {
        grid-column: span 1;
      }
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
    this.errors = {};
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
    this.errors = {...this.errors, [field]: ''};
  }

  _validate() {
    const errors = {};
    const t = this.t.bind(this);
    Object.entries(this.employee).forEach(([key, value]) => {
      if (!value || value.trim() === '') {
        errors[key] = t('form.required');
      }
    });
    if (
      this.employee.email &&
      !/^[^@]+@[^@]+\.[^@]+$/.test(this.employee.email)
    ) {
      errors.email = t('form.invalidEmail');
    }
    return errors;
  }

  _onSubmit(e) {
    e.preventDefault();
    const errors = this._validate();
    this.errors = errors;
    if (Object.keys(errors).length === 0) {
      this.dispatchEvent(
        new CustomEvent('submit', {
          detail: {...this.employee},
          bubbles: true,
          composed: true,
        })
      );
    }
  }

  render() {
    const t = this.t.bind(this);
    const err = this.errors;
    return html`
      <form @submit=${this._onSubmit} novalidate>
        <div class="field">
          <label>${t('form.firstName')} <span class="required">*</span></label>

          <input name="firstName" @input=${this._onInput} required />
          <div class="error">${err.firstName || ''}</div>
        </div>
        <div class="field">
          <label>${t('form.lastName')} <span class="required">*</span></label>
          <input name="lastName" @input=${this._onInput} required />
          <div class="error">${err.lastName || ''}</div>
        </div>
        <div class="field">
          <label>${t('form.doe')} <span class="required">*</span></label>
          <input type="date" name="doe" @input=${this._onInput} required />
          <div class="error">${err.doe || ''}</div>
        </div>
        <div class="field">
          <label>${t('form.dob')} <span class="required">*</span></label>
          <input type="date" name="dob" @input=${this._onInput} required />
          <div class="error">${err.dob || ''}</div>
        </div>
        <div class="field">
          <label>${t('form.phone')} <span class="required">*</span></label>
          <input name="phone" @input=${this._onInput} required />
          <div class="error">${err.phone || ''}</div>
        </div>
        <div class="field">
          <label>${t('form.email')} <span class="required">*</span></label>
          <input type="email" name="email" @input=${this._onInput} required />
          <div class="error">${err.email || ''}</div>
        </div>
        <div class="field">
          <label>${t('form.department')} <span class="required">*</span></label>
          <input name="department" @input=${this._onInput} required />
          <div class="error">${err.department || ''}</div>
        </div>
        <div class="field">
          <label>${t('form.position')} <span class="required">*</span></label>
          <select name="position" @change=${this._onInput} required>
            <option value="">${t('form.select')}</option>
            <option>Developer</option>
            <option>Manager</option>
            <option>Designer</option>
            <option>QA Engineer</option>
            <option>DevOps Engineer</option>
          </select>
          <div class="error">${err.position || ''}</div>
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
