<template>
	<span v-if="!allowGeolocation">{{$t('geolocation.notAvailable')}}</span>
	<div v-else>
		{{test}}
		<span class="location-box" v-if="!hasLocation">
			{{$t('geolocation.accept')}}
			<button @click="getLocation">{{$t('geolocation.request')}}</button>
		</span>
		<div v-else>
			<h1 class="text-center">{{$t('search.introPhrase')}}</h1><br>

			<div class="row product-selection">
				<div class="col-xs-12 col-sm-6 col-md-4" v-for="product in products" :key="product.id">
					<product-item :product="product" @click.native="productClick(product)" :class="{selected: selectedIds.includes(product.id)}" />
				</div>
			</div>

			<div class="button-box">
				<button class="button" :disabled="!selectedIds.length" @click="search"><i class="fa fa-search"></i> {{$t('button.search')}}</button>
			</div>
		</div>

		<template v-if="searched">
			<h2><u>{{$t('search.results')}}</u></h2>

			<search-result v-for="result of results" :key="result.id" :result="result" />
			<infinite-loading @infinite="nextSearchPage" spinner="waveDots" :identifier="searchIdentifier" />
		</template>
	</div>
</template>

<script>
	import SearchResult from '../components/SearchResult';
	import ProductItem from '../components/ProductItem';
	import {mapGetters, mapState} from 'vuex';

	export default {
		name: 'SearchPage',
		components: { ProductItem, SearchResult },
		data() {
			return {
				allowGeolocation: typeof navigator.geolocation !== 'undefined',
				results: [],
				searchIdentifier: Date.now(),
				searchPage: 0,
				test: [],
				searchMaxPages: 0,
				searched: false
			};
		},
		created() {
			this.$store.dispatch('product/fetch').then(() => {
				this.getLocation();
			});
		},
		computed: {
			...mapState(['location']),
			// ...mapState('product', { products: 'entries' }),
			...mapGetters('product', { products: 'entriesArray' }),
			...mapState('search', { selectedIds: 'selected' }),
			...mapGetters(['hasLocation'])
		},
		methods: {
			productClick(product) {
				this.$store.dispatch('search/setSelected', product.id);
			},
			nextSearchPage(state) {
				// TODO replace with backend request
				// TODO move to another library - required later in favorite-market
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

					for (let i = 0; i < 20; i++) {
						data.push(Object.assign({}, result, { id: Date.now() + i }));
					}
					//</editor-fold>

					setTimeout(() => resolve({ data }), 200);
				})).then((response) => {
					this.searchPage++;
					this.searchMaxPages = 1;
					this.results.push(...response.data);

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
			},
			search() {
				if (!this.selectedIds.length) {
					return false;
				}

				this.test = [];
				this.axios.get('http://81.169.133.126:8085/api/locations/details?location_ids=[1]').then((response) => {
					this.test.push(response.data);
				});

				let data = {
					location: this.location,
					products: this.selectedIds
				};

				this.searchPage = 0;
				this.searchIdentifier = Date.now();
				this.results = [];
				this.searched = true;
			},
			getLocation() {
				if (this.allowGeolocation && !this.hasLocation) {
					navigator.geolocation.getCurrentPosition(({ coords }) => {
						this.$store.dispatch('setGeolocation', { latitude: coords.latitude, longitude: coords.longitude });
					});
				}
			}
		}
	};
</script>

<style>
	.selected {
		background: orange;
	}
</style>