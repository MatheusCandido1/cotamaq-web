<template>
    <div class="relative bg-white   overflow-hidden rounded-xl w-full my-4 shadow-xl">
        <div class="flex flex-col min-h-full">
            <div class="px-6 py-4 border-b bg-primary-main">
                <div class="text-md text-center text-white font-semibold">{{product.description}}</div>
            </div>
        <div class="px-2 py-2 flex-grow">
            <div class="flex justify-between">
                <div class="bg-blue-400 text-white text-xs text-md px-2 py-1 rounded-md mb-2">{{product.category.name}} </div>
                <div v-if="validProposals.length > 0" class="bg-indigo-600 text-white text-xs text-md px-2 py-1 rounded-md mb-2">{{formatCurrency(getLowestTotal())}} </div>
            </div>
          <div class="mt-1 ">
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
        <div>
            <div class="border-t-2"
                v-if="product.proposals_by_seller 
                && product.proposals_by_seller.length > 0 
                && product.proposals_by_seller[0].status != 5"
            ></div>   
            <div 
                v-if="product.proposals_by_seller 
                && product.proposals_by_seller.length > 0 
                && product.proposals_by_seller[0].status != 5"
                    class="flex justify-between px-2">
                <div class="my-2">
                    <span class="font-semibold text-base mb-2">Propostas Enviadas</span>
                </div>
                <div class="my-2">
                    <span class="mb-3 bg-primary-main rounded-lg px-2 py-1 text-center object-right-top text-white text-sm mr-1 font-bold">
                        {{ getValidProposals() }}
                    </span>
                </div>   
            </div> 
        </div>
            <div>
                <div class="border-t-2"></div>  
                <div v-if="product.proposals_by_seller && product.proposals_by_seller == 0" class="flex justify-between px-2 p-2">
                    <button @click="handleDeclineOpenClick" class=" w-5/12 px-1 py-1 bg-red-500 text-sm font-medium leading-5 text-white rounded-lg dark:text-gray-400 focus:outline-none focus:shadow-outline-gray">
                        Recusar
                    </button>
                    <button @click="handleAcceptOpenClick" class=" w-5/12 px-1 py-1 bg-primary-main text-sm font-medium leading-5 text-white rounded-lg dark:text-gray-400 focus:outline-none focus:shadow-outline-gray">
                        Cotar
                    </button>  
                </div>
                <div v-if="product.proposals_by_seller && product.proposals_by_seller.length == 0" class="border-t-2"></div>  
               
                <div  v-else class="flex justify-between px-2 ">
                    <div class="my-2">
                        <div :class="formatStatus().bg" class="w-full text-sm px-2 py-1 font-semibold text-white rounded-md dark:text-white">
                            {{formatStatus().text}}
                        </div>
                    </div>
                    <div class="my-2 ml-2">
                        <!-- Se estiver aprovada -->
                        <div v-if="formatStatus().id == 1" class="flex items-center space-x-1 text-sm">
                            <button
                                @click="handlePropsalsBySellerClick"
                                class="flex items-center justify-between px-2 py-2 bg-primary-main text-sm font-medium leading-5 text-white rounded-lg dark:text-gray-400 focus:outline-none focus:shadow-outline-gray" aria-label="Edit">
                               <svg xmlns="http://www.w3.org/2000/svg" class="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 21h7a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v11m0 5l4.879-4.879m0 0a3 3 0 104.243-4.242 3 3 0 00-4.243 4.242z"/>
                                </svg>
                            </button>
                        </div>

                        <div v-if="formatStatus().id == 2" class="flex items-center space-x-1 text-sm">
                            <button
                                @click="handlePropsalsBySellerClick"
                                class="flex items-center justify-between px-2 py-2 bg-primary-main text-sm font-medium leading-5 text-white rounded-lg dark:text-gray-400 focus:outline-none focus:shadow-outline-gray" aria-label="Edit">
                               <svg xmlns="http://www.w3.org/2000/svg" class="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 21h7a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v11m0 5l4.879-4.879m0 0a3 3 0 104.243-4.242 3 3 0 00-4.243 4.242z"/>
                                </svg>
                            </button>
                        </div>

                        <div v-if="formatStatus().id == 3" class="flex items-center space-x-1 text-sm">
                            <button
                                @click="handlePropsalsBySellerClick"
                                class="flex items-center justify-between px-2 py-2 bg-primary-main text-sm font-medium leading-5 text-white rounded-lg dark:text-gray-400 focus:outline-none focus:shadow-outline-gray" aria-label="Edit">
                               <svg xmlns="http://www.w3.org/2000/svg" class="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 21h7a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v11m0 5l4.879-4.879m0 0a3 3 0 104.243-4.242 3 3 0 00-4.243 4.242z"/>
                                </svg>
                            </button>
                            <button @click="handleNewProposalClick"   class="bg-primary-main w-full text-sm px-2 py-1 font-semibold text-white rounded-md dark:text-white">
                                Nova Proposta
                            </button>
                        </div>

                        <div v-if="formatStatus().id == 4" class="flex items-center space-x-1 text-sm">
                            <div  class="w-full  bg-blue-500 text-sm px-2 py-1 font-semibold text-white rounded-md dark:text-white">
                                Reabrir
                            </div>
                        </div>
