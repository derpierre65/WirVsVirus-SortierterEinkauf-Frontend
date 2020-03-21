<template>
	<div @click="toggleSelect" style="border:1px solid black; width: 200px;" :class="{selected}">
		{{product}}
	</div>
</template>

<script>
	export default {
		name: 'ProductItem',
		data() {
			return {
				selected: false
			};
		},
		props: {
			value: {
				type: Boolean
			},
			product: {
				required: true,
				type: Object
			}
		},
		methods: {
			toggleSelect() {
				this.selected = !this.selected;
				this.$emit('input', this.selected);
			}
		}
	};
</script>

<style>
	.selected {
		background: orange;
	}
</style>