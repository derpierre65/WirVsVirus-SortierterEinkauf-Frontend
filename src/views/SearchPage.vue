<template>
	<span v-if="!allowGeolocation">{{$t('geolocation.notAvailable')}}</span>
	<div v-else>
		<div class="text-center" v-if="!hasLocation">
			<p>{{$t('geolocation.accept')}}</p>
			<button @click="getLocation">{{$t('geolocation.request')}}</button>
		</div>
		<div v-else>
			<h1 class="text-center">{{$t('search.introPhrase')}}</h1><br>

			<div class="row">
				<div class="col-xs-12 col-sm-6 col-md-4" v-for="(productName, productId) in products" :key="productId">
					<product-item :name="productName" @click.native="productClick(productId)" :class="{selected: selectedIds.includes(productId)}" />
				</div>
			</div>

			<div class="button-box">
				<button :disabled="!selectedIds.length" @click="search"><i class="fa fa-search"></i> {{$t('button.search')}}</button>
			</div>
		</div>

		<template v-if="searched">
			<h2><u>{{$t('search.results')}}</u></h2>

			<search-result v-for="result of results" :key="result.id" :result="result" />

			<infinite-loading type="search" @infinite="nextSearchPage" spinner="waveDots" :identifier="searchIdentifier" />
		</template>

		<modal :title="$t('geolocation.error')" v-if="geolocationModal" v-model="geolocationModal">
			{{$t('geolocation.errors.' + geolocationError)}}
		</modal>
	</div>
</template>

<script>
	import SearchResult from '../components/SearchResult';
	import ProductItem from '../components/ProductItem';
	import {mapGetters, mapState} from 'vuex';
	import Modal from '../components/Modal';

	export default {
		name: 'SearchPage',
		components: { Modal, ProductItem, SearchResult },
		data() {
			return {
				allowGeolocation: typeof navigator.geolocation !== 'undefined',
				geolocationError: null,
				geolocationModal: false,
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

				this.axios.post('/locations/details', {location_ids: locationIds}).then((response) => {
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
					state.error();
				});
			},
			search() {
				if (!this.selectedIds.length) {
					return false;
				}

				this.$store.dispatch('setLoading', true);
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
				}).finally(() => {
					this.$store.dispatch('setLoading', false);
				});
			},
			getLocation() {
				if (this.allowGeolocation && !this.hasLocation) {
					this.geolocationError = null;
					this.$store.dispatch('setLoading', true);
					let finished = (err, coords) => {
						this.$store.dispatch('setLoading', false);
						if (err) {
							this.geolocationModal = true;
							this.geolocationError = err.code;
							return;
						}

						this.$store.dispatch('setGeolocation', { latitude: coords.latitude, longitude: coords.longitude });
					};
					navigator.geolocation.getCurrentPosition((data) => {
						finished(null, data.coords);
					}, finished);
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