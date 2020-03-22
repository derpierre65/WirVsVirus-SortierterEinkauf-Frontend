<template>
	<div>
		<div id="market-info-box" class="row">
			<div class="col-md-6">
				<div class="market-info">
					<h1>{{$t('market.information')}} <strong>{{market.name}}</strong></h1>
					{{$t('market.address')}}: {{market.address}}<br>
				</div>
				<div class="market-detail">
					{{$t('market.userFeedback')}}: <span style="color: red">{{market.userFeedback}}</span><br>
					{{$t('market.amountOfPeople')}}: {{market.amountOfPeople > 0 ? market.amountOfPeople : $t('statisticFeedback.noData')}}<br>
					{{$t('market.averagePresenceTime')}}: {{market.averagePresenceTime > 0 ? market.averagePresenceTime : $t('statisticFeedback.noData')}}<br>
					{{$t('market.recorded_at')}}: {{market.recorded_at|date}}<br>
				</div>
			</div>

			<div class="col-md-6 feedback-popularity">
				<h1>{{$t('market.popularityRequest')}}</h1>

				<ul class="choice">
					<li><label><input name="population" type="radio"> {{$t('userFeedback.empty')}}</label></li>
					<li><label><input name="population" type="radio"> {{$t('userFeedback.low')}}</label></li>
					<li><label><input name="population" type="radio"> {{$t('userFeedback.high')}}</label></li>
				</ul>

				<div id="market-feedback" class="button-box">
					<button class="button" @click="submitStoreFeedback()">{{$t('button.submit')}}</button>
				</div>
			</div>
		</div>

		<div class="row">
			<div class="col-xs-12 col-sm-6 col-md-4" v-for="(name, id) in products">
				<product-item class="pointer" :name="name" :key="id" @click.native="productFeedback(id)" />
			</div>
		</div>

		<modal v-if="modalFeedback" v-model="modalFeedback" :buttons="modalButtons" :title="'product.'+products[productFeedbackId]">
			<ul>
                <li>
	                <label><input name="quantityCheck" type="radio" value="0" v-model.number="quantityCheck">
                    {{$t('userFeedback.quantityEmpty')}}</label>
                </li>
				<li>
					<label><input name="quantityCheck" type="radio" value="1" v-model.number="quantityCheck">
                    {{$t('userFeedback.quantityLow')}}</label>
				</li>
				<li>
					<label><input name="quantityCheck" type="radio" value="2" v-model.number="quantityCheck">
                    {{$t('userFeedback.quantityHigh')}}</label>
				</li>
			</ul>
		</modal>
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
					name: 'Beispiel Store',
					address: 'Beispiel-Straße 42, 1337 Fantasiestadt',
					types: 'supermarkt',
					ltdtude: '3',
					lngtude: '3',
					recorded_at: '2020-03-22 13:37:37',
					userFeedback: 'Hoch',
					amountOfPeople: 42,
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
			productFeedback(id) {
				this.productFeedbackId = id;
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

