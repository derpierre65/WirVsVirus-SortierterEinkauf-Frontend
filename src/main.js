import Vue from 'vue';
import axios from 'axios';
import VueAxios from 'vue-axios';
import InfiniteLoading from 'vue-infinite-loading';
import App from './App.vue';
import i18n from './i18n';
import store from './store';
import router from './router';

Vue.use(VueAxios, axios);
Vue.use(InfiniteLoading, {
	slots: {
		noResults: {
			render(h) {
				return h('div', { attrs: { class: 'info' } }, this.$t(this.$parent.$attrs.type + '.noResults'));
			}
		},
		noMore: {
			render(h) {
				return h('div', { attrs: { class: 'info' } }, this.$t(this.$parent.$attrs.type + '.noMore'));
			}
		},
		error: {
			render(h) {
				return h('div', { attrs: { class: 'error' } }, this.$t('infiniteLoading.error'));
			}
		}
	}
});

Vue.config.productionTip = false;

Vue.mixin({
	data() {
		return { baseUrl: publicPath };
	}
});

new Vue({
	el: '#app',
	store,
	router,
	i18n,
	render: h => h(App)
});