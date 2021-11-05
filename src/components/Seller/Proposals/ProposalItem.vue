<template>
  <div class="relative bg-white overflow-hidden rounded-xl w-full my-4 shadow-xl">
      <div class="flex flex-col min-h-full">
        <div class="px-6 py-4 border-b bg-primary-main flex flex-row justify-between">
          <div class="text-md text-center text-white font-semibold">Proposta #{{proposal.id}}</div>
          <div class="bg-white text-black font-semibold text-xs text-md px-2 py-1 rounded-md">{{formatCurrency(selectedProposal.total)}}</div>
        </div>
        <div class="flex flex-row">
            <div class="px-2 py-2 flex-grow">
          <div class="mt-1 px-2">
            <ul class="flex gap-2 justify-start">
               <div class="text-center flex-1 bg-blue-500 border-2 border-blue-500 font-semibold text-white text-xs text-md px-4 py-2 rounded-md mb-2">
                    {{formatDelivery(selectedProposal.delivery, selectedProposal.delivery_time)}}
               </div>
            </ul>
                <div class="flex space-x-2 text-gray-800 text-sm">
                     <p><span class="font-semibold">Preço Unitário: </span>{{formatCurrency(selectedProposal.value)}}</p> 
                </div>
                <div class="flex space-x-2 text-gray-800 text-sm  my-1">
                     <p><span class="font-semibold">Quantidade: </span>{{selectedProposal.estimate.quantity}}</p> 
                </div>
                <div class="flex space-x-2 text-gray-800 text-sm  my-1">
                     <p><span class="font-semibold">Unidade: </span>{{ formatMissingInformation(selectedProposal.estimate.measure) }}</p> 
                </div>
                <div class="flex space-x-2 text-gray-800 text-sm">
                     <p><span class="font-semibold">Subtotal: </span>{{formatCurrency(selectedProposal.subtotal)}}</p> 
                </div>
                <div class="flex space-x-2 text-gray-800 text-sm  my-1">
                     <p><span class="font-semibold">Frete: </span>{{formatCurrency(selectedProposal.shipping)}}</p> 
                </div>
                <div class="flex space-x-2 text-gray-800 text-sm  my-1">
                     <p><span class="font-semibold">Desconto: </span>{{selectedProposal.discount == null ?'Sem desconto':selectedProposal.discount + '%'}}</p> 
                </div>
                <div class="flex space-x-2 text-gray-800 text-sm  my-1">
                     <p><span class="font-semibold">Valor Total: </span>{{formatCurrency(selectedProposal.total)}}</p> 
                </div>
                <div class="flex space-x-2 text-gray-800 text-sm  my-1">
                     <p><span class="font-semibold">Peça Similar: </span>{{formatSimilar(selectedProposal.is_similar)}}</p> 
                </div>
                <div class="flex space-x-2 text-gray-800 text-sm  my-1">
                     <p class="break-all"><span class="font-semibold">Marca: </span>{{selectedProposal.brand == null ? 'Não informado':selectedProposal.brand}}</p> 
                </div>
                <div class="flex space-x-2 text-gray-800 text-sm  my-1">
                     <p class="break-all"><span class="font-semibold">Observação: </span>{{selectedProposal.observation == null ? 'Não informado':selectedProposal.observation}}</p> 
                </div>
                <div class="flex space-x-2 text-gray-800 text-sm  my-1">
                     <p class="break-all"><span class="font-semibold">Cidade: </span>{{selectedProposal.user.company.address.city == null ? 'Não informado':selectedProposal.user.company.address.city}}</p> 
                </div>
                <div class="flex space-x-2 text-gray-800 text-sm  my-1">
                     <p class="break-all"><span class="font-semibold">CEP: </span>{{selectedProposal.user.company.address.zipcode == null ? 'Não informado':formatZipcode(selectedProposal.user.company.address.zipcode)}}</p> 
                </div>
                <button @click="showModalImages" class="flex-1 w-full bg-gray-600 font-semibold text-white text-xs text-md px-4 py-2 rounded-md mb-2">Visualizar Fotos</button>

                <div class="border-t-2"></div>
                    <div class=" flex flex-row justify-end my-2 gap-2">
                         <button :class="formatStatus(selectedProposal.status).bg" class="w-full text-sm px-2 py-1 pointer-events-none font-semibold text-white rounded-md dark:text-white">
                              {{formatStatus(selectedProposal.status).text}}
                         </button>
                         <button
                              v-if="selectedProposal.status == 3"
                              v-tooltip="{ content: 'Enviar mensagem' }"
                              @click="goChat"
                              class="flex items-center justify-between px-2 py-2 bg-blue-500 text-sm font-medium leading-5 text-white rounded-lg dark:text-gray-400 focus:outline-none focus:shadow-outline-gray"
                         >
                              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                              </svg>
                         </button>
                         <button v-if="selectedProposal.status == 1" @click="handleEditClick" class="flex items-center justify-between px-2 py-2 bg-blue-500 text-sm font-medium leading-5 text-white rounded-lg dark:text-gray-400 focus:outline-none focus:shadow-outline-gray" aria-label="Edit">
                              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                   <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                              </svg>
                         </button>
                         <button v-if="selectedProposal.status == 1" @click="showDeleteModal" class="flex items-center justify-between px-2 py-2 bg-red-500 text-sm font-medium leading-5 text-white rounded-lg dark:text-gray-400 focus:outline-none focus:shadow-outline-gray" aria-label="Edit">
                              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                   <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                              </svg>
                         </button>
                         <button 
                              @click="handleDetailsClick"
                              v-if="
                                   selectedProposal.status == 2 ||
                                   selectedProposal.status == 3 ||
                                   selectedProposal.status == 4 
                              " 
                              class="flex items-center justify-between px-2 py-2 bg-primary-lighter text-sm font-medium leading-5 text-white rounded-lg dark:text-gray-400 focus:outline-none focus:shadow-outline-gray">
                              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                   <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 21h7a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v11m0 5l4.879-4.879m0 0a3 3 0 104.243-4.242 3 3 0 00-4.243 4.242z"/>
                              </svg>
                         </button>
                    </div>
               </div>
               </div>
               </div>
          </div>
          <ProposalDelete v-if="modal.cancel" :proposal="selectedProposal" @close="closeDeleteModal"></ProposalDelete>
          <ProposalShowImages v-if="modal.images" :proposal="selectedProposal" @close="closeShowImagesModal"></ProposalShowImages>
     </div>
