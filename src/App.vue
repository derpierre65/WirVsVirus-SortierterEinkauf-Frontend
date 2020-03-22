<template>
	<div>
		<div class="layoutBoundary">
			<router-view class="container" />
		</div>
		<div class="menuBackground">
			<ul>
				<li>
					<a href="/">
						<i class="fa fa24 fa-home"></i>
						<span>{{$t('navigation.home')}}</span>
					</a>
				</li>
				<router-link tag="li" :to="{name: 'index'}">
					<a>
						<i class="fa fa24 fa-search"></i>
					<span>{{$t('navigation.search')}}</span>
					</a>
				</router-link>
				<router-link tag="li" :to="{name: 'favorite-markets'}">
					<a>
						<i class="fa fa24 fa-star"></i>
						<span>{{$t('navigation.favoriteMarkets')}}</span>
					</a>
				</router-link>
				<li>
					<a>
						<i class="fa fa32" :class="{'fa-moon-o': !darkMode, 'fa-sun-o': darkMode}" @click="toggleDarkMode"></i>
					</a>
				</li>
				<li>
					<locale-changer/>
				</li>
			</ul>
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