<template>
<div>
  <div class="my-6 px-4 py-3 mb-8 bg-white rounded-lg shadow-md dark:bg-gray-800" >
        <div class="flex -mx-3">
            <div class="w-3/5 px-3 mb-5">
                <h2 class="text-2xl font-semibold text-gray-700 dark:text-gray-200"> Pedido #{{order.id}}</h2>
                <bar-loader class="mt-3" :color="loader.color" :loading="loader.loading" :size="150"></bar-loader>
            </div>
            <div class="w-1/5 px-3 mb-5">
                 <div class="flex">
                    <div :class="formatStatusDefault(order.status)" class="w-full flex items-center justify-center text-white font-semibold rounded shadow-md py-2 px-6 inline-flex items-center">
                            <span class="justify-center"><i :class="formatStatusIcon(order.status)" class="text-white text-lg mr-3"></i>{{formatStatusName(order.status)}}</span>
                        </div> 
                    </div>  
            </div>
            <div class="w-1/5 px-3 mb-5">
                 <div class="flex">
                    <a target="_blank" :href="'https://api.cotamaq.com.br/api/v1/orders/' + order.id + '/pdf'"  @click="generateReport()" class="w-full flex items-center justify-center bg-gray-600 hover:bg-gray-700 text-white font-semibold rounded shadow-md py-2 px-6 inline-flex items-center">
                            <span class="justify-center"><i class="mdi mdi-printer text-white text-lg mr-3"></i>Imprimir</span>
                        </a>
                    </div>  
            </div>
        </div>

        <div v-if="seller.name"   class="flex -mx-3">
            <div class="w-1/3 px-3 mb-5">
                <label for="" class="text-sm font-semibold text-gray-600 px-1">Fornecedor</label>
                <div class="flex">
                    <div class="w-full rounded border-b-2 border-primary-main flex items-center justify-center bg-white text-gray-800 font-semibold rounded   shadow-md py-2 px-6 inline-flex items-center">
                            <span class="justify-center">{{seller.name}}</span>
                        </div> 
                    </div>                      
            </div>

            <div v-if="seller.company.cnpj"  class="w-1/3 px-3 mb-5">
                <label for="" class="text-sm font-semibold text-gray-600 px-1">CNPJ</label>
                <div class="flex">
                    <div class="w-full rounded border-b-2 border-primary-main flex items-center justify-center bg-white text-gray-800 font-semibold rounded   shadow-md py-2 px-6 inline-flex items-center">
                            <span class="justify-center">{{seller.company.cnpj | Document}}</span>
                        </div> 
                    </div>                        
            </div>

            <div v-if="seller.address.zipcode" class="w-1/3 px-3 mb-5">
                <label for="" class="text-sm font-semibold text-gray-600 px-1">CEP</label>
                <div class="flex">
                    <div class="w-full rounded border-b-2 border-primary-main flex items-center justify-center bg-white text-gray-800 font-semibold rounded   shadow-md py-2 px-6 inline-flex items-center">
                        <span class="justify-center">{{seller.address.zipcode}}</span>
                    </div> 
                </div>                     
            </div>
        </div>

          <div v-if="seller.address.address" class="flex -mx-3">
            <div class="w-3/6 px-3 mb-5">
                <label for="" class="text-sm font-semibold text-gray-600 px-1">Endereço</label>
                <div class="flex">
                    <div class="w-full rounded border-b-2 border-primary-main flex items-center justify-center bg-white text-gray-800 font-semibold rounded   shadow-md py-2 px-6 inline-flex items-center">
                        <span class="justify-center">{{seller.address.address}}</span>
                    </div> 
                </div>                      
            </div>

            <div v-if="seller.address.neighborhood" class="w-1/6 px-3 mb-5">
                <label for="" class="text-sm font-semibold text-gray-600 px-1">Bairro</label>
                <div class="flex">
                    <div class="w-full rounded border-b-2 border-primary-main flex items-center justify-center bg-white text-gray-800 font-semibold rounded   shadow-md py-2 px-6 inline-flex items-center">
                        <span class="justify-center">{{seller.address.neighborhood}}</span>
                    </div> 
                </div>                    
            </div>

            <div v-if="seller.address.city" class="w-1/6 px-3 mb-5">
                <label for="" class="text-sm font-semibold text-gray-600 px-1">Cidade</label>
                <div class="flex">
                    <div class="w-full rounded border-b-2 border-primary-main flex items-center justify-center bg-white text-gray-800 font-semibold rounded   shadow-md py-2 px-6 inline-flex items-center">
                        <span class="justify-center">{{seller.address.city}}</span>
                    </div> 
                </div>                    
            </div>

            <div v-if="seller.address.state" class="w-1/6 px-3 mb-5">
                <label for="" class="text-sm font-semibold text-gray-600 px-1">Estado</label>
                <div class="flex">
                    <div class="w-full rounded border-b-2 border-primary-main flex items-center justify-center bg-white text-gray-800 font-semibold rounded   shadow-md py-2 px-6 inline-flex items-center">
                        <span class="justify-center">{{seller.address.state}}</span>
                    </div> 
                </div>                    
            </div>
        </div>

        <div v-if="seller.email" class="flex -mx-3">
            <div class="w-1/3 px-3 mb-5">
                <label for="" class="text-sm font-semibold text-gray-600 px-1">E-mail</label>
                <div class="flex">
                    <div class="w-full rounded border-b-2 border-primary-main flex items-center justify-center bg-white text-gray-800 font-semibold rounded   shadow-md py-2 px-6 inline-flex items-center">
                        <span class="justify-center">{{seller.email}}</span>
                    </div> 
                </div>                      
            </div>

            <div v-if="seller.company.phone" class="w-1/3 px-3 mb-5">
                <label for="" class="text-sm font-semibold text-gray-600 px-1">Telefone</label>
                <div class="flex">
                    <div class="w-full rounded border-b-2 border-primary-main flex items-center justify-center bg-white text-gray-800 font-semibold rounded   shadow-md py-2 px-6 inline-flex items-center">
                        <span class="justify-center">{{seller.company.phone}}</span>
                    </div> 
                </div>                       
            </div>
        </div>

        <div class="flex -mx-3">
            <div class="w-1/2 px-3 mb-5">
                <label for="" class="text-sm font-semibold text-gray-600 px-1">Método de Pagamento</label>
                <div class="flex">
                    <div class="w-full rounded bg-primary-main flex items-center justify-center bg-white text-gray-800 font-semibold rounded   shadow-md py-2 px-6 inline-flex items-center">
                        <span class="justify-center text-white">{{order.payment_method == '' ? 'Não disponível':order.payment_method}}</span>
                    </div> 
                </div>                      
            </div>

            <div class="w-1/2 px-3 mb-5">
                <label for="" class="text-sm font-semibold text-gray-600 px-1">Condição de Pagamento</label>
                <div class="flex">
                    <div class="w-full rounded bg-primary-main flex items-center justify-center bg-white text-gray-800 font-semibold rounded   shadow-md py-2 px-6 inline-flex items-center">
                        <span class="justify-center text-white">{{order.payment_condition == '' ? 'Não disponível':order.payment_condition}}</span>
                    </div> 
                </div>                      
            </div>
        </div>
  </div>

  <div class="my-6 px-4 py-3 mb-8 bg-white rounded-lg shadow-md dark:bg-gray-800" >
    <div class="flex -mx-3 justify-between">
        <div class="px-3 mb-5">
            <h2 class="text-2xl font-semibold text-gray-700 dark:text-gray-200">Proposta #{{proposal.id}}</h2>
        </div>
        <div class="px-3 mb-5">
            <h2 class="text-2xl font-semibold text-gray-700 dark:text-gray-200">Cotação #{{proposal.estimate.id}} <span @click="showEstimateModal" class="inline-flex items-center justify-center px-2 py-1 text-sm font-bold leading-none text-white bg-primary-main rounded ml-2 cursor-pointer">Exibir detalhes do equipamento</span></h2>
        </div>
        <div class="px-3 mb-5">                
            <div class="flex justify-start space-x-4">
            <div>
                <input disabled class="hidden" id="delivery_1" type="radio" name="delivery">
                <label :class="proposal.estimate.delivery == 1 ? 'border-primary-main  bg-primary-main':'border-gray-400'" class="flex h-9 p-1 border-2  rounded-md justify-items-center align-items-center"  for="delivery_1">
                    <span class="flex items-center justify-center text-gray-900 text-sm font-semibold mr-1"><i class="mdi mdi-truck-fast-outline text-gray-900 text-lg mr-1 ml-1"></i>Envio </span>
                </label>
            </div>
            <div>
                <input disabled class="hidden" id="delivery_2" type="radio" name="delivery">
                <label :class="proposal.estimate.delivery == 2 ? 'border-primary-main  bg-primary-main':'border-gray-400'" class="flex h-9 p-1 border-2  rounded-md justify-items-center align-items-center"  for="delivery_2">
                    <span class="flex items-center justify-center text-gray-900 text-sm font-semibold mr-1"><i class="mdi mdi-truck-fast-outline text-gray-900 text-lg mr-1 ml-1"></i>Retirada </span>
                </label>
            </div>
            </div>
            
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
                <v-th  class="text-center" style="width: 10%" sortKey="allow_similar">Peça Similar?</v-th>
                <v-th  class="text-center" style="width: 10%" sortKey="quantity">Quantidade</v-th>
                <v-th  class="text-center" style="width: 10%" sortKey="details.value">Valor</v-th>
                <v-th  class="text-center" style="width: 10%" sortKey="details.subtotal">Subtotal</v-th>
                <th class="text-center" style="width: 10%" >Ação</th>
            </tr>
        </thead>    
        <tbody  class="bg-white dark:divide-gray-700 dark:bg-gray-800" slot="body" slot-scope="{displayData}">
            <tr class="mb-5"  v-for="row in displayData" :key="row.id">
                <td class="text-sm text-center text-gray-700">{{row.part_code != '' ? row.part_code:'Sem código'}}</td>
                <td class="text-sm text-center text-gray-700">{{row.description}}</td>
                 <td class="text-sm text-center text-gray-700">
                    <span :class="formatDefault(row.allow_similar)" class="text-sm px-2 py-1 font-semibold text-white rounded-full dark:text-white">
                        {{formatName(row.allow_similar)}}
                    </span>
                </td>
                <td class="text-sm text-center text-gray-700">{{row.quantity}}</td>
                <td class="text-sm text-center text-gray-700">{{row.details.value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}}</td>
                <td class="text-sm text-center text-gray-700">{{row.details.subtotal.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}}</td>
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
                <td></td>
                <td class="text-sm font-semibold text-center text-gray-900">{{getQuantitySum()}}</td>
                <td></td>
                <td class="text-sm font-semibold text-center text-gray-900">R$ {{proposal.subtotal.toFixed(2)}}</td>
                <td></td>
            </tr>
        </tbody>
    </v-table>
