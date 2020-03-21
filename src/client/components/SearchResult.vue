<template>
	<div style="border:1px solid black; margin-top:10px;padding:5px;position:relative;">
		<i class="fa fa-star" style="position:absolute;right:5px;top:0;color:grey" @click="star(result.id)" :class="{starred: this.$store.state.search.starred.includes(result.id)}"></i>
		<router-link :to="{name: 'market', params: {id: result.id}}">{{result.name}}</router-link>
		<br />
		<address>Babelsberger Straße 16, Potsdam</address>
	</div>
</template>

<style>
	.starred {
		color: orange !important;
	}
</style>
<script>
	export default {
		name: 'SearchResult',
		props: {
			result: {
				type: Object,
				required: true
			}
		},
		methods: {
			star(id) {
				console.log('star');
				this.$store.dispatch('search/star', id);
			}
		}
	};
</script>