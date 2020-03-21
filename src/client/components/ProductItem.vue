<template>
	<div @click="toggleSelect" style="border:1px solid black;" :class="{selected}">
		product
	</div>
</template>

<script>
	export default {
		name: 'ProductItem',
		data() {
			return {
				selected: false,
			}
		},
		methods: {
			toggleSelect() {
				this.selected = !this.selected;
				console.log('lol');
			}
		}
	};
</script>

<style>
	.selected {
		background: orange;
	}
</style>