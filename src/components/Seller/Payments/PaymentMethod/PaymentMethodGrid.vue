<template>
    <span>
    <div class="flex items-center justify-between">
        <div class="-mx-3">
            <div class="w-full px-3 mb-5">
                <h2 class="text-2xl font-semibold text-gray-700 dark:text-gray-200">Formas de Pagamento</h2>
                <bar-loader class="mt-3" :color="loader.color" :loading="loader.loading" :size="150"></bar-loader>
            </div>
        </div>
        <div class="-mx-3">
            <div class="w-full px-3 mb-5">
                <div class="flex" >
                    <div class="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center"></div>
                    <button @click="showAddModal()"  class="w-full -ml-10 pl-2 pr-3 py-2   flex items-center justify-between px-2 py-2 bg-primary-main text-white font-semibold rounded border-b-2 border-primary-main  hover:text-white shadow-md py-2 px-6 inline-flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                        </svg>
                        <span class="justify-center">Adicionar</span>
                    </button>  
                </div>  
            </div>
        </div>
    </div>
    <span class="flex justify-center items-center text-gray-600" v-if="paymentMethods && paymentMethods.length === 0" > {{ loader.loading ? 'Carregando...':'Nenhuma forma de pagamento encontrada...' }}</span>

    <v-table  v-if="paymentMethods && paymentMethods.length !== 0" class="w-full whitespace-no-wrap" :data="paymentMethods" :hideSortIcons="true">
        <thead class="rounded border-b-2 border-primary-main shadow-md py-2 px-6 outline-none no-selection" slot="head">
            <tr class="text-xs h-10 font-semibold tracking-wide text-left text-gray-500 uppercase border-b dark:border-gray-700 bg-gray-50 dark:text-gray-400 dark:bg-gray-800">
                <!-- <v-th  class="text-center" sortKey="main">Padrão</v-th> -->
                <v-th class="text-center" sortKey="description">Descrição</v-th>
                <th class="text-center" >Ações</th>
            </tr>
        </thead>
        <tbody class="bg-white divide-y dark:divide-gray-700 dark:bg-gray-800" slot="body" slot-scope="{displayData}">
            <tr v-for="row in displayData" :key="row.id">
                <!-- <td class="text-center">
                    <span :class="formatDefault(row.main)" class="text-sm px-2 py-1 font-semibold text-white rounded-full dark:text-white">
                        {{formatName(row.main)}}
                    </span>
                </td> -->
                <td class="text-sm text-center">{{row.description}}</td>
                <td class="flex justify-center mt-2">
                    <div class="flex items-center space-x-4 text-sm">
                        <button @click="showDetailsModal(row)" class="flex items-center justify-between px-2 py-2 bg-blue-500 text-sm font-medium leading-5 text-white rounded-lg dark:text-gray-400 focus:outline-none focus:shadow-outline-gray" aria-label="Edit">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5"  viewBox="0 0 20 20" fill="currentColor"> <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" /> </svg>
                        </button>
                        <button @click="showDeleteModal(row)"  class="flex items-center justify-between px-2 py-2 bg-red-500 text-sm font-medium leading-5 text-white rounded-lg dark:text-gray-400 focus:outline-none focus:shadow-outline-gray" aria-label="Edit">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /> </svg>                        
                        </button>
                    </div>  
                </td>
            </tr>
        </tbody>
    </v-table>

    <payment-method-delete
            v-if="isDeleteModalVisible"
            :paymentMethod="selectedPaymentMethod"
            @close="closeDeleteModal"
    ></payment-method-delete>

    <payment-method-add
            v-if="isAddModalVisible"
            @close="closeAddModal"
    ></payment-method-add>

    <payment-method-details
            :paymentMethod="selectedPaymentMethod"
            v-if="isDetailsModalVisible"
            @close="closeDetailsModal"
    ></payment-method-details>
    </span>
</template>

<script>
import { paymentMethodService } from '../../../../services'
import { bus } from '../../../../main';
import PaymentMethodDelete from './PaymentMethodDelete';
import PaymentMethodAdd from './PaymentMethodAdd';
import PaymentMethodDetails from './PaymentMethodDetails';
import { BarLoader } from '@saeris/vue-spinners'

export default {
    name: 'PaymentMethodGrid',
    components: {
        PaymentMethodDelete,
        PaymentMethodAdd,
        PaymentMethodDetails,
        BarLoader
    },
    mounted() {
        this.getPaymentMethods();
    },
    updated() {
        bus.$off('updatePaymentMethod');
        bus.$on('updatePaymentMethod', (data) => {
            if(data) {
               this.getPaymentMethods(); 
            }
        })
    },
    data() {
        return {
            isDeleteModalVisible: false,
            isAddModalVisible: false,
            isDetailsModalVisible: false,
            selectedPaymentMethod: null,
            paymentMethods: [],
            colors: ["bg-yellow-500", "bg-primary-main"],
            defaults: ['Não', 'Sim'],
            loader: {
                loading: false,
                color: '#0bc95b',
            },
        }
    },
    methods: {
        showDeleteModal(data) {
            this.selectedPaymentMethod = data
            this.isDeleteModalVisible = true;
            bus.$emit('ModalOpen', true);
        },
        closeDeleteModal() {
            this.isDeleteModalVisible = false;
            bus.$emit('ModalOpen', false);
            this.selectedPaymentMethod = null
        },
        showAddModal() {
            this.isAddModalVisible = true;
            bus.$emit('ModalOpen', true);
        },
        closeAddModal() {
            this.isAddModalVisible = false;
            bus.$emit('ModalOpen', false);
        },
        showDetailsModal(data) {
            this.selectedPaymentMethod = data
            this.isDetailsModalVisible = true;
            bus.$emit('ModalOpen', true);
        },
        closeDetailsModal() {
            this.isDetailsModalVisible = false;
            bus.$emit('ModalOpen', false);
            this.selectedPaymentMethod = null
        },
        formatDefault(id) {
            return this.colors[id]
        },
        formatName(id) {
            return this.defaults[id]
        },
        getPaymentMethods() {
            this.loader.loading = true
            paymentMethodService.getPaymentMethods().then((response) => {
                this.loader.loading = false
                this.paymentMethods = response.data.data.paymentMethods
            }).catch((error) => {
                console.log(error.response.data)
            }) 
        },
    }
}
</script>

<style>
.header-table {
    background-color: #edf2f7;
    border-bottom-width: 2px;
    border-color: #0bc95b
}
</style>