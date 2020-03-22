<template>
	<div class="product-item">
		<img alt="Image" />
		{{product.product_name}}
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
		}
	};
</script>