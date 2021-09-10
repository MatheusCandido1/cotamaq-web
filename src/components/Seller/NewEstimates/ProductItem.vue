<template>
    <div class="relative bg-white   overflow-hidden rounded-xl w-full my-4 shadow-xl">
        <div class="flex flex-col min-h-full">
            <div class="px-6 py-4 border-b bg-primary-main">
                <div class="text-md text-center text-white font-semibold">{{estimate.description}}</div>
            </div>
        <div class="px-2 py-2 flex-grow">
            <div class="flex justify-between">
                <div class="bg-blue-400 text-white text-xs text-md px-2 py-1 rounded-md mb-2">{{estimate.category.name}} </div>
                <div v-if="validProposals.length > 0" class="bg-indigo-600 text-white text-xs text-md px-2 py-1 rounded-md mb-2">{{formatCurrency(getLowestTotal())}} </div>
            </div>
          <div class="mt-1 ">
              <div class="flex space-x-2 justify-start text-gray-800 text-sm">
                     <p><span class="w-full bg-primary-main text-sm px-2 py-1 font-medium text-white rounded-md">Cotação #{{estimate.id}}</span></p> 
                </div>
                <div class="flex space-x-2 text-gray-800 text-sm my-3">
                     <p><span class="font-bold">Quantidade:</span> {{estimate.quantity}}</p> 
                </div>
                <div class="flex space-x-2 text-gray-800 text-sm my-3">
                     <p><span class="font-bold">Aceita Similar:</span> {{formatSimillar(estimate.allow_similar)}}</p> 
                </div>
                <div class="flex space-x-2 text-gray-800 text-sm my-3">
                     <p><span class="font-bold">Marca:</span> {{!estimate.brand || estimate.brand == ''  ? 'Não informado' : estimate.brand}}</p> 
                </div>
                <div class="flex space-x-2 text-gray-800 text-sm">
                     <p><span class="font-bold">Equipamento:</span> {{estimate.equipment == null ? 'Não informado': formatEquipment(estimate.equipment)}}</p> 
                </div>
          </div>
        </div>
            <button v-if="estimate.images.length > 0" @click="showModalImages" class=" w-full bg-gray-600 font-semibold text-white text-xs text-md px-4 py-2 rounded-md mb-2">Visualizar Fotos</button>

          <div>
            <div class="border-t-2"
                v-if="estimate.proposals_by_seller 
                && estimate.proposals_by_seller.length > 0 
                && estimate.proposals_by_seller[0].status != 5"
            ></div>   
            <div 
                v-if="estimate.proposals_by_seller 
                && estimate.proposals_by_seller.length > 0 
                && estimate.proposals_by_seller[0].status != 5"
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

        <div v-if="getValidProposals() >= 1 && estimate.allow_similar === 0"  class=" w-full text-center bg-red-500 font-semibold text-white text-xs text-md px-4 py-2 rounded-md mb-2">
            Você já fez uma proposta
        </div> 

          <div>
                <div class="border-t-2"></div>  
                <div v-if="estimate.proposals_by_seller && estimate.proposals_by_seller.length == 0" class="flex justify-between px-2 p-2">
                    <button @click="handleDeclineOpenClick" class=" w-5/12 px-1 py-1 bg-red-500 text-sm font-medium leading-5 text-white rounded-lg dark:text-gray-400 focus:outline-none focus:shadow-outline-gray">
                        Recusar
                    </button>
                    <button @click="handleNewProposalClick" class=" w-5/12 px-1 py-1 bg-primary-main text-sm font-medium leading-5 text-white rounded-lg dark:text-gray-400 focus:outline-none focus:shadow-outline-gray">
                        Cotar
                    </button>  
                </div>
                <div v-if="estimate.proposals_by_seller && estimate.proposals_by_seller.length == 0" class="border-t-2"></div>  
               
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
                                @click="handleProposalsBySellerClick"
                                class="flex items-center justify-between px-2 py-2 bg-primary-main text-sm font-medium leading-5 text-white rounded-lg dark:text-gray-400 focus:outline-none focus:shadow-outline-gray" aria-label="Edit">
                               <svg xmlns="http://www.w3.org/2000/svg" class="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 21h7a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v11m0 5l4.879-4.879m0 0a3 3 0 104.243-4.242 3 3 0 00-4.243 4.242z"/>
                                </svg>
                            </button>
                        </div>

                        <div v-if="formatStatus().id == 2" class="flex items-center space-x-1 text-sm">
                            <button
                                @click="handleProposalsBySellerClick"
                                class="flex items-center justify-between px-2 py-2 bg-primary-main text-sm font-medium leading-5 text-white rounded-lg dark:text-gray-400 focus:outline-none focus:shadow-outline-gray" aria-label="Edit">
                               <svg xmlns="http://www.w3.org/2000/svg" class="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 21h7a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v11m0 5l4.879-4.879m0 0a3 3 0 104.243-4.242 3 3 0 00-4.243 4.242z"/>
                                </svg>
                            </button>
                        </div>

                        <div v-if="formatStatus().id == 3" class="flex items-center space-x-1 text-sm">
                            <button v-tooltip="{ content: 'Visualizar' }"
                                @click="handleProposalsBySellerClick"
                                class="flex items-center justify-between px-2 py-2 bg-primary-main text-sm font-medium leading-5 text-white rounded-lg dark:text-gray-400 focus:outline-none focus:shadow-outline-gray" aria-label="Edit">
                               <svg xmlns="http://www.w3.org/2000/svg" class="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 21h7a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v11m0 5l4.879-4.879m0 0a3 3 0 104.243-4.242 3 3 0 00-4.243 4.242z"/>
                                </svg>
                            </button>
                            <div v-if="getValidProposals() >= 1 && estimate.allow_similar === 0">
                                <span />
                            </div>
                            <div v-else>
                                <button v-tooltip="{ content: 'Criar nova proposta' }" @click="handleNewProposalClick"   class="bg-primary-main w-full text-sm px-2 py-1 font-semibold text-white rounded-md dark:text-white">
                                    Nova Proposta
                                </button>
                            </div>
                        </div>

                        <div v-if="formatStatus().id == 4" class="flex items-center space-x-1 text-sm">
                            <div @click="openProposal"  class="w-full cursor-pointer  bg-blue-500 text-sm px-2 py-1 font-semibold text-white rounded-md dark:text-white">
                                Reabrir
                            </div>
                        </div>
                    </div>
               </div>
            </div>
        </div>
        <EstimateDecline @close="handleDeclineCloseClick" v-if="modal.decline" :estimate="estimate" />
        <EstimateShowImage @close="closeImageModal" v-if="modal.images" :estimate="estimate" />
    </div>