</div>

  
  <div class="my-6 px-4 py-3 mb-8 bg-white rounded-lg shadow-md dark:bg-gray-800" >
      
            <div class="flex -mx-3">
                <div v-if="proposal.subtotal" class="w-1/3 px-3 mb-5">
                    <div class="flex">
                    <div class="w-full rounded border-b-2 border-blue-500 flex items-center justify-center bg-white text-gray-800 font-semibold rounded   shadow-md py-2 px-6 inline-flex items-center">
                            <span class="justify-center">Subtotal: {{proposal.subtotal.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}}</span>
                        </div> 
                    </div>  
                </div>

                <div v-if="proposal.shipping" class="w-1/3 px-3 mb-5">
                    <div class="flex">
                    <div class="w-full rounded border-b-2 border-blue-500 flex items-center justify-center bg-white text-gray-800 font-semibold rounded   shadow-md py-2 px-6 inline-flex items-center">
                            <span class="justify-center">Frete: {{proposal.shipping.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}}</span>
                    </div> 
                    </div> 
                </div>
                <div v-if="proposal.total" class="w-1/3 px-3 mb-5">
                    <div class="flex">
                    <div class="w-full rounded border-b-2 border-blue-500 flex items-center justify-center bg-white text-gray-800 font-semibold rounded   shadow-md py-2 px-6 inline-flex items-center">
                            <span class="justify-center">Total: {{proposal.total.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}}</span>
                        </div> 
                    </div>  
                </div>
            </div>
        <div class="flex justify-end -mx-3 -ml-10 pl-2 pr-3 py-2 ">
                        <div class="w-1/7 mb-5">
                            <label for="" class="text-xs font-semibold px-1"></label>
                            <div class="flex">
                            <div class="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center"></div>
                                <router-link :to="{name: 'orders'}" class="w-full flex items-center justify-center bg-gray-600 text-white font-semibold rounded hover:bg-gray-700 hover:text-white shadow-md py-2 px-6 inline-flex items-center">
                                    <span class="justify-center">Voltar</span>
                                </router-link>                         
                            </div>   
                        </div>
                    </div>
                    <proposal-product
            v-if="isProductModalVisible"
            :product="product"
            @close="closeProductModal"
          >
          </proposal-product>

        <order-payment
            v-if="isPaymentModalVisible"
            :order="order"
            @close="closePaymentModal"
        >
        </order-payment>

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
import ProposalProduct from '../../Buyer/Proposals/ProposalProduct';
import { orderService } from '../../../services';
import EstimateDetailsModal from '../../../components/Seller/Estimates/EstimateDetailsModal';
import { BarLoader } from '@saeris/vue-spinners';
import OrderPayment from './OrderPayment';

