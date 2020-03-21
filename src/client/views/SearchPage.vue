<template>
	<div>
		<span v-if="!allowGeolocation">{{$t('geolocation.notAvailable')}}</span>
		<div v-else>
			<span v-if="!locationGiven">
				{{$t('geolocation.accept')}}
				<button @click="getLocation">{{$t('geolocation.request')}}</button>
			</span>
			<template v-else>
				<product-item v-for="i in 10" />

				hallo: {{location}}
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
				}
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