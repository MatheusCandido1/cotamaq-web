<template>

    <div class="my-6 px-4 py-3 mb-8 bg-white rounded-lg shadow-md dark:bg-gray-800" >
        <div class="flex -mx-3">
            <div class="w-4/5 px-3 mb-5">
                <h2 class="text-2xl font-semibold text-gray-700 dark:text-gray-200">Cotação #{{estimate.id}} - {{estimate.equipment.description}} <span @click="showEstimateModal" class="inline-flex items-center justify-center px-2 py-1 text-sm font-bold leading-none text-white bg-primary-main rounded ml-2 cursor-pointer">Exibir detalhes do equipamento</span></h2>
                <bar-loader class="mt-3" :color="loader.color" :loading="loader.loading" :size="150"></bar-loader>
            </div>
        </div>
        <span class="flex justify-center items-center text-gray-700" v-if="products && products.length === 0" > {{ loader.loading ? 'Carregando...':'Nenhum produto encontrado...' }}</span>
        <div  v-if="products && products.length !== 0">
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
                        <v-th  class="text-center" style="width: 10%" sortKey="part_code">Código</v-th>
                        <v-th  class="text-center" style="width: 10%" sortKey="description">Descrição</v-th>
                        <v-th  class="text-center" style="width: 10%" sortKey="quantity">Quantidade</v-th>
                        <v-th  class="text-center" style="width: 10%" sortKey="measure">Unidade</v-th>
                        <v-th  class="text-center" style="width: 10%" sortKey="allow_similar">Aceita Similar</v-th>
                        <th class="text-center" style="width: 20%" >Ações</th>
                    </tr>
                </thead>
                <tbody class="bg-white divide-y dark:divide-gray-700 dark:bg-gray-800" slot="body" slot-scope="{displayData}">
                    <tr  v-for="row in displayData" :key="row.id">
                        <td class="text-sm text-center text-gray-700">{{row.part_code != '' ? row.part_code:'Sem código'}}</td>
                        <td class="text-sm text-center text-gray-700">{{row.description}}</td>
                        <td class="text-sm text-center text-gray-700">{{row.quantity}}</td>
                        <td class="text-sm text-center text-gray-700">{{row.measure}}</td>
                        <td class="text-sm text-center text-gray-700">
                            <span :class="formatDefault(row.allow_similar)" class="text-sm px-2 py-1 font-semibold text-white rounded-full dark:text-white cursor-pointer">
                                {{formatName(row.allow_similar)}}
                            </span>
                        </td>
                        <td class="flex justify-center mt-2">
                            <div class="flex items-center space-x-4 text-sm">
                                <button @click="showDetailModal(row, false)" class="flex items-center justify-between px-2 py-2 bg-primary-lighter text-sm font-medium leading-5 text-white rounded-lg dark:text-gray-400 focus:outline-none focus:shadow-outline-gray" aria-label="Edit">
                                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 21h7a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v11m0 5l4.879-4.879m0 0a3 3 0 104.243-4.242 3 3 0 00-4.243 4.242z" /> </svg>
                                </button>
                            </div>  
                        </td>
                    </tr>
                </tbody>
            </v-table>
            <div class="grid px-4 py-3 text-xs font-semibold tracking-wide text-gray-500 uppercase border-t dark:border-gray-700 bg-gray-50 sm:grid-cols-9 dark:text-gray-400 dark:bg-gray-800">
                <span class="flex items-center col-span-3">
                    Total: {{products.length}} registros
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
        <product-show
            v-if="isDetailModalVisible"
            :product="product"
            :allowEdit="allowEdit"
            @close="closeDetailModal"
        >
        </product-show>

         <estimate-details-modal
            v-if="isEstimateModalOpen"
            :estimate="estimate"
            @close="closeEstimateModal"
        >
        </estimate-details-modal>



    </div>
</template>
<script>
import { bus } from '../../../main'
import ProductShow from '../Products/ProductShow';
import { productService } from '../../../services';

import { BarLoader } from '@saeris/vue-spinners';
import EstimateDetailsModal from '../../../components/Seller/Estimates/EstimateDetailsModal';

export default {
    name: 'EstimateProducts',
    components: {
        BarLoader,
        ProductShow,
        EstimateDetailsModal
    },
    updated() {
        bus.$off('updatedProduct');
        bus.$on('updatedProduct', (data) => {
            if(data) {
                this.getProducts();
            }
        })
    },
    created() {
        this.getProducts();
    },
    data() {
        return {
            isEstimateModalOpen: false,
            isDetailModalVisible: false,
            allowEdit: false,
            currentPage: 1,
            totalPages: 5,
            products: [],
            estimate: {
                equipment: ''
            },
            product: null,
            colors: ["bg-red-500", "bg-primary-main"],
            defaults: ['Não', 'Sim'],
            loader: {
                loading: false,
                color: '#0bc95b',
            },
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
        getProducts() {
            const estimate_id = this.$route.params.id
            this.loader.loading = true
            productService.getProducts(estimate_id).then((response) => {
                this.loader.loading = false
                this.products = response.data.data
                this.estimate = response.data.estimate
            }).catch((error) => {
                console.log(error.response.data)
            }) 
        },
        showDetailModal(data, editable) {
            this.allowEdit = editable
            this.product = data
            this.isDetailModalVisible = true;
            bus.$emit('ModalOpen', true);
        },
        closeDetailModal() {
            this.isDetailModalVisible = false;
            bus.$emit('ModalOpen', false);
        },
        formatDefault(id) {
            return this.colors[id]
        },
        formatName(id) {
            return this.defaults[id]
        },
    }

}
</script>

<style>

</style>