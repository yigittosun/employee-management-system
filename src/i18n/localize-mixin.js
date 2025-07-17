import { getLang, subscribeLang, t } from './i18n.js';

export const LocalizeMixin = (Base) => class extends Base {
  constructor() {
    super();
    this.lang = getLang();
  }
  connectedCallback() {
    super.connectedCallback();
    this.__unsubLang = subscribeLang(lang => {
      this.lang = lang;
      this.requestUpdate();
    });
  }
  disconnectedCallback() {
    super.disconnectedCallback();
    this.__unsubLang?.();
  }
  t(key, vars) {
    return t(key, vars);
  }
};
