<template>
	<div style="border:1px solid black;">
		{{product}}
	</div>
</template>

<script>
	export default {
		name: 'ProductItem',
		props: {
			product: {
				required: true,
				type: Object
			}
		},
	};
</script>