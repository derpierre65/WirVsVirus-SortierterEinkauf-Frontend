<template>
	<div class="locale-changer">
		<img class="pointer" width="32" height="32" :src="'/app/assets/icons/flag/' + $i18n.i18next.language + '.svg'" @click="openLanguageChange" />
		<modal title="language.change" v-model="changeLanguage" v-if="changeLanguage">
			<ul>
				<li v-for="lang in languages">
					<img class="pointer" width="48" height="48" :src="'/app/assets/icons/flag/' + lang + '.svg'" @click="doChangeLanguage(lang)" />
				</li>
			</ul>
		</modal>
	</div>
</template>

<script>
	import Modal from './Modal';

	export default {
		name: 'locale-changer',
		components: { Modal },
		data() {
			return {
				languages: ['en', 'de'],
				changeLanguage: false
			};
		},
		methods: {
			doChangeLanguage(newLanguage) {
				this.$i18n.i18next.changeLanguage(newLanguage);
				this.changeLanguage = false;
			},
			openLanguageChange() {
				this.changeLanguage = true;
			}
		}
	};
</script>