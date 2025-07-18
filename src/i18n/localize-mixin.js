import { getLang, subscribeLang, t } from './i18n.js';

export const LocalizeMixin = (Base) => class extends Base {
  constructor() {
    super();
  }
  connectedCallback() {
    super.connectedCallback();
    this.lang = getLang();
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
