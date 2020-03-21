<template>
	<div>
		<div class="menuBackground">
			<router-link :to="{name: 'index'}">{{$t('navigation.home')}}</router-link>
			<router-link :to="{name: 'info'}">{{$t('navigation.info')}}</router-link>
			<router-link :to="{name: 'favorite-markets'}">{{$t('navigation.market')}}</router-link>

			<i class="fa fa32" :class="{'fa-moon-o': !darkMode, 'fa-sun-o': darkMode}" @click="toggleDarkMode"></i>
			<locale-changer/>
		</div>
		<div class="layoutBoundary">
			<router-view class="container" />
		</div>
	</div>
</template>

<script>
	import LocaleChanger from './components/LanguageSwitch';

	export default {
		components: { LocaleChanger },
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