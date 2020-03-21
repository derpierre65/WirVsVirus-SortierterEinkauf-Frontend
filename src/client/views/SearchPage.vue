<template>
	<span v-if="!allowGeolocation">{{$t('geolocation.notAvailable')}}</span>
	<div class="container" v-else>
		<span v-if="hasLocation">
			{{$t('geolocation.accept')}}
			<button class="button" @click="getLocation">{{$t('geolocation.request')}}</button>
		</span>
		<div class="container" v-else>
			hallo: {{location}}<br><br>

			<span class="big-heading">Hallo!</span><br>

			<span class="heading">Was möchtest du einkaufen?</span><br>

			<div class="row">
				<div class="col-1">
					<button>Button 1</button>
				</div>
				<div class="col-1">
					<button>Button 2</button>
				</div>
				<div class="col-1">
					<button>Button 3</button>
				</div>
				<div class="col-1">
					<button>Button 4</button>
				</div>
				<div class="col-1">
					<button>Button 5</button>
				</div>
				<div class="col-1">
					<button>Button 6</button>
				</div>
				<div class="col-1">
					<button>Button 7</button>
				</div>
				<div class="col-1">
					<button>Button 8</button>
				</div>
				<div class="col-1">
					<button>Button 9</button>
				</div>
				<div class="col-1">
					<button>Button 10</button>
				</div>
				<div class="col-1">
					<button>Button 11</button>
				</div>

			</div>

			<product-item v-for="product in products" :product="product" :key="product.id" @click.native="productClick(product)" :class="{selected: product.selected}" />



			<button class="button" :disabled="!selectedProducts.length" @click="search">search</button>
		</div>

		<template v-if="searched">
			<search-result v-for="i in 20" :key="i" />
		</template>
		<div class = "container">
			<div class="row">
  				<div class="col-12 col-md-4">.col-12 .col-md-4</div>
 				<div class="col-12 col-md-4">.col-12 .col-md-4</div>
				<div class="col-12 col-md-4">.col-12 .col-md-4</div>
			</div>
			<div class="row">
  				<div class="col-12 col-md-4">.col-12 .col-md-4</div>
 				<div class="col-12 col-md-4">.col-12 .col-md-4</div>
				<div class="col-12 col-md-4">.col-12 .col-md-4</div>
			</div>
			<button class = "submitButton">Suche starten</button><
		</div>
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
