<template>
	<div class="result">
		<router-link :to="{name: 'market', params: {id: result.id}}">{{result.name}}</router-link><br />
		<address>Babelsberger Straße 16, Potsdam</address>
	</div>
</template>

<script>
	export default {
		name: 'SearchResult',
		props: {
			result: {
				type: Object,
				required: true
			}
		}
	};
</script>