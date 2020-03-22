import Vue from 'vue';
import Vuex from 'vuex';
import search from './modules/search';
import product from './modules/product';

Vue.use(Vuex);

export default new Vuex.Store({
	state: {
		location: {
			longitude: null,
			latitude: null
		},
		loading: false
	},
	modules: { search, product },
	strict: process.env.NODE_ENV === 'development',
	mutations: {
		updateLocation(state, { longitude, latitude }) {
			state.location.longitude = longitude;
			state.location.latitude = latitude;
		},
		setLoading(state, newState) {
			state.loading = newState;
		}
	},
	actions: {
		setLoading({ commit }, newState) {
			commit('setLoading', newState);
		},
		setGeolocation({ commit }, location) {
			commit('updateLocation', location);
		}
	},
	getters: {
		hasLocation(state) {
			return state.location.longitude !== null && state.location.latitude !== null;
		}
	}
});