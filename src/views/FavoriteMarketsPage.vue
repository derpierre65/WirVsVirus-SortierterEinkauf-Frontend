<template>
	<div>
		<search-result v-for="entry in entries" :result="entry" :key="entry.id" />
		<infinite-loading type="favoriteMarkets" @infinite="handler" spinner="waveDots" />
	</div>
</template>

<script>
	import SearchResult from '../components/SearchResult';
	import {mapState} from 'vuex';
	import {itemsPerPage} from '../store/modules/search';

	export default {
		name: 'FavoriteMarketsPage',
		components: { SearchResult },
		data() {
			return {
				page: 0,
				entries: []
			};
		},
		computed: {
			...mapState('search', ['starred']),
		},
		methods: {
			handler(state) {
				if (this.starred.length / itemsPerPage === this.page) {
					return state.complete();
				}

				let locationIds = this.starred.slice(itemsPerPage * this.page, itemsPerPage + itemsPerPage * this.page);
				if (locationIds.length === 0) {
					return state.complete();
				}

				this.axios.post('/locations/details', locationIds).then((response) => {
					this.page++;
					this.entries.push(...response.data);

					if (response.data.length === 0) {
						state.complete();
					}
					else {
						state.loaded();
					}
				}).catch((err) => {
					console.log(err);
					state.error();
				});
			}
		}
	};
</script>