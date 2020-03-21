<template>
	<div style="border:1px solid black; margin-top:10px;padding:5px;">
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