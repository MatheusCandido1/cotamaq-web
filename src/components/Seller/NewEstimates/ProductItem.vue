<template>
    <div   v class="relative bg-white   overflow-hidden rounded-xl w-full my-4 shadow-xl">
        <div class="flex flex-col min-h-full">
            <div class="px-6 py-4 border-b bg-primary-main">
                <div class="text-md text-center text-white font-semibold">{{product.description}}</div>
            </div>
        <div class="px-2 py-2 flex-grow">
            <ul class="flex space-x-2 justify-end">
                <li class="bg-blue-400 text-white text-xs text-md px-4 py-1 rounded-md mb-2">{{product.category.name}} </li>
            </ul>
          <div class="mt-1 px-2 ">
              <div class="flex space-x-2 justify-start text-gray-800 text-sm">
                     <p><span class="w-full bg-primary-main text-sm px-2 py-1 font-medium text-white rounded-md">Cotação #{{product.id}}</span></p> 
                </div>
                <div class="flex space-x-2 text-gray-800 text-sm my-3">
                     <p><span class="font-bold">Quantidade:</span> {{product.quantity}}</p> 
                </div>
                <div class="flex space-x-2 text-gray-800 text-sm my-3">
                     <p><span class="font-bold">Aceita Similar:</span> {{formatSimillar(product.allow_similar)}}</p> 
                </div>
                <div class="flex space-x-2 text-gray-800 text-sm my-3">
                     <p><span class="font-bold">Marca:</span> {{!product.brand || product.brand == ''  ? 'Não informado' : product.brand}}</p> 
                </div>
                <div class="flex space-x-2 text-gray-800 text-sm">
                     <p><span class="font-bold">Equipamento:</span> {{product.equipment == null ? 'Não informado': formatEquipment(product.equipment)}}</p> 
                </div>
          </div>
        </div>
        <div v-if="product.proposals_by_seller.length == 0">
            <div class="border-t-2"></div>       
            <div class="flex justify-between px-4 p-2">
                <button @click="handleDeclineOpenClick" class=" w-5/12 px-1 py-1 bg-red-500 text-sm font-medium leading-5 text-white rounded-lg dark:text-gray-400 focus:outline-none focus:shadow-outline-gray">
                    Recusar
                </button>
                <button @click="handleAcceptOpenClick" class=" w-5/12 px-1 py-1 bg-primary-main text-sm font-medium leading-5 text-white rounded-lg dark:text-gray-400 focus:outline-none focus:shadow-outline-gray">
                    Cotar
                </button>    
            </div>
        </div>
            <div>
                <div class="border-t-2"></div>    
                <div class="flex justify-between px-4 cursor-pointer">
                    <div class="my-2">
                        <span class="font-semibold text-base mb-2">Suas Propostas</span>
                    </div>
                    <div class="my-2">
                        <span class="badge mb-3 bg-primary-main rounded-lg px-2 py-1 text-center object-right-top text-white text-sm mr-1 font-bold">0</span>
                    </div>   
                </div>
                <div class="border-t-2"></div>    
               <div class="flex justify-between px-4 ">
                    <div  v-if="product.proposals_by_seller.length == 0" class="my-2">
                        <div :class="formatEstimateStatus(product.proposals_by_seller.length >= 1 ? product.proposals_by_seller[0].status:product.status).bg" class="w-full text-sm px-2 py-1 font-semibold text-white rounded-md dark:text-white">
                            {{formatEstimateStatus(product.proposals_by_seller.length >= 1 ? product.proposals_by_seller[0].status:product.status).text}}
                        </div>
                    </div>
                    <div v-else class="my-2">
                        <div :class="formatProposalStatus(product.proposals_by_seller.length >= 1 ? product.proposals_by_seller[0].status:1).bg" class="w-full text-sm px-2 py-1 font-semibold text-white rounded-md dark:text-white">
                            {{formatProposalStatus(product.proposals_by_seller.length >= 1 ? product.proposals_by_seller[0].status:1).text}}
                        </div>
                    </div>
                    <div class="my-2 ml-2">
                        <div class="flex items-center space-x-1 text-sm">
                            <button v-if="false" class="flex items-center justify-between px-2 py-2 bg-blue-500 text-sm font-medium leading-5 text-white rounded-lg dark:text-gray-400 focus:outline-none focus:shadow-outline-gray" aria-label="Edit">
                                <svg xmlns="http://www.w3.org/2000/svg" class="h-3 w-3" viewBox="0 0 20 20" fill="currentColor">
                                    <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                                </svg>
                            </button>
                            <button v-if="product.proposals_by_seller && product.proposals_by_seller[0].status == 1"  class="bg-primary-main w-full text-sm px-2 py-1 font-semibold text-white rounded-md dark:text-white">
                                Nova Proposta
                            </button>
                        </div>
                    </div>
               </div>
            </div>
        </div>
        <EstimateAccept @close="handleAcceptCloseClick" v-if="modal.accept" :estimate="selectedEstimate" />
        <EstimateDecline @close="handleDeclineCloseClick" v-if="modal.decline" :estimate="selectedEstimate" />
    </div>
    
</template>

<script>
import EstimateDecline from './EstimateDecline';
import EstimateAccept from './EstimateAccept';
import { formatEquipment, formatSimillar } from '@/helpers/string-helper';
import { bus } from '../../../main';

export default {
    name: 'ProductItem',
    props: ['product'],
    components:{
        EstimateDecline,
        EstimateAccept
    },
    data() {
        return {
            modal: {
                decline: false,
                accept: false,
            },
            selectedEstimate: JSON.parse(JSON.stringify(this.$props.product)),
            proposalStatus: [
                {id: 1, bg: 'bg-yellow-300', text: 'Pendente'},
                {id: 2, bg: 'bg-blue-400', text: 'Enviada'},
                {id: 3, bg: 'bg-blue-400', text: 'Enviada'},
                {id: 4, bg: 'bg-indigo-200', text: 'Iniciada'},
                {id: 5, bg: 'bg-red-600', text: 'Rejeitada por você'},
                {id: 6, bg: 'bg-primary-main', text: 'Aprovada'},
                {id: 7, bg: 'bg-red-600', text: 'Rejeitada'},
            ],
            estimateStatus: [
                {id: 1, bg: 'bg-yellow-300', text: 'Pendente'},
                {id: 2, bg: 'bg-yellow-300', text: 'Enviada'},
                {id: 3, bg: 'bg-red-400', text: 'Cancelada'},
                {id: 4, bg: 'bg-blue-700', text: 'Andamento'},
            ],
           
        }
    },
    methods: {
        formatEquipment,
        formatSimillar,
        handleAcceptOpenClick() {
            console.log('uai')
            this.modal.accept = true;
            bus.$emit('ModalOpen', true);
        },
        handleAcceptCloseClick() {
            this.modal.accept = false;
            bus.$emit('ModalOpen', false);
        },
        handleDeclineOpenClick() {
            this.modal.decline = true;
            bus.$emit('ModalOpen', true);
        },
        handleDeclineCloseClick() {
            this.modal.decline = false;
            bus.$emit('ModalOpen', false);
        },
        formatProposalStatus(value) {
            let format = this.proposalStatus.find(status => status.id == value)
            return format
        },
        formatEstimateStatus(value) {
            let format = this.estimateStatus.find(status => status.id == value)
            return format
        },
       
    },
    created(){
       
       
    }

}
</script>

<style>

</style>