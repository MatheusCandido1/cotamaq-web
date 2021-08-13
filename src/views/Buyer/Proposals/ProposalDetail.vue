<template>
<div>
<div class="my-6 px-4 py-3 mb-8 bg-white rounded-lg shadow-md dark:bg-gray-800" >
    <div class="flex -mx-3 justify-between">
        <div class="px-3 mb-5">
            <h2 class="text-2xl font-semibold text-gray-700 dark:text-gray-200">Cotação #{{estimate.id}}<span @click="showEstimateModal" class="inline-flex items-center justify-center px-2 py-1 text-sm font-bold leading-none text-white bg-primary-main rounded ml-2 cursor-pointer">Exibir detalhes do equipamento</span></h2>
        </div>
    </div>
</div>

<div class="my-6 px-4 py-3 mb-8 bg-white rounded-lg shadow-md dark:bg-gray-800" >
    <div class="flex -mx-3 justify-between">
        <div class="px-3 mb-5">
            <h2 class="text-2xl font-semibold text-gray-700 dark:text-gray-200">Proposta #{{proposal.id}}</h2>
        </div>
    </div>
    
        

    <v-table
        class="w-full whitespace-no-wrap mb-2 " 
        :data="products"     
        :hideSortIcons="true"
    >
        <thead class="rounded border-b-2 border-primary-main shadow-md py-2 px-6 outline-none no-selection" slot="head">
            <tr class="text-xs h-10 font-semibold tracking-wide text-left text-gray-500 uppercase border-b dark:border-gray-700 bg-gray-50 dark:text-gray-400 dark:bg-gray-800">
                <v-th  class="text-center" style="width: 10%" sortKey="part_code">Código</v-th>
                <v-th  class="text-center" style="width: 10%" sortKey="description">Descrição</v-th>
                <v-th  class="text-center" style="width: 10%" sortKey="quantity">Quantidade</v-th>
                <v-th  class="text-center" style="width: 10%" sortKey="is_similar">Peça Similar?</v-th>
                <v-th  class="text-center" style="width: 10%" sortKey="value">Valor</v-th>
                <v-th  class="text-center" style="width: 10%" sortKey="value">Subtotal</v-th>
                <v-th  class="text-center" style="width: 10%" sortKey="product_delivery">Prazo de Entrega</v-th>
                <th class="text-center" style="width: 10%" >Ação</th>
            </tr>
        </thead>    
        <tbody  class="bg-white dark:divide-gray-700 dark:bg-gray-800" slot="body" slot-scope="{displayData}">
            <tr class="mb-5"  v-for="row in displayData" :key="row.id">
                <td class="text-sm text-center text-gray-700">{{row.part_code != '' ? row.part_code:'Sem código'}}</td>
                <td class="text-sm text-center text-gray-700">{{row.description}}</td>
                <td class="text-sm text-center text-gray-700">{{row.quantity}}</td>
                <td class="text-sm text-center text-gray-700">
                    <span :class="formatDefault(row.is_similar == null ? '0':'1')" class="text-sm px-2 py-1 font-semibold text-white rounded-full dark:text-white">
                        {{formatName(row.is_similar == null ? '0':'1')}}
                    </span>
                </td>             
                <td class="text-sm text-center text-gray-700">{{row.details.value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}}</td>
                <td class="text-sm text-center text-gray-700">{{row.details.subtotal.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}}</td>
                <td class="text-sm text-center text-gray-700">{{row.details.product_delivery == 0 ? 'Imediato':row.details.product_delivery + ' dia(s)'}}</td>
                <td class="flex justify-center mt-2">
                    <div class="flex items-center space-x-2 text-sm">
                        <button v-tooltip="{content: 'Visualizar Produto'}" @click="showProductModal(row)" class="flex items-center justify-between px-2 py-2 mb-1 bg-primary-lighter text-sm font-medium leading-5 text-white rounded-lg dark:text-gray-400 focus:outline-none focus:shadow-outline-gray" aria-label="Edit">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 21h7a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v11m0 5l4.879-4.879m0 0a3 3 0 104.243-4.242 3 3 0 00-4.243 4.242z" /> </svg>
                        </button>
                    </div>  
                </td>
            </tr>
            <tr  v-if="products && products.length !== 0"  class="rounded border-t-2 border-primary-main shadow-md py-2 px-6 outline-none h-12">
                <td class="text-sm font-semibold text-center text-gray-900">Total:</td>
                <td></td>
                <td class="text-sm font-semibold text-center text-gray-900">{{getQuantitySum()}}</td>
                <td></td>
                <td></td>
                <td class="text-sm font-semibold text-center text-gray-900">R$ {{proposal.subtotal.toFixed(2)}}</td>
                <td></td>
                <td></td>
            </tr>
        </tbody>
    </v-table>
</div>