</template>

<script>
import { bus } from '../../../main';
import { formatSimilar, formatCurrency, formatDelivery, formatZipcode, formatMissingInformation } from '@/helpers/string-helper';
import ProposalDelete from './ProposalDelete'
import ProposalShowImages from "./ProposalShowImages";
import { chatService} from "../../../services";

export default {
     name: 'ProposalItem',
     props: ['proposal'],
     components: {
          ProposalDelete,
          ProposalShowImages
     },
     data() {
        return {
          isAlreadyConversation: false,
          alreadyConversationId: null,
          imagesProposal:[],
          modal: {
               cancel: false,
                images:false,
          },
          selectedProposal: JSON.parse(JSON.stringify(this.$props.proposal)),
          status: [
               {id: 1, bg: 'bg-orange-400', text: 'Pendente'},
               {id: 2, bg: 'bg-blue-500', text: 'Enviada'},
               {id: 3, bg: 'bg-primary-main', text: 'Aprovada'},
               {id: 4, bg: 'bg-red-500', text: 'Rejeitada pelo comprador'},
               {id: 5, bg: 'bg-red-500', text: 'Rejeitada por você'}
          ],
        }
     },
     methods: {
          formatSimilar,
          formatCurrency,
          formatDelivery,
          formatZipcode,
          formatMissingInformation,
          async goChat(){
            const userReceiver = {
              name: this.selectedProposal.estimate.user.name,
              id: this.selectedProposal.estimate.user_id,
            }
            
            await chatService.getChat().then((res)=>{
              const data = res.data
              data.forEach((item) => {
                if(item.user.id == userReceiver.id){
                  this.isAlreadyConversation = true
                  this.alreadyConversationId = item.id
                }
              })
            })

            if (this.isAlreadyConversation == true){
              this.$router.push({
                name: "chat",
                params: { id: this.alreadyConversationId },
              });
            }
            else {
              await chatService.newChat(userReceiver).then((res)=>{
                this.$router.push({
                  name: "chat",
                  params: { id: res.data.id },
                });
              })
            }
          },
          showModalImages(){

            bus.$emit('ModalOpen', true)
            this.modal.images = true
          },
          showDeleteModal() {
               bus.$emit('ModalOpen', true)
               this.modal.cancel = true
          },
          closeDeleteModal() {
               bus.$emit('ModalOpen', false)
               this.modal.cancel = false
          },
       closeShowImagesModal() {
               bus.$emit('ModalOpen', false)
               this.modal.images = false
          },

          handleDetailsClick() {
               this.$router.push({name: 'proposalDetails', params: {proposal_id: this.selectedProposal.id}})
          },
          handleEditClick() {
               this.$router.push({name: 'updateProposal', params: {estimate_id: this.selectedProposal.estimate_id, proposal_id: this.selectedProposal.id}})
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