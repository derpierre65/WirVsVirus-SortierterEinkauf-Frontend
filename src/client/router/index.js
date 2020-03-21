import Vue from 'vue';
import Router from 'vue-router';
import SearchPage from '../views/SearchPage';
import InfoPage from '../views/InfoPage';
import MarketPage from '../views/MarketPage';
import FavoriteMarketsPage from '../views/FavoriteMarketsPage';

Vue.use(Router);

let router = new Router({
	mode: 'history',
	base: process.env.NODE_ENV !== 'production' ? '/' : '/app/',
	linkActiveClass: 'semiActive',
	linkExactActiveClass: 'active',
	routes: [
		{
			path: '/',
			name: 'index',
			component: SearchPage
		},
		{
			path: '/info',
			name: 'info',
			component: InfoPage
		},
		{
			path: '/market/:id',
			name: 'market',
			component: MarketPage
		},
		{
			path: '/favorite-markets',
			name: 'favorite-markets',
			component: FavoriteMarketsPage
		},
		{
			path: '*',
			redirect: '/'
		}
	]
});

export default router;