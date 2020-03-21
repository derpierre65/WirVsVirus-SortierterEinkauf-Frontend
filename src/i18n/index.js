import i18next from 'i18next';
import VueI18Next from '@panter/vue-i18next';
import Vue from 'vue';

Vue.use(VueI18Next);

let i18nextConfiguration = {
	lng: 'de',
	fallbackLng: 'de',
	resources: {
		de: {
			translation: require('./de')
		},
		en: {
			translation: require('./en')
		}
	},
	interpolation: {
		nestingPrefix: '_(',
		format(value, format) {
			if (format === 'bold') {
				return '<strong>' + value + '</strong>';
			}

			return value;
		}
	}
};

i18next.init(i18nextConfiguration);

const i18n = new VueI18Next(i18next);

export default i18n;