<template>
	<div class="locale-changer">
		<img :src="'assets/icons/flag/' + language + '.svg'" />
		<select v-model="language">
			<option v-for="(language, i) in languages" :key="`Lang${i}`" :value="language">{{ language }}</option>
		</select>
	</div>
</template>

<script>
	export default {
		name: 'locale-changer',
		data () {
			return {
				language: this.$i18n.i18next.language,
				languages: ['en', 'de']
			}
		},
		watch: {
			language(language){
				this.$i18n.i18next.changeLanguage(language);
			}
		}
	}
</script>