<template>
	<div class="result pointer" @click="openMarket">
		<i class="fa fa-star fa32 pointer result-favorite" @click="star(result.id)" :class="{starred: this.$store.state.search.starred.includes(result.id)}"></i>
		<router-link :to="{name: 'market', params: {id: result.id}}">{{result.name}}</router-link>
		<br />
		<address>{{result.address}}</address>
		<br />
		Derzeitige Besucher <i class="fa" :class="{'fa-user green': Math.random() < 0.5, 'fa-users red': Math.random() > 0.5}"></i><br />
		<ul class="inlineList" style="margin-top: 5px">
			<li v-for="i in selectedIds">
				<span class="label"><i class="fa fa-check"></i> {{$t('product.' + products[i])}}</span>
			</li>
		</ul>
	</div>
</template>

<script>
	import {mapState} from 'vuex';

	export default {
		name: 'SearchResult',
		props: {
			result: {
				type: Object,
				required: true
			}
		},
		computed: {
			...mapState('search', { selectedIds: 'selected' }),
			...mapState('product', {products: 'entries'}),
		},
		methods: {
			openMarket(event) {
				if (!event.target.classList.contains('result-favorite')) {
					this.$router.push({ name: 'market', params: { id: this.result.id } });
				}
			},
			star(id) {
				this.$store.dispatch('search/star', id);
			}
		}
	};
</script>