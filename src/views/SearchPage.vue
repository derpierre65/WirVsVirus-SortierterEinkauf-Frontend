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
				<button :disabled="!selectedIds.length" @click="searchStart"><i class="fa fa-search"></i> {{$t('button.search')}}</button>
			</div>
		</div>

		<template v-if="searched">
			<h2><u>{{$t('search.results')}}</u></h2>

			<search-result v-for="result of search.results" :key="result.id" :result="result" />

			<infinite-loading type="search" @infinite="nextSearchPage" spinner="waveDots" :identifier="search.identifier" />
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
				searched: false,
				search: {
					results: [],
					resultIds: [],
					identifier: Date.now(),
					page: 0,
					maxPages: 0
				}
			};
		},
		created() {
			this.$store.dispatch('product/fetch').then(() => {
				this.getLocation();
				if (this.hasSavedSearch) {
					this.search = this.savedSearch;
					this.searched = true;
				}
			});
		},
		computed: {
			...mapState(['location']),
			...mapGetters('product', { products: 'entriesArray' }),
			...mapState('search', { selectedIds: 'selected', hasSavedSearch: 'saved', savedSearch: 'search' }),
			...mapGetters(['hasLocation'])
		},
		methods: {
			productClick(productId) {
				this.$store.dispatch('search/setSelected', productId);
			},
			nextSearchPage(state) {
				let itemsPerPage = 10;
				if (this.search.resultIds / itemsPerPage === this.search.page) {
					return state.complete();
				}

				let locationIds = this.search.resultIds.slice(itemsPerPage * this.search.page, itemsPerPage + itemsPerPage * this.search.page);
				if (locationIds.length === 0) {
					return state.complete();
				}

				this.axios.post('/locations/details', locationIds).then((response) => {
					this.search.page++;
					let results = [];
					for (let key in response.data) {
						if (response.data.hasOwnProperty(key)) {
							results.push(response.data[key]);
						}
					}

					this.search.results.push(...results);
					this.searchSave().then(() => {
						state.loaded();
					});
				}).catch((err) => {
					state.error();
				});
			},
			searchSave() {
				return this.$store.dispatch('search/save', this.search);
			},
			searchStart() {
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
					this.search.resultIds = response.data;
					this.search.maxPages = this.search.resultIds / 10;
					this.results = [];
					this.search.page = 0;
					this.search.identifier = Date.now();
					this.searched = true;
					this.searchSave();
				}).catch((err) => {
					// TODO error handling
					console.log('error', err);
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