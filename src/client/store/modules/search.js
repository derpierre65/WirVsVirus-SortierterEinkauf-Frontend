const search = {
	namespaced: true,
	state: {
		selected: []
	},
	mutations: {
		setSelected(state, productId) {
			state.selected.push(productId);
		},
		removeSelected(state, index) {
			state.selected.splice(index, 1);
		}
	},
	actions: {
		setSelected({ commit, state }, productId) {
			if (state.selected.includes(productId)) {
				commit('removeSelected', state.selected.indexOf(productId));
			}
			else {
				commit('setSelected', productId);
			}
		}
	}
};

export default search;