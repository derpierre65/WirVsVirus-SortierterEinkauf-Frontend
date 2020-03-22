import Vue from 'vue';
import formatDate from '../util/date';
import i18n from '../i18n';

Vue.filter('date', (value, format) => {
	return formatDate(format || i18n.t('date.datetimeFormat'), value);
});