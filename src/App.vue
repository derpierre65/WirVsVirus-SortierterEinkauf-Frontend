<template>
	<div>
		<div class="menuBackground">
			<router-link :to="{name: 'index'}">{{$t('navigation.landingPage')}}</router-link>
			<router-link :to="{name: 'info'}">{{$t('navigation.infoPage')}}</router-link>
			<router-link :to="{name: 'favorite-markets'}">{{$t('navigation.market')}}</router-link>

			<i class="fa fa32" :class="{'fa-moon-o': !darkMode, 'fa-sun-o': darkMode}" @click="toggleDarkMode"></i>
		</div>
		<div class="layoutBoundary">
			<router-view class="container" />
		</div>
	</div>
</template>

<script>
	export default {
		data() {
			let darkMode = false;
			if (window.localStorage) {
				darkMode = (window.localStorage.getItem('darkMode') || '1') === '1';
			}

			return {
				darkMode
			};
		},
		created() {
			this.setDarkMode();
		},
		methods: {
			toggleDarkMode() {
				this.darkMode = !this.darkMode;
				this.setDarkMode();

				if (window.localStorage) {
					window.localStorage.setItem('darkMode', this.darkMode ? '1' : '0');
				}
			},
			setDarkMode() {
				console.log(this.darkMode);
				if (this.darkMode) {
					document.body.classList.add('dark');
				}
				else {
					document.body.classList.remove('dark');
				}
			}
		}
	};
</script>