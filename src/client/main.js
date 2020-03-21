import Vue from 'vue';
import axios from 'axios';
import VueAxios from 'vue-axios';
import App from './App.vue';
import i18n from './i18n';
import store from './store';
import router from './router';

Vue.use(VueAxios, axios);

Vue.config.productionTip = false;

const app = new Vue({
	el: '#app',
	store,
	router,
	i18n,
	render: h => h(App),
});