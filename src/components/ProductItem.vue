<template>
	<div class="product-item">
		<!--TODO: INSERT CORRECT IMAGE-->
		<!--<img alt="Image" />-->
		<i class="fa fa-paper-plane-o" aria-hidden="true"></i>{{product.product_name}}
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