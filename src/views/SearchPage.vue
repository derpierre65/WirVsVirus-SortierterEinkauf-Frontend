<template>
	<span v-if="!allowGeolocation">{{$t('geolocation.notAvailable')}}</span>
	<div v-else>
		<span class="location-box" v-if="!hasLocation">
			{{$t('geolocation.accept')}}
			<button @click="getLocation">{{$t('geolocation.request')}}</button>
		</span>
		<div v-else>
			<h1 class="text-center">{{$t('search.introPhrase')}}</h1><br>

			<div class="row product-selection">
				<div class="col-xs-12 col-sm-6 col-md-4" v-for="(productName, productId) in products" :key="productId">
					<product-item :name="productName" @click.native="productClick(productId)" :class="{selected: selectedIds.includes(productId)}" />
				</div>
			</div>

			<div class="button-box">
				<button class="button" :disabled="!selectedIds.length" @click="search"><i class="fa fa-search"></i> {{$t('button.search')}}</button>
			</div>
		</div>

		<template v-if="searched">
			<h2><u>{{$t('search.results')}}</u></h2>

			<search-result v-for="result of results" :key="result.id" :result="result" />

			<infinite-loading type="search" @infinite="nextSearchPage" spinner="waveDots" :identifier="searchIdentifier" />
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
				resultIds: [],
				searchIdentifier: Date.now(),
				searchPage: 0,
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
			productClick(productId) {
				this.$store.dispatch('search/setSelected', productId);
			},
			nextSearchPage(state) {
				if (this.searchMaxPages === this.searchPage) {
					return state.complete();
				}

				let locationIds = this.resultIds.slice(10 * this.searchPage, 10 + 10 * this.searchPage);
				if (locationIds.length === 0) {
					return state.complete();
				}

				this.axios.get('/locations/details?location_ids=' + JSON.stringify(locationIds), { params: { location_ids: locationIds } }).then((response) => {
					this.searchPage++;
					let results = [];
					for (let key in response.data) {
						if (response.data.hasOwnProperty(key)) {
							results.push(response.data[key]);
						}
					}

					this.results.push(...results);
					state.loaded();
				}).catch((err) => {
					console.log(123, err);
					state.error();
				});
			},
			search() {
				if (!this.selectedIds.length) {
					return false;
				}

				this.axios.post('/search', {
					lat: this.location.latitude,
					lon: this.location.longitude,
					radius: 600,
					products: this.selectedIds
				}).then((response) => {
					this.resultIds = response.data;
					this.searchMaxPages = this.resultIds / 10;
					this.results = [];
					this.searchPage = 0;
					this.searchIdentifier = Date.now();
					this.searched = true;
				}).catch((err) => {
					console.log('error', err);
					// TODO error
				});
			},
			getLocation() {
				//TODO: figure out about IE
				if (this.allowGeolocation && !this.hasLocation) {
					navigator.geolocation.getCurrentPosition(({ coords }) => {
							this.$store.dispatch('setGeolocation', { latitude: coords.latitude, longitude: coords.longitude });
						},
						({ errors }) => { console.log('Request failed');}
					);
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