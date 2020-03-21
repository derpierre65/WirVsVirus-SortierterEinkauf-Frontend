<template>
	<div>
		<span v-if="!allowGeolocation">{{$t('geolocation.notAvailable')}}</span>
		<div v-else>
			<span v-if="!locationGiven">
				{{$t('geolocation.accept')}}
				<button @click="getLocation">{{$t('geolocation.request')}}</button>
			</span>
			<template v-else>
				hallo: {{location}}
			</template>
		</div>

		<div>
			<span>Welche Produkte möchtest du?</span>
			<div>
				<button>Eins</button>
				<button>Zwei</button>
				<button>Drei</button>
				<button>Vier</button>
				<button>Fünf</button>
			</div>

			<div>
				<button>Auswahl entfernen</button>
			</div>

			<div>
				<button>Einkauf starten</button>
			</div>

		</div>

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