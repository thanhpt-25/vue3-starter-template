import { configure, defineRule } from 'vee-validate'
import VeeValidateRules from '@vee-validate/rules'
import {localize, setLocale} from '@vee-validate/i18n'
import en from '@vee-validate/i18n/dist/locale/en.json'
import ja from '@vee-validate/i18n/dist/locale/ja.json'
export default {
  install() {
    Object.keys(VeeValidateRules).forEach((rule) => {
      const validationRule = VeeValidateRules[rule]
      if (typeof validationRule === 'function') {
        defineRule(rule, validationRule)
      }
    })
    configure({
      generateMessage: localize({
        en,
        ja
      }),
    })
    setLocale(import.meta.env.VITE_DEFAULT_LOCALE)
  },
}