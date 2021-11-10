<template>
    <div class="relative bg-white w-auto  overflow-hidden rounded-xl w-full my-4 shadow-xl">
        <div class="flex flex-col min-h-full">
            <div class="px-6 py-4 border-b bg-primary-main flex flex-row justify-between">
                <div class="text-md text-center text-white font-semibold">{{formatMissingInformation(order.proposal.estimate.description)}}</div>
                <div class="bg-white text-black font-semibold text-xs text-md px-2 py-1 rounded-md">{{formatCurrency(order.proposal.total)}}</div>
            </div>
        <div class="px-2 py-2 flex-grow">
            <ul  class="flex space-x-2 mb-2 justify-between whitespace-nowrap">
                <li class="bg-primary-main text-sm px-2 py-1 font-medium text-white rounded-md">Pedido #{{formatMissingInformation(order.id)}} </li>
                <li  class="bg-blue-400 text-sm px-2 py-1 font-medium text-white rounded-md">{{formatMissingInformation(order.proposal.estimate.category.name)}} </li>
            </ul>
            <div class="mt-1">
                <div class="flex space-x-2 text-gray-800 text-sm my-3">
                     <p><span class="font-bold">Comprador:</span> {{formatMissingInformation(order.proposal.estimate.user.company.company_name)}}</p> 
                </div>
                <div class="flex space-x-2 text-gray-800 text-sm my-3">
                     <p><span class="font-bold">Quantidade:</span> {{formatMissingInformation(order.proposal.estimate.quantity)}}</p> 
                </div>
                <div class="flex space-x-2 text-gray-800 text-sm my-3">
                     <p><span class="font-bold">Unidade:</span> {{formatMeasure(order.proposal.estimate.measure)}}</p> 
                </div>
                <div class="flex space-x-2 text-gray-800 text-sm my-3">
                     <p><span class="font-bold">Peça Similar:</span> {{formatSimilar(order.proposal.is_similar)}}</p> 
                </div>
                <div class="flex space-x-2 text-gray-800 text-sm my-3">
                     <p><span class="font-bold">Marca:</span> {{formatMissingInformation(order.proposal.brand)}}</p> 
                </div>
                <div class="flex space-x-2 text-gray-800 text-sm">
                     <p><span class="font-bold">Equipamento:</span> {{formatEquipment(order.proposal.estimate.equipment)}}</p> 
                </div>
            </div>
            <ul class="flex space-x-2 mb-2 justify-start my-3">
                <li v-if="order.delivery" class="w-full text-center cursor-pointer bg-indigo-500 text-sm px-2 py-1 font-medium text-white rounded-md"><i class="mdi mdi-truck-fast-outline"></i> Entrega </li>
                <li v-else class="w-full text-center bg-orange-500 text-sm px-2 cursor-pointer py-1 font-medium text-white rounded-md"><i class=" mdi mdi-package-variant"></i> Retirada </li>
            </ul>
        </div>
        <div class="border-t-2"></div>
        <div class="flex justify-between px-2">
            <div class="my-2">
                <div :class="formatStatus(order.status).bg" class="w-full text-sm px-2 py-1 font-semibold text-white rounded-md dark:text-white">
                        <i class="text-white text-sm mr-2" :class="formatStatus(order.status).icon"> </i>{{formatStatus(order.status).text}}
                </div>
                </div>
                <div class="my-2 ml-2">
                    <div class="flex items-center space-x-1 text-sm">
                        <svg v-if="order.status == 1"  v-tooltip="{ content: 'Adicionar forma de pagamento' }"  @click="handleOrderClick"  xmlns="http://www.w3.org/2000/svg" class="h-7 w-7 animate-bounce text-yellow-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/>
                        </svg>

                        <button v-tooltip="{ content: 'Visualizar' }" @click="handleOrderClick" class="flex items-center justify-between px-2 py-2 bg-primary-main text-sm font-medium leading-5 text-white rounded-lg dark:text-gray-400 focus:outline-none focus:shadow-outline-gray" aria-label="Edit">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 21h7a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v11m0 5l4.879-4.879m0 0a3 3 0 104.243-4.242 3 3 0 00-4.243 4.242z"/>
                            </svg>
                        </button>
                        
                        <button v-tooltip="{ content: 'Arquivos' }" @click="openFileModal" class="flex items-center justify-between px-2 py-2 bg-blue-500 text-sm font-medium leading-5 text-white rounded-lg dark:text-gray-400 focus:outline-none focus:shadow-outline-gray" aria-label="Edit">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>                       
                        </button>
                        
                        <a target="_blank" :href="'https://prod.cotamaq.com.br/api/v1/orders/' + order.id + '/pdf'" v-tooltip="{ content: 'Imprimir' }"  class="flex items-center justify-between px-2 py-2 bg-orange-500 text-sm font-medium leading-5 text-white rounded-lg dark:text-gray-400 focus:outline-none focus:shadow-outline-gray" aria-label="Edit">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
                            </svg>                       
                        </a>
                    </div>
                </div>
            </div>
        </div>
        <OrderFile :order="order" v-if="modal.file" @close="closeFileModal" />
    </div>
</template>
<script>
import { bus } from '../../../main'
import { 
    formatMissingInformation, 
    formatCurrency, 
    formatSimilar, 
    formatEquipment,
    formatMeasure,
} from '@/helpers/string-helper';
import OrderFile from './OrderFile'

export default {
    name: 'OrderItem',
    props: ['order'],
    components:{
        OrderFile
    },
    data() {
        return {
            modal: {
                file: false,
            },
            status: [
                {id: 1, bg: 'bg-orange-400', text: 'Pendente', icon: 'mdi mdi-progress-clock'},
                {id: 2, bg: 'bg-orange-400', text: 'Aguardando comprador', icon: 'mdi mdi-progress-clock'},
                {id: 3, bg: 'bg-blue-500', text: 'Em preparo', icon: 'mdi mdi-package-variant-closed'},
                {id: 4, bg: 'bg-indigo-600', text: 'Em trânsito', icon: 'mdi mdi-truck-fast-outline'},
                {id: 5, bg: 'bg-primary-main', text: 'Entregue', icon: 'mdi mdi-calendar-check-outline'},
            ],
        }
    },
    methods: {
        formatEquipment,
        formatSimilar,
        formatCurrency,
        formatMissingInformation,
        formatMeasure,
        openFileModal() {
            this.modal.file = true;
            bus.$emit('ModalOpen', true);
        },
        closeFileModal() {
            this.modal.file = false;
            bus.$emit('ModalOpen', false);
        },
        handleOrderClick() {
            this.$router.push({name: 'OrderDetails', params: {order_id: this.order.id}})
        },
        formatStatus(value) {
            let format = this.status.find(status => status.id == value)
            return format
        },
    }

}
</script>

<style>

</style>