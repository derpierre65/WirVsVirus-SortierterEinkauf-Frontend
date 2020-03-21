<template>
	<div class="main">
		<span v-if="!allowGeolocation">{{$t('geolocation.notAvailable')}}</span>
		<div v-else>
			<span v-if="!locationGiven">
				{{$t('geolocation.accept')}}
				<button class="default" @click="getLocation">{{$t('geolocation.request')}}</button>
			</span>
			<template v-else>
				hallo: {{location}}
			</template>
		</div>

		<div class="productSelector">
			<span class="ps_caption">Welche Produkte möchtest du?</span>

			<div class="productList">
				<button class="productItem">Eins</button>
				<button class="productItem">Zwei</button>
				<button class="productItem">Drei</button>
				<button class="productItem">Vier</button>
				<button class="productItem">Fünf</button>
			</div>

			<button class="remove">Auswahl entfernen</button>

		</div>

		<button class="submit">Einkauf starten</button>

	</div>

</template>

<script>
	import SearchResult from '../components/SearchResult';

	export default {
		name: 'SearchPage',
		components: { SearchResult },
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