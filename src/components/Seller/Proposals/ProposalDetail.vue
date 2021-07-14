<template>
<div>
<div class="my-6 px-4 py-3 mb-8 bg-white rounded-lg shadow-md dark:bg-gray-800" >
    
    <bar-loader class="mt-3" :color="loader.color" :loading="loader.loading" :size="150"></bar-loader>
        <span class="flex justify-center items-center text-gray-700" v-if="products && products.length === 0" > {{ loader.loading ? 'Carregando...':'Nenhuma cotação encontrada, recarregue a página' }}</span>
    <div v-if="!loader.loading" class="flex -mx-3 justify-between">
        <div class="px-3 mb-5">
            <h2 class="text-2xl font-semibold text-gray-700 dark:text-gray-200">Cotação #{{estimate.id}} </h2>
        </div>
        
            <div v-if="details.status == 7" class="mx-3 h-10 flex items-center justify-center bg-red-500 text-white font-semibold rounded hover:bg-primary-darker hover:text-white shadow-md py-2 px-6 inline-flex items-center pointer-events-none	">
                <span class="justify-center"><i class="mdi mdi-alert-circle text-lg text-white mr-2"></i>Cotação recusada pelo comprador</span>
            </div> 
    </div>

    <v-table
        v-if="!loader.loading" 
        class="w-full whitespace-no-wrap mb-2 " 
        :data="products"     
        :hideSortIcons="true"
    >
        <thead class="rounded border-b-2 border-primary-main shadow-md py-2 px-6 outline-none no-selection" slot="head">
            <tr class="text-xs h-10 font-semibold tracking-wide text-left text-gray-500 uppercase border-b dark:border-gray-700 bg-gray-50 dark:text-gray-400 dark:bg-gray-800">
                <v-th  class="text-center" style="width: 10%" sortKey="value">Status</v-th>
                <v-th  class="text-center" style="width: 10%" sortKey="part_code">Código</v-th>
                <v-th  class="text-center" style="width: 20%" sortKey="description">Descrição</v-th>
                <v-th  class="text-center" style="width: 10%" sortKey="quantity">Quantidade</v-th>
                <v-th  class="text-center" style="width: 20%" sortKey="allow_similar">Aceita Similar?</v-th>
                <v-th  class="text-center" style="width: 10%" sortKey="value">Valor</v-th>
                <v-th  class="text-center" style="width: 10%" sortKey="subtotal">Subtotal</v-th>
                <th class="text-center" style="width: 20%" >Ações</th>
            </tr>
        </thead>
 
                    
        <tbody  class="bg-white dark:divide-gray-700 dark:bg-gray-800" slot="body" slot-scope="{displayData}">
            <tr  v-for="row in displayData" :key="row.id">
                <td class="text-sm text-center text-gray-700"> 
                    <span :class="formatDefaultStatus(row.value)" class="text-sm px-2 py-1 font-semibold text-white rounded-full dark:text-white">
                            {{formatNameStatus(row.value)}}
                    </span>
                </td>
                <td class="text-sm text-center text-gray-700">{{row.part_code != '' ? row.part_code:'Sem código'}}</td>
                <td class="text-sm text-center text-gray-700">{{row.description}}</td>
                <td class="text-sm text-center text-gray-700">{{row.quantity}}</td>
                <td class="text-sm text-center text-gray-700">
                    <span :class="formatDefaultSimilar(row.allow_similar)" class="text-sm px-2 py-1 font-semibold text-white rounded-full dark:text-white">
                        {{formatNameSimilar(row.allow_similar)}}
                    </span>
                </td>
                <td v-if="row.value === null || row.value === 0" class="text-sm text-center text-gray-700">R$ 0,00</td>
                <td v-else class="text-sm text-center text-gray-700">{{row.value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}}</td>

 <td v-if="row.subtotal === null || row.subtotal === 0" class="text-sm text-center text-gray-700">R$ 0,00</td>
                <td v-else class="text-sm text-center text-gray-700">{{row.subtotal.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}}</td>
                <td class="flex justify-center mt-2">
                    <div class="flex items-center space-x-2 text-sm">
                        <button v-tooltip="{content: 'Visualizar Produto'}"  @click="showProductModal(row)" class="flex items-center justify-between px-2 py-2 bg-primary-lighter text-sm font-medium leading-5 text-white rounded-lg dark:text-gray-400 focus:outline-none focus:shadow-outline-gray" aria-label="Edit">
                            <svg  xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 21h7a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v11m0 5l4.879-4.879m0 0a3 3 0 104.243-4.242 3 3 0 00-4.243 4.242z" /> </svg>
                        </button>
                    </div>  
                </td>
            </tr>
        </tbody>
    </v-table>
