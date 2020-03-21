<template>
	<span v-if="!allowGeolocation">{{$t('geolocation.notAvailable')}}</span>
	<div class="container" v-else>
		<span v-if="hasLocation">
			{{$t('geolocation.accept')}}
			<button @click="getLocation">{{$t('geolocation.request')}}</button>
		</span>
		<div v-else>
			location: {{location}}<br />

			<span class="big-heading">Hallo!</span><br>

			<span class="heading">Was möchtest du einkaufen?</span><br>

			<div class="row product-selection">
				<product-item class="col-xs-6 col-md-3" v-for="product in products" :product="product" :key="product.id" @click.native="productClick(product)" :class="{selected: selectedIds.includes(product.id)}" />
			</div>

			<!-- <product-item v-for="product in products" :product="product" :key="product.id" @click.native="productClick(product)" :class="{selected: product.selected}" /> -->

			<button class="button" :disabled="!selectedIds.length" @click="search">search</button>
		</div>

		<template v-if="searched">
			<search-result v-for="result of results" />

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
				searchMaxPages: 0,
				searched: false
			};
		},
		created() {
			this.$store.dispatch('product/fetch').then(() => {
				this.selectedProducts = this.$store.state.search.selected;
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

					setTimeout(() => resolve({ data }), 5000);
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