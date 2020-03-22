<template>
	<div class="product-item">
		<i class="fa fa-paper-plane-o" style="float: right; padding-right: 10px" aria-hidden="true"></i> <span>{{$t('product.' + name)}}</span>
	</div>
</template>

<script>
	export default {
		name: 'ProductItem',
		props: {
			name: {
				required: true,
				type: Object
			}
		}
	};
</script>