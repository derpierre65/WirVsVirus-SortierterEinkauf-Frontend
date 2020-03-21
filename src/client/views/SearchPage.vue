<template>
	<span v-if="!allowGeolocation">{{$t('geolocation.notAvailable')}}</span>
	<div v-else>
		<span v-if="!hasLocation">
			{{$t('geolocation.accept')}}
			<button @click="getLocation">{{$t('geolocation.request')}}</button>
		</span>
		<div v-else>
			hallo: {{location}}<br />

			<product-item v-for="product in products" :product="product" :key="product.id" @click.native="productClick(product)" :class="{selected: product.selected}" />

			<button :disabled="!selectedProducts.length" @click="search">search</button>
		</div>

		<template v-if="searched">
			<search-result v-for="i in 20" />
		</template>
	</div>
</template>

<script>
	import SearchResult from '../components/SearchResult';
	import ProductItem from '../components/ProductItem';
	import {mapGetters, mapState} from 'vuex';
	import Vue from 'vue';

	export default {
		name: 'SearchPage',
		components: { ProductItem, SearchResult },
		data() {
			return {
				allowGeolocation: typeof navigator.geolocation !== 'undefined',
				searched: false,
				// TODO get this from backend
				products: [
					{
						id: 1,
						product_name: 'product 1',
						amount: 5,
						recorded_at: '2020-02-02 13:33:37'
					},
					{
						id: 2,
						product_name: 'product 2',
						amount: 5,
						recorded_at: '2020-02-02 13:33:37'
					},
					{
						id: 3,
						product_name: 'product 3',
						amount: 5,
						recorded_at: '2020-02-02 13:33:37'
					}
				]
			};
		},
		created() {
			this.selectedProducts = this.$store.state.search.selected;
			this.getLocation();
		},
		computed: {
			...mapState(['location']),
			...mapGetters(['hasLocation']),
			selectedProducts: {
				// get selected products
				get() {
					return this.products.filter((product) => product.selected);
				},
				// set selected products by id array
				set(products) {
					for (let product of this.products) {
						if (products.includes(product.id)) {
							product.selected = true;
						}
					}
				}
			},
			/**
			 * get a list of selected product ids
			 *
			 * @returns {*}
			 */
			selectedProductIds() {
				return this.selectedProducts.map((product) => product.id);
			}
		},
		methods: {
			productClick(product) {
				Vue.set(product, 'selected', !product.selected);
			},
			search() {
				if (!this.selectedProducts.length) {
					return false;
				}

				this.$store.dispatch('search/setSelected', this.selectedProductIds);
				// TODO replace with backend request
				Promise.resolve().then(() => {

				});
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