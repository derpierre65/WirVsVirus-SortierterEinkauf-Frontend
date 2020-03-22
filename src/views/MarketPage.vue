<template>
	<div>
		<div>
			<div class="market-info">
				<h1>{{$t('market.information')}} <strong>{{market.name}}</strong></h1>
				{{$t('market.address')}}: {{market.address}}<br>
			</div>
			<div class="market-detail">
				{{$t('market.userFeedback')}}: {{market.userFeedback}}<br>
				{{$t('market.amountOfPeople')}}: {{market.amountOfPeople > 0 ? market.amountOfPeople : $t('statisticFeedback.noData')}}<br>
				{{$t('market.averagePresenceTime')}}: {{market.averagePresenceTime > 0 ? market.averagePresenceTime : $t('statisticFeedback.noData')}}<br>
				{{$t('market.recorded_at')}}: {{market.recorded_at !== '' ? market.recorded_at : $t('statisticFeedback.noData')}}<br>
			</div>
		</div>

		<product-item v-for="product in products" :product="product" v-model="product.selected" :key="product.id"
		              @click.native="productFeedback(product)" />

		<modal v-if="modalFeedback" v-model="modalFeedback" :buttons="modalButtons" :title="products[productFeedbackId].product_name">
			<ul>
                <li><label><input name="quantityCheck" type="radio" value="0" v-model.number="quantityCheck">
                    {{$t('userFeedback.quantityEmpty')}}</label></li>
				<li><label><input name="quantityCheck" type="radio" value="1" v-model.number="quantityCheck">
                    {{$t('userFeedback.quantityLow')}}</label></li>
				<li><label><input name="quantityCheck" type="radio" value="2" v-model.number="quantityCheck">
                    {{$t('userFeedback.quantityHigh')}}</label></li>
			</ul>
		</modal>

		<div>
			<h1>{{$t('general.popularityRequest')}}</h1>
			<ul>
				<li><label><input name="population" type="radio"> {{$t('userFeedback.empty')}}</label></li>
				<li><label><input name="population" type="radio"> {{$t('userFeedback.low')}}</label></li>
				<li><label><input name="population" type="radio"> {{$t('userFeedback.high')}}</label></li>
			</ul>
			<button @click="submitStoreFeedback()">{{$t('button.submit')}}</button>
		</div>
	</div>
</template>

<script>
	import ProductItem from '../components/ProductItem';
	import Modal, {defaultModalCloseButton} from '../components/Modal';
	import {mapState} from 'vuex';
	import product from '../store/modules/product';

	export default {
		name: 'MarketPage',
		components: { Modal, ProductItem },
		data() {
			return {
				quantityCheck: null,
				productFeedbackId: null,
				modalFeedback: false,
				market: {}
			};
		},
		created() {
			this.$store.dispatch('product/fetch');
			Promise.resolve({
				data: {
					market_id: 323343545,
					googleTrack: 'DOLLETRACKID',
					name: 'Aldi Meppen Süd',
					address: 'MEPPEN SÜD',
					types: 'supermarkt',
					ltdtude: '3',
					lngtude: '3',
					recorded_at: '2020-02-02 13:33:37',
					userFeedback: 2,
					amountOfPeople: 44,
					sizeOfMarket: 52,
					averagePresenceTime: null
				}
			}).then((response) => {
				this.market = response.data;
			}).catch();
		},
		computed: {
			...mapState('product', { products: 'entries' }),
			modalButtons() {
				return [
					defaultModalCloseButton,
					{
						title: 'button.submit',
						class: '',
						cmd(modal) {
							Promise.resolve().then((response) => {
								modal.close();
							}).catch();
						}
					}
				];
			}
		},
		methods: {
			productFeedback(product) {
				this.productFeedbackId = product.id;
				this.quantityCheck = null;
				this.modalFeedback = true;
			},
			submitStoreFeedback() {
				//send feedback
				Promise.resolve().then((response) => {
					// user feedback
				}).catch();
			}
		}
	};
</script>