</template>

<script>
import EstimateDecline from './EstimateDecline';
import { formatEquipment, formatSimillar, formatCurrency } from '@/helpers/string-helper';
import { bus } from '../../../main';
import { proposalService} from "../../../services";
import EstimateShowImage from "../Estimates/EstimateShowImage";

export default {
    name: 'ProductItem',
    props: ['estimate'],
    components:{
        EstimateDecline,
        EstimateShowImage
    },
    created() {
       this.getLowestTotal()
    },
    data() {
        return {
            modal: {
                decline: false,
                accept: false,
                images:false
            },
        }
    },
    computed: {
        invalidProposal: function () {
            return this.estimate.proposals_by_seller.filter(proposal => proposal.status == 5)
        },
        pendingProposals: function() {
            return this.estimate.proposals_by_seller.filter(proposal => proposal.status == 1)
        },
        validProposals: function() {
            return this.estimate.proposals_by_seller.filter(proposal => proposal.status == 1 || proposal.status == 2 || proposal.status == 3 || proposal.status == 4)
        },
        sentProposals: function () {
            return this.estimate.proposals_by_seller.filter(proposal => proposal.status == 2)
        },
        approvedProposals: function() {
            return this.estimate.proposals_by_seller.filter(proposal => proposal.status == 3)
        }
    },
    methods: {
        formatEquipment,
        formatSimillar,
        formatCurrency,
      showModalImages(){
        bus.$emit('ModalOpen', true)
        this.modal.images = true

      },
      closeImageModal(){
        bus.$emit('ModalOpen', false)
        this.modal.images = false
      },
       openProposal(){
          proposalService.ReOpenProposal(this.estimate.id).then((response)=>{
            this.$toast.success(response.success_message, {
              position: "bottom-right",
              pauseOnHover: false,
              showCloseButtonOnHover: true,
              timeout: 2500
            });

            this.$emit('UpdateProposal', true);
          })
        },
        getLowestTotal() {
            if(this.validProposals.length == 0){
                return 0.00
            } else {
                return this.validProposals.reduce((min, p) => p.total < min ? p.total : min, this.validProposals[0].total);
            }
        },
        getValidProposals() {
            if(this.pendingProposals.length == this.estimate.proposals_by_seller.length){
                return 0
            } else {
              var count = 0
              this.validProposals.forEach((data)=>{
                  if(data.status != 1){
                    count++
                  }
              })
            return count
            }
        },
        getSentProposals() {
            return this.sentProposals.length
        },
        handleProposalsBySellerClick() {
            this.$router.push({name: 'ProposalsByEstimate', params: {estimate_id: this.estimate.id }})
        },
        handleNewProposalClick() {
            if(this.estimate.status == 4){
              return  this.$toast.error('Cotação indisponível! Fechada com outra revenda.', {
                position: "bottom-right",
                pauseOnHover: false,
                showCloseButtonOnHover: true,
                timeout: 2500
              });
            }
            this.$router.push({name: 'addProposal', params: {estimate_id: this.estimate.id}})
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
            if(this.estimate.status == 4 && this.approvedProposals.length > 0) {
                return {
                    id: 1,
                    bg: 'bg-primary-main', 
                    text:'Aprovada',
                }
            }

            if(this.estimate.status == 4 && this.approvedProposals.length == 0) {
               return {id: 2, bg: 'bg-red-500', text:'Rejeitada pelo comprador'}
            }
                    
            if(this.validProposals.length > 0 && (this.estimate.status == 2 || this.estimate.status == 3)) {
               if(this.pendingProposals.length == this.estimate.proposals_by_seller.length) {
                return {id: 3, bg: 'bg-yellow-400', text:'Pendente'}
               } else {
                return {id: 3, bg: 'bg-blue-500', text:'Enviada'}
               }
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