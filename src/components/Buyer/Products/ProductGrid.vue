<template>

    <div class="my-6 px-4 py-3 mb-8 bg-white rounded-lg shadow-md dark:bg-gray-800" >
        <bar-loader class="mt-3" :color="loader.color" :loading="loader.loading" :size="150"></bar-loader>
        <div class="flex -mx-3">
            <div class="w-4/5 px-3 mb-5">
                <h2 class="text-2xl font-semibold text-gray-700 dark:text-gray-200">Produtos</h2>
            </div>
            <div class="w-1/5 px-3 mb-5">
                <label for="" class="text-xs font-semibold px-1"></label>
                <div class="flex">
                    <div class="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center"></div>
                    <button @click="showAddModal()" class="w-full -ml-10 pl-2 pr-3 py-2  flex items-center justify-center bg-primary-main text-white hover:bg-primary-darker font-semibold rounded border-b-2 border-primary-main  hover:text-white shadow-md py-2 px-6 inline-flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                        </svg>
                        <span class="justify-center ml-2">Adicionar</span>
                    </button>  
                </div>  
            </div>
        </div>
        <span class="flex justify-center items-center text-gray-700" v-if="products && products.length === 0" > {{ loader.loading ? 'Carregando...':'Nenhum produto encontrado...' }}</span>
        <div  v-if="products && products.length !== 0">
            <v-table
                class="w-full whitespace-no-wrap mb-2" 
                :data="products"     
                :hideSortIcons="true"
                :currentPage.sync="currentPage"
                :pageSize="3"
                @totalPagesChanged="totalPages = $event"
            >
                <thead class="rounded border-b-2 border-primary-main shadow-md py-2 px-6 outline-none no-selection" slot="head">
                    <tr class="text-xs h-10 font-semibold tracking-wide text-left text-gray-500 uppercase border-b dark:border-gray-700 bg-gray-50 dark:text-gray-400 dark:bg-gray-800">
                        <v-th  class="text-center" style="width: 10%" sortKey="part_code">Código</v-th>
                        <v-th  class="text-center" style="width: 10%" sortKey="description">Descrição</v-th>
                        <v-th  class="text-center" style="width: 20%" sortKey="quantity">Quantidade</v-th>
                        <v-th  class="text-center" style="width: 10%" sortKey="allow_similar">Aceita Similar</v-th>
                        <th class="text-center" style="width: 20%" >Ações</th>
                    </tr>
                </thead>
                <tbody class="bg-white divide-y dark:divide-gray-700 dark:bg-gray-800" slot="body" slot-scope="{displayData}">
                    <tr  v-for="row in displayData" :key="row.id">
                        <td class="text-sm text-center text-gray-700">{{row.part_code != '' ? row.part_code:'Sem código'}}</td>
                        <td class="text-sm text-center text-gray-700">{{row.description}}</td>
                        <td class="text-sm text-center text-gray-700">{{row.quantity}}</td>
                        <td class="text-sm text-center text-gray-700">
                            <span :class="formatDefault(row.allow_similar)" class="text-sm px-2 py-1 font-semibold text-white rounded-full dark:text-white">
                                {{formatName(row.allow_similar)}}
                            </span>
                        </td>
                        <td class="flex justify-center mt-2">
                            <div class="flex items-center space-x-4 text-sm">
                                <button @click="showDetailModal(row, true)"  class="flex items-center justify-between px-2 py-2 bg-blue-500 text-sm font-medium leading-5 text-white rounded-lg dark:text-gray-400 focus:outline-none focus:shadow-outline-gray" aria-label="Edit">
                                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5"  viewBox="0 0 20 20" fill="currentColor"> <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" /> </svg>
                                </button>

                                <button @click="showDetailModal(row, false)" class="flex items-center justify-between px-2 py-2 bg-primary-lighter text-sm font-medium leading-5 text-white rounded-lg dark:text-gray-400 focus:outline-none focus:shadow-outline-gray" aria-label="Edit">
                                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 21h7a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v11m0 5l4.879-4.879m0 0a3 3 0 104.243-4.242 3 3 0 00-4.243 4.242z" /> </svg>
                                </button>

                                <button  @click="showDeleteModal(row)" class="flex items-center justify-between px-2 py-2 bg-red-500 text-sm font-medium leading-5 text-white rounded-lg dark:text-gray-400 focus:outline-none focus:shadow-outline-gray" aria-label="Edit">
                                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /> </svg>                        
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
            <div class="flex justify-end center-items" >
            <div class="w-1/5 mb-5">
                        <label for="" class="text-xs font-semibold px-1"></label>
                            <div class="flex">
                            <div class="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center"></div>
                                <button  @click="updateEstimate(1)" class="w-full flex items-center justify-center  bg-gray-600 text-white font-semibold rounded hover:bg-gray-700 hover:text-white shadow-md py-2 px-6 inline-flex items-center">
                                    <span class="justify-center">Salvar Rascunho</span>
                                </button>                         
                            </div>   
                        </div>
                        <div class="w-1/5  px-3  mb-5">
                            <label for="" class="text-xs font-semibold px-1"></label>
                            <div class="flex">
                            <div class="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center"></div>
                                <button @click="updateEstimate(2)"  class="w-full flex items-center justify-center bg-primary-main text-white font-semibold rounded hover:bg-primary-darker hover:text-white shadow-md py-2 px-6 inline-flex items-center">
                                    <span class="justify-center">Enviar Cotação</span>
                                </button>                         
                            </div>   
                        </div>
            </div>
        </div>

        <product-add
            v-if="isAddModalVisible"
            @close="closeAddModal">
        </product-add>

        <product-delete
            v-if="isDeleteModalVisible"
            :product="product"
            @close="closeDeleteModal">
        </product-delete>

        <product-detail
            v-if="isDetailModalVisible"
            :product="product"
            :allowEdit="allowEdit"
            @close="closeDetailModal"
        >
        </product-detail>



    </div>
</template>
<script>
import { bus } from '../../../main'
import ProductAdd from './ProductAdd';
import ProductDelete from './ProductDelete';
import ProductDetail from './ProductDetail';
import { productService } from '../../../services';

import { BarLoader } from '@saeris/vue-spinners';

export default {
    name: 'ProductGrid',
    components: {
        ProductAdd,
        BarLoader,
        ProductDelete,
        ProductDetail
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
            isAddModalVisible: false,
            isDeleteModalVisible: false,
            isDetailModalVisible: false,
            allowEdit: false,
            currentPage: 1,
            totalPages: 5,
            products: [],
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
        saveDraft() {

        },
        sendEstimate() {

        },
        getProducts() {
            const estimate_id = this.$route.params.id
            this.loader.loading = true
            productService.getProducts(estimate_id).then((response) => {
                this.loader.loading = false
                this.products = response.data.data
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
        showDeleteModal(data) {
            this.product = data
            this.isDeleteModalVisible = true;
            bus.$emit('ModalOpen', true);
        },
        closeDeleteModal() {
            this.isDeleteModalVisible = false;
            bus.$emit('ModalOpen', false);
        },
        showAddModal() {
            this.isAddModalVisible = true;
            bus.$emit('ModalOpen', true);
        },
        closeAddModal() {
            this.isAddModalVisible = false;
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