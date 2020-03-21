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
		fetch({ commit }) {
			return new Promise((resolve, reject) => {
				Promise.resolve({
					data: [
						{
							id: 1,
							product_name: 'product 1',
							amount: 5,
							recorded_at: '2020-02-02 13:33:37'
						},
						{
							id: 2,
							product_name: 'product 2',
							amount: 5,
							recorded_at: '2020-02-02 13:33:37'
						},
						{
							id: 3,
							product_name: 'product 3',
							amount: 5,
							recorded_at: '2020-02-02 13:33:37'
						},
						{
							id: 4,
							product_name: 'product 4',
							amount: 5,
							recorded_at: '2020-02-02 13:33:37'
						}
					]
				}).then((response) => {
					let products = {};
					for (let product of response.data) {
						products[product.id] = product;
					}
					commit('updateProducts', products);

					resolve();
				}).catch(reject);
			});
		}
	},
	getters: {
		entriesArray(state) {
			return Object.values(state.entries);
		}
	}
};

export default product;