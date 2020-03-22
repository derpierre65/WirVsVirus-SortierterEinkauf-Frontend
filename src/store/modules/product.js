import Vue from 'vue';

const product = {
	namespaced: true,
	state: {
		fetched: false,
		entries: {}
	},
	mutations: {
		updateProducts(state, productList) {
			state.entries = productList;
		}
	},
	actions: {
		fetch({ commit, dispatch }) {
			dispatch('setLoading', true, { root: true });

			return new Promise((resolve, reject) => {
				Vue.axios.get('/products').then((response) => {
					let products = response.data;
					commit('updateProducts', products);

					resolve();
				}).catch(reject).finally(() => {
					dispatch('setLoading', false, { root: true });
				})
			});
		}
	},
};

export default product;