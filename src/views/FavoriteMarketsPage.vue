<template>
	<div>
		<search-result v-for="entry in entries" :result="entry" :key="entry.id" />

		<infinite-loading @infinite="handler" spinner="waveDots" />
	</div>
</template>

<script>
	import SearchResult from '../components/SearchResult';
	import {mapState} from 'vuex';

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
				// TODO replace with backend request
				(new Promise((resolve) => {
					//<editor-fold desc="remove">
					let data = [];
					let result = {
						id: 1,
						name: 'name',
						address: 'Babelsberger Straße 16, Potsdam',
						distance: 500,
						civilStatus: 1,
						products: [
							{
								1: {
									'status': 0,
									'lastUpdate': 1584790887
								}
							},
							{
								2: {
									'status': 0,
									'lastUpdate': 1584790887
								}
							},
							{
								4: {
									'status': 1,
									'lastUpdate': 1584790887
								}
							},
							{
								5: {
									'status': 2,
									'lastUpdate': 1584790887
								}
							}
						]
					};

					let ids = this.starred.slice(this.page * 10, (this.page + 1) * 10);

					for (let id of ids) {
						data.push(Object.assign({}, result, { id }));
					}
					//</editor-fold>

					setTimeout(() => resolve({ data }), 200);
				})).then((response) => {
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