<div class="my-6 px-4 py-3 mb-8 bg-white rounded-lg shadow-md dark:bg-gray-800" >
    <div class="flex -mx-3 justify-between">
        <div class="px-3 mb-5">
            <h3 class="text-2xl font-semibold text-gray-700 dark:text-gray-200">Detalhes do faturamento</h3>
        </div>
        <div v-if="estimate.delivery == 3" class="flex justify-start space-x-4 mt-3 px-4">
                    <div>
                        <input  @change="() => (errors.delivery = 'OK')" v-model="proposal.estimate_delivery" value="1" class="hidden" id="delivery_1" type="radio" name="delivery">
                        <label class="flex h-9 p-1 border-2 border-gray-400 cursor-pointer rounded-md justify-items-center align-items-center"  for="delivery_1">
                            <span class="whitespace-nowrap flex items-center justify-center text-gray-900 text-sm font-semibold mr-1"><i class="mdi mdi-truck-fast-outline text-gray-900 text-lg mr-1 ml-1"></i>Envio </span>
                        </label>
                    </div>
                    <div>
                        <input @change="() => (errors.delivery = 'OK')"   v-model="proposal.estimate_delivery" value="2" class="hidden" id="delivery_2" type="radio" name="delivery">
                        <label class="flex h-9 p-2 border-2 border-gray-400 cursor-pointer rounded-md justify-items-center align-items-center"  for="delivery_2">
                            <span  class="whitespace-nowrap flex items-center justify-center text-gray-900  text-sm font-semibold mr-1"><i class="mdi mdi-package-variant-closed text-gray-900 text-lg mr-1 ml-1"></i>Retirada </span>
                        </label>
                    </div>
                     <div v-if="errors.delivery == 'ERROR'">
                        <span class="text-xs text-red-400 font-semibold px-1">Escolha uma forma de entrega.</span>
                    </div>  
                </div>

                <div v-if="estimate.delivery == 1" class="flex justify-start space-x-4 mt-3 px-4">
                    <div>
                        <input disabled v-model="estimate.delivery" value="1" class="hidden" id="delivery_3" type="radio" name="delivery">
                        <label class="flex h-9 p-1 border-2 border-gray-400 cursor-pointer rounded-md justify-items-center align-items-center"  for="delivery_3">
                            <span class="whitespace-nowrap flex items-center justify-center text-gray-900 text-sm font-semibold mr-1"><i class="mdi mdi-truck-fast-outline text-gray-900 text-lg mr-1 ml-1"></i>Envio </span>
                        </label>
                    </div>
                </div>

                <div v-if="estimate.delivery == 2" class="flex justify-start space-x-4 mt-3 px-4">
                    <div>
                        <input disabled v-model="estimate.delivery" value="2" class="hidden" id="delivery_6" type="radio" name="delivery">
                        <label class="flex h-9 p-2 border-2 border-gray-400 cursor-pointer rounded-md justify-items-center align-items-center"  for="delivery_6">
                            <span  class="whitespace-nowrap flex items-center justify-center text-gray-900  text-sm font-semibold mr-1"><i class="mdi mdi-package-variant-closed text-gray-900 text-lg mr-1 ml-1"></i>Retirada </span>
                        </label>
                    </div>
                </div>
    </div>

    <div class="relative p-6 flex-auto">
            <div class="flex -mx-3">
                <div class="w-1/4 px-3 mb-5">
                    <label for="" class="text-sm font-semibold text-gray-600 px-1">Data de validade da proposta</label>
                    <div class="flex">
                    <div class="w-full rounded border-b-2 border-primary-main flex items-center justify-center bg-white text-gray-800 font-semibold rounded   shadow-md py-2 px-6 inline-flex items-center">
                            <span class="justify-center">{{proposal.validity | formatDate}}</span>
                        </div> 
                    </div>                         
                </div>

                <div class="w-1/4 px-3 mb-5">
                    <label for="" class="text-sm font-semibold text-gray-600 px-1">Subtotal</label>
                    <div class="flex">
                    <div class="w-full rounded border-b-2 border-primary-main flex items-center justify-center bg-white text-gray-800 font-semibold rounded   shadow-md py-2 px-6 inline-flex items-center">
                            <span class="justify-center">{{proposal.subtotal.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}}</span>
                        </div> 
                    </div>  
                </div>
                
                <div class="w-1/4 px-3 mb-5">
                    <label for="" class="text-sm font-semibold text-gray-600 px-1">Frete</label>
                    <div class="flex">
                    <div class="w-full rounded border-b-2 border-primary-main flex items-center justify-center bg-white text-gray-800 font-semibold rounded   shadow-md py-2 px-6 inline-flex items-center">
                            <span class="justify-center">{{proposal.shipping.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}}</span>
                        </div> 
                    </div>   
                </div>


                <div class="w-1/4 px-3 mb-5">
                    <label for="" class="text-sm font-semibold text-gray-600 px-1">Total</label>
                    <div class="flex">
                    <div class="w-full rounded border-b-2 border-primary-main flex items-center justify-center bg-white text-gray-800 font-semibold rounded   shadow-md py-2 px-6 inline-flex items-center">
                            <span class="justify-center">{{proposal.total.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}}</span>
                        </div> 
                    </div>  
                </div>
            </div>
                
            
            <div class="flex justify-end -mx-3 -ml-10 pl-2 pr-3 py-2 ">
                        <div class="w-1/8 mb-5">
                        <label for="" class="text-xs font-semibold px-1"></label>
                            <div class="flex">
                            <div class="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center"></div>
                                <button @click="showOrderModal()" class="w-full flex items-center justify-center bg-primary-main text-white font-semibold rounded hover:bg-primary-darker   shadow-md py-2 px-6 inline-flex items-center">
                                    <span class="justify-center">Comprar</span>
                                </button>                         
                            </div>   
                        </div>

                        <div class="w-1/7 mb-5">
                            <label for="" class="text-xs font-semibold px-1"></label>
                            <div class="flex">
                            <div class="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center"></div>
                                <router-link :to="{name: 'detailEstimate', params: {id: estimate.id}}" class="w-full flex items-center justify-center bg-gray-600 text-white font-semibold rounded hover:bg-gray-700   shadow-md py-2 px-6 inline-flex items-center">
                                    <span class="justify-center">Voltar</span>
                                </router-link>                         
                            </div>   
                        </div>
                    </div>
          </div>
          <order-confirm
            v-if="isOrderModalVisible"
            :proposal="proposal"
            @close="closeOrderModal"
          >
          </order-confirm>

        <proposal-product
            v-if="isProductModalVisible"
            :product="product"
            @close="closeProductModal"
          >
        </proposal-product>

        <estimate-details-modal
            v-if="isEstimateModalOpen"
            :estimate="estimate"
            @close="closeEstimateModal"
        >
        </estimate-details-modal>
