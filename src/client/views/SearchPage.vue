<template>
	<div>
		<span v-if="!allowGeolocation">{{$t('geolocation.notAvailable')}}</span>
		<div v-else>
			<span v-if="!locationGiven">
				{{$t('geolocation.accept')}}
				<button @click="getLocation">{{$t('geolocation.request')}}</button>
			</span>
			<template v-else>
				hallo: {{location}}<br />

				<product-item v-for="product in products" :product="product" v-model="product.selected" :key="product.id"/>
			</template>
		</div>
	</div>
</template>

<script>
	import SearchResult from '../components/SearchResult';
	import ProductItem from '../components/ProductItem';

	export default {
		name: 'SearchPage',
		components: { ProductItem, SearchResult },
		data() {
			return {
				allowGeolocation: false,
				locationGiven: false,
				location: {
					latitude: 0,
					longitude: 0
				},
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
			this.allowGeolocation = typeof navigator.geolocation !== 'undefined';
			this.getLocation();
		},
		methods: {
			getLocation() {
				if (this.allowGeolocation) {
					navigator.geolocation.getCurrentPosition(({ coords }) => {
						this.locationGiven = true;
						this.location = { latitude: coords.latitude, longitude: coords.longitude };
					});
				}
			}
		}
	};
</script>