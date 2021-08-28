<template>
     <div class="relative bg-white overflow-hidden rounded-xl w-full my-4 shadow-xl">
          <div class="flex flex-col min-h-full">
               <div class="px-6 py-4 border-b bg-primary-main flex flex-row justify-between">
                    <div class="text-md text-center text-white font-semibold">Proposta #{{selectedProposal.id}}</div>
                    <div class="bg-white text-black font-semibold text-xs text-md px-2 py-1 rounded-md">{{formatCurrency(selectedProposal.total)}}</div>
               </div>
               <div class="flex flex-row">
                    <div class="px-2 py-2 flex-grow">
                         <div class="mt-1 px-2">
                              <ul class="flex gap-2 justify-start">
                                   <div class="text-center flex-1 bg-blue-500 border-2 border-blue-500 font-semibold text-white text-xs text-md px-4 py-2 rounded-md mb-2">{{formatDelivery(proposal.delivery, proposal.delivery_time)}}</div>
                              </ul>
                              <div class="flex space-x-2 text-gray-800 text-sm">
                                   <p><span class="font-semibold">Preço Unitário: </span>{{formatCurrency(selectedProposal.value)}}</p> 
                              </div>
                              <div class="flex space-x-2 text-gray-800 text-sm  my-1">
                                   <p><span class="font-semibold">Quantidade: </span>{{formatMissingInformation(selectedEstimate.quantity)}}</p> 
                              </div>
                              <div class="flex space-x-2 text-gray-800 text-sm  my-1">
                                   <p><span class="font-semibold">Subtotal: </span>{{formatCurrency(selectedProposal.subtotal)}}</p> 
                              </div>
                              <div class="flex space-x-2 text-gray-800 text-sm  my-1">
                                   <p><span class="font-semibold">Frete: </span>{{formatCurrency(selectedProposal.shipping)}}</p> 
                              </div>
                              <div class="flex space-x-2 text-gray-800 text-sm  my-1">
                                   <p><span class="font-semibold">Desconto a vista: </span>{{formatMissingInformation(selectedProposal.discount)}}</p> 
                              </div>
                              <div class="flex space-x-2 text-gray-800 text-sm  my-1">
                                   <p><span class="font-semibold">Valor Total: </span>{{formatCurrency(selectedProposal.total)}}</p> 
                              </div>
                              <div class="flex space-x-2 text-gray-800 text-sm  my-1">
                                   <p><span class="font-semibold">Peça Similar: </span>{{formatSimilar(selectedProposal.is_similar)}}</p> 
                              </div>
                              <div class="flex space-x-2 text-gray-800 text-sm  my-1">
                                   <p><span class="font-semibold">Marca: </span>{{formatMissingInformation(selectedProposal.brand)}}</p> 
                              </div>
                              <div class="flex space-x-2 text-gray-800 text-sm  my-1">
                                   <p><span class="font-semibold">Observação: </span>{{formatMissingInformation(selectedProposal.observation)}}</p> 
                              </div>
                              <button class="flex-1 w-full bg-gray-600 font-semibold text-white text-xs text-md px-4 py-2 rounded-md mb-2">Visualizar Fotos</button>
                              <div class="border-t-2"></div>
                              <ul v-if="selectedProposal.status == 2" class="flex gap-2 justify-start mt-2">                  
                                   <button @click="handleAcceptOpenClick" class="flex-1 bg-primary-main font-semibold text-white text-md text-sm px-4 py-2 rounded-md mb-2">Comprar</button>
                                   <button @click="handleDeclineOpenClick" class="flex-1 bg-red-600 font-semibold text-white text-md text-sm px-4 py-2 rounded-md mb-2">Recusar</button>
                              </ul>
                              <ul v-if="selectedProposal.status == 3 || selectedProposal.status == 4" class="flex gap-2 justify-start mt-2">                  
                                   <div :class="formatStatus(selectedProposal.status).bg" class="flex-1 text-center font-semibold text-white text-md text-sm px-4 py-2 rounded-md mb-2">{{formatStatus(selectedProposal.status).text}}</div>
                              </ul>
                         </div>
                    </div>
               </div>
          </div>
          <ProposalAccept @close="handleAcceptCloseClick" v-if="modal.accept" :proposal="proposal" />
          <ProposalDecline @close="handleDeclineCloseClick" v-if="modal.decline" :proposal="proposal" />
     </div>
</template>

<script>
import { bus } from "../../../main";
import {
	formatSimilar,
	formatMissingInformation,
	formatCurrency,
	formatDelivery
} from "@/helpers/string-helper";
import ProposalAccept from "./ProposalAccept";
import ProposalDecline from "./ProposalDecline";

export default {
	name: "ProposalPartItem",
	props: ["estimate", "proposal"],
	components: {
		ProposalDecline,
		ProposalAccept
	},
	data() {
		return {
               status: [
                    {id: 3, bg: 'bg-primary-main', text: 'Aprovada'},
                    {id: 4, bg: 'bg-red-600', text: 'Rejeitada por você'}
               ],
               selectedProposal: JSON.parse(JSON.stringify(this.$props.proposal)),
               selectedEstimate: JSON.parse(JSON.stringify(this.$props.estimate)),
			modal: {
				accept: false,
				decline: false
			}
		};
	},
	methods: {
		formatSimilar,
		formatMissingInformation,
		formatCurrency,
		formatDelivery,
          formatStatus(value) {
               let format = this.status.find(status => status.id == value)
               return format
          },
		handleAcceptOpenClick() {
			this.modal.accept = true;
			bus.$emit("ModalOpen", true);
		},
		handleAcceptCloseClick() {
			this.modal.accept = false;
			bus.$emit("ModalOpen", false);
		},
		handleDeclineOpenClick() {
			this.modal.decline = true;
			bus.$emit("ModalOpen", true);
		},
		handleDeclineCloseClick() {
			this.modal.decline = false;
			bus.$emit("ModalOpen", false);
		}
	}
};
</script>

<style></style>