</div>
</div>

</template>
<script>
import { bus } from '../../../main';
import { productService } from '../../../services';
import OrderConfirm from '../../../components/Buyer/Orders/OrderConfirm';
import ProposalProduct from '../../../components/Buyer/Proposals/ProposalProduct';
import EstimateDetailsModal from '../../../components/Seller/Estimates/EstimateDetailsModal';

export default {
    name: 'ProposalDetail',
    components: {
        OrderConfirm,
        ProposalProduct,
        EstimateDetailsModal
    },
    data() {
        return {
            isEstimateModalOpen: false,
            isProductModalVisible: false,
            isOrderModalVisible: false,
            products:[],
            paymentConditions: [],
            paymentMethods: [],
            product: null,
            estimate: {},
            errors: {
                delivery: null
            },
            proposal: {
                payment_method_id: null,
                payment_condition_id: null,
                validity: null,
                subtotal: 0.00,
                shipping: 0.00,
                total: 0.00,
                estimate_delivery: null
            },
            loader: {
                loading: false,
                color: '#0bc95b',
            },
            colors: ["bg-red-500", "bg-primary-main"],
            defaults: ['Não', 'Sim'],
        }
    },
    mounted() {
        this.getProducts()
    },
    methods: {
        showEstimateModal() {
            this.isEstimateModalOpen = true
            bus.$emit('ModalOpen', true);
        },
        closeEstimateModal() {
            this.isEstimateModalOpen = false
            bus.$emit('ModalOpen', false);
        },
        showOrderModal() {
            if(this.estimate.delivery == 1 || this.estimate.delivery == 2) {
                this.isOrderModalVisible = true
                bus.$emit('ModalOpen', true);
            } else if(this.proposal.estimate_delivery == 1 || this.proposal.estimate_delivery == 2) {
                this.isOrderModalVisible = true
                bus.$emit('ModalOpen', true);
            }
            else {
                this.errors.delivery = 'ERROR'
            }
        },
        closeOrderModal() {
            this.isOrderModalVisible = false
            bus.$emit('ModalOpen', false);
        },
        showProductModal(data) {
            this.product = data
            this.isProductModalVisible = true
            bus.$emit('ModalOpen', true);
        },
        closeProductModal() {
            this.isProductModalVisible = false
            bus.$emit('ModalOpen', false);
        },
        getQuantitySum() {
            const sum = this.products.reduce((a, b) => a + b.quantity, 0)
            return sum;
        },
        formatDefault(id) {
            return this.colors[id]
        },
        formatName(id) {
            return this.defaults[id]
        },
        formatShipping() {
            this.proposal.shipping = this.currencyFormat(this.proposal.shipping)
        },
        currencyFormat(value) {
            return value.toFixed(2)
        },
        getProducts() {
            const proposalId = this.$route.params.id
            this.loader.loading = true
            productService.getProductsByProposal(proposalId).then((response) => {
                this.loader.loading = false
                this.products = response.data.data.products
                this.proposal = response.data.data.proposal
                this.estimate = response.data.data.estimate
            }).catch((error) => {
                console.log(error.response.data)
            }) 
        },
    }
}
</script>

<style>

</style>