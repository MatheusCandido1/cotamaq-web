<template>
<div>
<div class="my-6 px-4 py-3 mb-8 bg-white rounded-lg shadow-md dark:bg-gray-800" >
        <bar-loader class="mt-3" :color="loader.color" :loading="loader.loading" :size="150"></bar-loader>
        <span class="flex justify-center items-center text-gray-700" v-if="products && products.length === 0" > {{ loader.loading ? 'Carregando...':'Nenhuma cotação encontrada, recarregue a página' }}</span>
    <div v-if="!loader.loading" class="flex -mx-3 justify-between">
        <div class="px-3 mb-5">
            <h2 class="text-2xl font-semibold text-gray-700 dark:text-gray-200">Cotação - {{estimate.equipment}}<span @click="showEstimateModal" class="inline-flex items-center justify-center px-2 py-1 text-sm font-bold leading-none text-white bg-primary-main rounded ml-2 cursor-pointer">Exibir detalhes do equipamento</span></h2>
        </div>
            <div class="h-10 flex items-center justify-center bg-red-500 text-white font-semibold rounded hover:bg-primary-darker hover:text-white shadow-md py-2 px-6 inline-flex items-center pointer-events-none	">
                <span class="justify-center"><i class="mdi mdi-alert-circle text-lg text-white mr-2"></i>Cotação recusada por você</span>
            </div> 
        <div class="px-3 mb-5">
            <div class="md:flex md:items-center mb-6">
                <div class="md:w-full mr-5">
                <label class="text-sm font-semibold text-gray-600 px-1">
                    Entregar para CEP
                </label>
                </div>
                <div class="md:w-1/2">
                <div class="flex">
                    
                        <div class="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center"></div>
                        <the-mask v-if="estimate.address.zipcode" :mask="['##.###-###']" class="w-28 -ml-12 pl-2 pr-3 py-2 rounded-l border-b-2 border-primary-main shadow-md py-2 px-6 outline-none  focus:border-primary-lighter" disabled type="text" v-model="estimate.address.zipcode"></the-mask>
                        <button class="bg-primary-main font-semibold text-white border-gray-400 w-10 flex rounded-r focus:outline-none cursor-pointer">
                            <span class="m-auto"><i class="mdi mdi-content-copy"></i></span>
                        </button>
                    </div> 
                </div>
                
            </div>
        </div>
    </div>

    <v-table
        class="w-full whitespace-no-wrap mb-2" 
        :data="products"     
        :hideSortIcons="true"
        :currentPage.sync="currentPage"
        :pageSize="5"
        @totalPagesChanged="totalPages = $event"
    >
        <thead class="rounded border-b-2 border-primary-main shadow-md py-2 px-6 outline-none no-selection" slot="head">
            <tr class="text-xs h-10 font-semibold tracking-wide text-left text-gray-500 uppercase border-b dark:border-gray-700 bg-gray-50 dark:text-gray-400 dark:bg-gray-800">
                <v-th  class="text-center" style="width: 20%" sortKey="part_code">Código</v-th>
                <v-th  class="text-center" style="width: 20%" sortKey="description">Descrição</v-th>
                <v-th  class="text-center" style="width: 10%" sortKey="quantity">Quantidade</v-th>
                <v-th  class="text-center" style="width: 20%" sortKey="allow_similar">Aceita Similar?</v-th>
                <th class="text-center" style="width: 20%" >Ações</th>
            </tr>
        </thead>
 
                    
        <tbody  class="bg-white dark:divide-gray-700 dark:bg-gray-800" slot="body" slot-scope="{displayData}">
            <tr  v-for="row in displayData" :key="row.id">
                <td class="text-sm text-center text-gray-700">{{row.part_code != '' ? row.part_code:'Sem código'}}</td>
                <td class="text-sm text-center text-gray-700">{{row.description}}</td>
                <td class="text-sm text-center text-gray-700">{{row.quantity}}</td>
                <td class="text-sm text-center text-gray-700">
                    <span :class="formatDefaultSimilar(row.allow_similar)" class="text-sm px-2 py-1 font-semibold text-white rounded-full dark:text-white">
                        {{formatNameSimilar(row.allow_similar)}}
                    </span>
                </td>
                <td class="flex justify-center mt-2">
                    <div class="flex items-center space-x-2 text-sm">
                        <button v-tooltip="{content: 'Visualizar Produto'}" @click="showProductModal(row)" class="flex items-center justify-between px-2 py-2 bg-primary-lighter text-sm font-medium leading-5 text-white rounded-lg dark:text-gray-400 focus:outline-none focus:shadow-outline-gray" aria-label="Edit">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 21h7a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v11m0 5l4.879-4.879m0 0a3 3 0 104.243-4.242 3 3 0 00-4.243 4.242z" /> </svg>
                        </button>
                    </div>  
                </td>
            </tr>
        </tbody>
    </v-table>

    <div class="grid px-4 py-3 text-xs font-semibold tracking-wide text-gray-500 uppercase border-t dark:border-gray-700 bg-gray-50 sm:grid-cols-9 dark:text-gray-400 dark:bg-gray-800">
            <span class="flex items-center col-span-3">
                Total: {{products.length}} registro(s)
            </span>
            <span class="col-span-2"></span>
            <span class="flex col-span-4 mt-2 sm:mt-auto sm:justify-end">
            <smart-pagination
                :currentPage.sync="currentPage"
                :totalPages="totalPages"
            />
                </span>
            </div>
</div>
        <product-detail
            v-if="isProductModalOpen"
            :product="product"
            @close="closeProductModal"
        ></product-detail>

        
         <estimate-details-modal
            v-if="isEstimateModalOpen"
            :estimate="estimate"
            @close="closeEstimateModal"
        >
        </estimate-details-modal>
</div>

</template>
<script>
import { productService } from '../../../services';
import ProductDetail from '../../../components/Seller/Products/ProductDetail';
import { bus } from '../../../main';
import {TheMask} from 'vue-the-mask';
import { BarLoader } from '@saeris/vue-spinners';
import EstimateDetailsModal from './EstimateDetailsModal';


export default {
    name: 'EstimateRejected',
    components: {
        ProductDetail,
        TheMask,
        BarLoader,
        EstimateDetailsModal
    },
    created() {
        this.getProducts()
    },
    data() {
        return {
            isEstimateModalOpen: false,
            isProductModalOpen: false,
            products:[],
            product:{},
            estimate: {
                equipment: '',
                model: '',
                address: {
                    zipcode: ''
                },
                proposals_by_seller: {
                    status: 0
                }
            },
            loader: {
                loading: false,
                color: '#0bc95b',
            },
            currentPage: 1,
            totalPages: 5,
            colors: ["bg-red-500", "bg-primary-main"],
            defaults: ['Não', 'Sim'],
        }

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
        showProductModal(data) {
            this.product = data
            this.isProductModalOpen = true
            bus.$emit('ModalOpen', true);
        },
        closeProductModal() {
            this.product = null,
            this.isProductModalOpen = false
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
        getProducts() {
            const estimate_id = this.$route.params.id
            this.loader.loading = true
            productService.getProductsByEstimate(estimate_id).then((response) => {
                this.loader.loading = false
                this.products = response.data.data.products
                this.estimate = response.data.data.estimate
            }).catch((error) => {
                console.log(error.response.data)
            }) 
        },
    }
}
</script>