</div>

    <div class="my-6 px-4 py-3 mb-8 bg-white rounded-lg shadow-md dark:bg-gray-800" >
    <div class="flex -mx-3 justify-between">
        <div class="px-3 mb-5">
            <h3 class="text-2xl font-semibold text-gray-700 dark:text-gray-200">Detalhes do faturamento</h3>
        </div>
    </div>

    <div class="relative p-6 flex-auto">
            <div class="flex -mx-3">
                <div class="w-1/3 px-3 mb-5">
                    <label for="" class="text-sm  flex justify-center font-semibold text-gray-600 px-1">Formas de pagamento</label>
                    <div class="flex">
                    <div class="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center"></div>
                    <span v-for="paymentMethod in paymentMethods" :key="paymentMethod.id" class="inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white bg-primary-main rounded mr-2 mt-2">{{paymentMethod.description}}</span>                       
                    </div>                          
                </div>

                <div class="w-1/3 px-3 mb-5">
                    <label for="" class="text-sm flex justify-center font-semibold text-gray-600 px-1">Condições de pagamento</label>
                    <div class="flex">
                    <div class="w-10 z-10 pl-1  text-center pointer-events-none flex items-center justify-center"></div>
                        <span v-for="paymentCondition in paymentConditions" :key="paymentCondition.id" class="inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white bg-primary-main rounded mr-2 mt-2">{{paymentCondition.description}}</span>                       
                    </div>                        
                </div>

                <div class="w-1/3 px-3 mb-5">
                    <label for="" class="text-sm font-semibold text-gray-600 px-1">Data de validade</label>
                    <div class="flex">
                    <div class="w-full flex items-center justify-center rounded border-b-2 border-primary-main shadow-md py-2 px-6 outline-none  shadow-md py-2 px-6 inline-flex items-center">
                            <span class="justify-center">{{details.validity | formatDate}}</span>
                    </div>  
                    </div>                       
                </div>
            </div>
            <div class="flex -mx-3">
                <div class="w-1/3 px-3 mb-5">
                    <div class="flex">
                    <div class="w-full flex items-center justify-center bg-blue-500 text-white font-semibold rounded shadow-md py-2 px-6 inline-flex items-center">
                            <span class="justify-center">Subtotal: {{details.subtotal.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}}</span>
                        </div> 
                    </div>  
                </div>

                <div class="w-1/3 px-3 mb-5">
                    <div class="flex">
                    <div class="w-full flex items-center justify-center bg-blue-500 text-white font-semibold rounded shadow-md py-2 px-6 inline-flex items-center">
                            <span class="justify-center">Frete: {{details.shipping.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}}</span>
                        </div> 
                    </div> 
                </div>
                <div class="w-1/3 px-3 mb-5">
                    <div class="flex">
                    <div class="w-full flex items-center justify-center bg-primary-main text-white font-semibold rounded  shadow-md py-2 px-6 inline-flex items-center">
                            <span class="justify-center">Total: {{details.total.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}}</span>
                            
                        </div> 
                    </div>  
                </div>
            </div>
          </div>
        </div>

        <product-detail
            v-if="isProductModalOpen"
            :product="product"
            @close="closeProductModal"> 
        </product-detail>
</div>

</template>
<script>
import { bus } from '../../../main';
import ProductDetail from '../Products/ProductDetail';
import { proposalService } from '../../../services';
import { BarLoader } from '@saeris/vue-spinners';

export default {
    name: 'ProposalInfo',
    components: {
        ProductDetail,
        BarLoader
    },
    created() {
        this.getProposalDetail()
    },
    data() {
        return {
            isProductModalOpen: false,
            buyer: {},
            address: {},
            estimate: {
                description: '',
                model: ''
            },
            paymentMethods: [],
            paymentConditions: [],
            products:[],
            product: {
                product_delivery: null
            },
            loader: {
                loading: false,
                color: '#0bc95b',
            },
            delivery_default: 0,
            details: {
                id: 0,
                validity: null,
                paymentCondition: 0,
                paymentMethod: 0,
                shipping: 0,
                subtotal: 0,
                total: 0,
                status: null,
            },
            colors: ["bg-red-500", "bg-primary-main"],
            defaults: ['Não', 'Sim'],
        }

    },
    methods: {
        showProductModal(data) {
            this.product = data
            this.isProductModalOpen = true;
            bus.$emit('ModalOpen', true);
        },
        closeProductModal() {
            this.product = {
                product_delivery: null
            }
            this.isProductModalOpen = false;
            bus.$emit('ModalOpen', false);
        },
        formatDefaultSimilar(id) {
            return this.colors[id]
        },
        formatNameSimilar(id) {
            return this.defaults[id]
        },
        formatDefaultStatus(value) {
            if((value == 0) || (value == null)) {
                return "bg-yellow-600"
            } else {
                return "bg-primary-main"
            }
        },
        formatNameStatus(value) {
            if((value == 0) || (value == null)) {
                return 'Pendente'
            } else {
                return 'Cotado'
            }
        },
        getProposalDetail() {
            this.loader.loading = true;
            const proposalId = this.$route.params.id
            proposalService.getProposalDetails(proposalId).then((response) => {
                const res = response.data.data
                this.details = res.proposal
                this.products = res.proposal.products
                this.estimate = res.proposal.estimate
                this.paymentConditions = res.paymentConditions
                this.paymentMethods = res.paymentMethods
                this.loader.loading = false
            }).catch((error) => {
                console.log(error)
            }) 
        },
    }
}
</script>
