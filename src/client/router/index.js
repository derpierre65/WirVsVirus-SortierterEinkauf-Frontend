import Vue from 'vue';
import Router from 'vue-router';
import IndexPage from '../views/IndexPage';

Vue.use(Router);

let router = new Router({
	mode: 'history',
	base: '/',
	linkActiveClass: 'semiActive',
	linkExactActiveClass: 'active',
	routes: [
		{
			path: '/',
			name: 'index',
			component: IndexPage
		},
		{
			path: '*',
			redirect: '/'
		}
	]
});

export default router;