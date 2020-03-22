<template>
	<div class="result pointer" @click="openMarket">
		<i class="fa fa-star fa32 pointer result-favorite" @click="star(result.id)" :class="{starred: this.$store.state.search.starred.includes(result.id)}"></i>
		<router-link :to="{name: 'market', params: {id: result.id}}">{{result.name}}</router-link>
		<br />
		<address>{{result.address}}</address>
		<br />
		<i class="fa" :class="{'fa-user': Math.random() < 0.5, 'fa-users': Math.random() > 0.5}"></i>
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
		},
		methods: {
			openMarket() {
				this.$router.push({ name: 'market', params: { id: this.result.id } });
			},
			star(id) {
				this.$store.dispatch('search/star', id);
			}
		}
	};
</script>