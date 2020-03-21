const search = {
	namespaced: true,
	state: {
		selected: []
	},
	mutations: {
		setSelected(state, productIds) {
			state.selected = productIds;
		}
	},
	actions: {
		setSelected({commit}, productIds) {
			commit('setSelected', productIds);
		}
	}
};

export default search;