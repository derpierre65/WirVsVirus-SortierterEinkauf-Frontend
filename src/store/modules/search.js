const search = {
	namespaced: true,
	state: {
		selected: [],
		starred: [],
		search: {},
		saved: false
	},
	mutations: {
		setSelected(state, productId) {
			state.selected.push(productId);
		},
		removeSelected(state, index) {
			state.selected.splice(index, 1);
		},
		addStar(state, marketId) {
			state.starred.push(marketId);
		},
		removeStar(state, index) {
			state.starred.splice(index, 1);
		},
		save(state, search) {
			state.search = search;
			state.saved = true;
		}
	},
	actions: {
		star({ commit, state }, marketId) {
			if (state.starred.includes(marketId)) {
				commit('removeStar', state.starred.indexOf(marketId));
			}
			else {
				commit('addStar', marketId);
			}
		},
		save({ commit }, search) {
			commit('save', search);
		},
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