<!--
                        <div class="flex items-center space-x-1 text-sm">
                            <button
                                @click="handlePropsalsBySellerClick"
                                class="flex items-center justify-between px-2 py-2 bg-primary-main text-sm font-medium leading-5 text-white rounded-lg dark:text-gray-400 focus:outline-none focus:shadow-outline-gray" aria-label="Edit">
                               <svg xmlns="http://www.w3.org/2000/svg" class="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 21h7a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v11m0 5l4.879-4.879m0 0a3 3 0 104.243-4.242 3 3 0 00-4.243 4.242z"/>
                                </svg>
                            </button>
                            <button 
                                v-if="product.proposals_by_seller 
                                    && product.proposals_by_seller.length > 0 
                                    && validProposals.length > 0
                                    && product.status == 3" @click="handleNewProposalClick"   class="bg-primary-main w-full text-sm px-2 py-1 font-semibold text-white rounded-md dark:text-white">
                                Nova Proposta
                            </button>
                        </div> -->
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
import { formatEquipment, formatSimillar, formatCurrency } from '@/helpers/string-helper';
import { bus } from '../../../main';

export default {
    name: 'ProductItem',
    props: ['product'],
    components:{
        EstimateDecline,
        EstimateAccept
    },
    created() {
       this.getLowestTotal()
    },
    data() {
        return {
            modal: {
                decline: false,
                accept: false,
            },
            selectedEstimate: JSON.parse(JSON.stringify(this.$props.product)),
           
        }
    },
    computed: {
        invalidProposal: function () {
            return this.selectedEstimate.proposals_by_seller.filter(proposal => proposal.status == 5)
        },
        validProposals: function() {
            return this.selectedEstimate.proposals_by_seller.filter(proposal => proposal.status == 2 || proposal.status == 3 || proposal.status == 4)
        },
        sentProposals: function () {
            return this.selectedEstimate.proposals_by_seller.filter(proposal => proposal.status == 2)
        },
        approvedProposals: function() {
            return this.selectedEstimate.proposals_by_seller.filter(proposal => proposal.status == 3)
        }
    },
    methods: {
        formatEquipment,
        formatSimillar,
        formatCurrency,
        getLowestTotal() {
            if(this.validProposals.length == 0){
                return 0.00
            } else {
                return this.validProposals.reduce((min, p) => p.total < min ? p.total : min, this.validProposals[0].total);
            }
        },
        getValidProposals() {
            return this.validProposals.length
        },
        getSentProposals() {
            return this.sentProposals.length
        },
        handlePropsalsBySellerClick() {
            this.$router.push({name: 'ProposalsByEstimate', params: {estimate_id: this.selectedEstimate.id}})
        },
        handleNewProposalClick() {
            this.$router.push({name: 'addProposal', params: {estimate_id: this.selectedEstimate.id}})
        },
        handleAcceptOpenClick() {
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
        formatStatus() {
            if(this.product.status == 4 && this.approvedProposals.length > 0) {
                return {
                    id: 1,
                    bg: 'bg-primary-main', 
                    text:'Aprovada',
                }
            }

            if(this.product.status == 4 && this.approvedProposals.length == 0) {
               return {id: 2, bg: 'bg-red-500', text:'Rejeitada pelo comprador'}
            }
                    
            if(this.validProposals.length > 0 && (this.product.status == 2 || this.product.status == 3)) {
               return {id: 3, bg: 'bg-blue-500', text:'Enviada'}
            }

            if(this.invalidProposal.length > 0) {
               return {id: 4, bg: 'bg-red-500', text:'Rejeitada por você'}
            }
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

}
</script>

<style>

</style>