export default {
    name: 'OrderInfo',
    components: {
        ProposalProduct,
        EstimateDetailsModal,
        BarLoader,
        OrderPayment
    },
    created() {
        this.getOrder();
    },
    updated() {
        bus.$off('updatePaymentOnOrder');
        bus.$on('updatePaymentOnOrder', (data) => {
            if(data) {
               this.getOrder(); 
            }
        })
    },
    data() {
        return {
            isEstimateModalOpen: false,
            isProductModalVisible: false,
            isPaymentModalVisible: false,
            estimate: {},
            seller: {
                address: {}
            },
            loader: {
                loading: false,
                color: '#0bc95b',
            },
            proposal: {
                id: null,
                estimate: {
                    id: null,
                }
            },
            products: [],
            order: {
                id: null,
            },
            colors: ["bg-red-500", "bg-primary-main"],
            defaults: ['Não', 'Sim'],
            statusName: ['Pendente','Em preparo','Em trânsito','Entregue'],
            statusColor: ['bg-orange-400','bg-blue-400','bg-indigo-600','bg-primary-main'],
            statusIcon: ['mdi mdi-progress-clock','mdi mdi-package-variant-closed','mdi mdi-truck-fast-outline','mdi mdi-calendar-check-outline']
        }
    },
    methods: {
        showPdf() {
            orderService.showPdf(this.order.id).then((response) => {
                console.log(response)
            }).catch((error) => {
                console.log(error.response.data)
            })
        },
        showEstimateModal() {
            this.isEstimateModalOpen = true
            bus.$emit('ModalOpen', true);
        },
        closeEstimateModal() {
            this.isEstimateModalOpen = false
            bus.$emit('ModalOpen', false);
        },
        showPaymentModal() {
            this.isPaymentModalVisible = true
            bus.$emit('ModalOpen', true);
        },
        closePaymentModal() {
            this.isPaymentModalVisible = false
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
        getOrder() {
            this.loader.loading = true
            const orderId = this.$route.params.id
            orderService.getOrderByBuyer(orderId).then((response) => {
                const res = response.data.data
                this.seller = res.seller
                this.seller.address = res.order.proposal.estimate.address
                this.estimate = res.order.proposal.estimate
                this.order = res.order
                this.proposal = res.order.proposal
                this.products = res.order.proposal.products
                this.loader.loading = false
                if(this.order.status == 2) {
                    this.showPaymentModal()
                }
            }).catch((error) => {
               this.loader.loading = false
                console.log(error.response.data)
            })
        },
        getQuantitySum() {
            const sum = this.products.reduce((a, b) => a + b.quantity, 0)
            return sum;
        },
        formatStatusDefault(id) {
            return this.statusColor[id-1]
        },
        formatStatusName(id) {
            return this.statusName[id-1]
        },
        formatStatusIcon(id) {
            return this.statusIcon[id-1]
        },
        formatDefault(id) {
            return this.colors[id]
        },
        formatName(id) {
            return this.defaults[id]
        },
        
    },
    
}
</script>

<style>

</style>