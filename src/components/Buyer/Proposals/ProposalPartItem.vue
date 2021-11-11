<template>
  <div
    class="relative bg-white overflow-hidden rounded-xl w-full my-4 shadow-xl"
  >
    <div class="flex flex-col min-h-full">
      <div
        class="px-6 py-4 border-b bg-primary-main flex flex-row justify-between"
      >
        <div class="text-md text-center text-white font-semibold">
          Proposta #{{ selectedProposal.id }}
        </div>
        <div
          class="bg-white text-black font-semibold text-xs text-md px-2 py-1 rounded-md"
        >
          {{ formatCurrency(selectedProposal.total) }}
        </div>
      </div>
      <div class="flex flex-row">
        <div class="px-2 py-2 flex-grow">
          <div class="mt-1 px-2">
            <ul class="flex gap-2 justify-start">
              <div
                class="text-center flex-1 bg-blue-500 border-2 border-blue-500 font-semibold text-white text-xs text-md px-4 py-2 rounded-md mb-2"
              >
                {{ formatDelivery(proposal.delivery, proposal.delivery_time) }}
              </div>
            </ul>
            <div class="flex space-x-2 text-gray-800 text-sm">
              <p>
                <span class="font-semibold">Preço Unitário: </span
                >{{ formatCurrency(selectedProposal.value) }}
              </p>
            </div>
            <div class="flex space-x-2 text-gray-800 text-sm  my-1">
              <p>
                <span class="font-semibold">Quantidade: </span
                >{{ formatMissingInformation(selectedEstimate.quantity) }}
              </p>
            </div>
            <div class="flex space-x-2 text-gray-800 text-sm  my-1">
              <p>
                <span class="font-semibold">Unidade: </span
                >{{ formatMeasure(selectedEstimate.measure) }}
              </p>
            </div>
            <div class="flex space-x-2 text-gray-800 text-sm  my-1">
              <p>
                <span class="font-semibold">Subtotal: </span
                >{{ formatCurrency(selectedProposal.subtotal) }}
              </p>
            </div>
            <div class="flex space-x-2 text-gray-800 text-sm  my-1">
              <p>
                <span class="font-semibold">Frete: </span
                >{{ formatCurrency(selectedProposal.shipping) }}
              </p>
            </div>
            <div class="flex space-x-2 text-gray-800 text-sm  my-1">
              <p>
                <span class="font-semibold">Desconto à vista: </span
                >{{ formatDiscountPercent(selectedProposal.discount) }}
              </p>
            </div>
            <div class="flex space-x-2 text-gray-800 text-sm  my-1">
              <p>
                <span class="font-semibold">Valor Total: </span
                >{{ formatCurrency(selectedProposal.total) }}
              </p>
            </div>
            <div class="flex space-x-2 text-gray-800 text-sm  my-1">
              <p>
                <span class="font-semibold">Peça Similar: </span
                >{{ formatSimilar(selectedProposal.is_similar) }}
              </p>
            </div>
            <div
              v-if="estimate.allow_similar == 0"
              class="flex space-x-2 text-gray-800 text-sm  my-1"
            >
              <p class="break-all">
                <span class="font-semibold">Marca: </span
                >{{ formatMissingInformation(estimate.brand) }}
              </p>
            </div>
            <div v-else class="flex space-x-2 text-gray-800 text-sm  my-1">
              <p class="break-all">
                <span class="font-semibold">Marca: </span
                >{{ formatMissingInformation(selectedProposal.brand) }}
              </p>
            </div>
            <div class="flex space-x-2 text-gray-800 text-sm  my-1">
              <p class="break-all">
                <span class="font-semibold">Observação: </span
                >{{ formatMissingInformation(selectedProposal.observation) }}
              </p>
            </div>
            <div class="flex space-x-2 text-gray-800 text-sm  my-1">
                <p class="break-all"><span class="font-semibold">Cidade: </span>{{selectedProposal.user.company.address.city == null ? 'Não informado':selectedProposal.user.company.address.city}}</p> 
            </div>
            <div class="flex space-x-2 text-gray-800 text-sm  my-1">
                <p class="break-all"><span class="font-semibold">CEP: </span>{{selectedProposal.user.company.address.zipcode == null ? 'Não informado':formatZipcode(selectedProposal.user.company.address.zipcode)}}</p> 
            </div>
            <button
              @click="showModalImages"
              class="flex-1 w-full bg-gray-600 font-semibold text-white text-xs text-md px-4 py-2 rounded-md mb-2"
            >
              Visualizar Fotos
            </button>
            <div class="border-t-2"></div>
            <ul
              v-if="selectedProposal.status == 2"
              class="flex gap-2 justify-start mt-2"
            >
              <button
                @click="handleDeclineOpenClick"
                class="flex-1 bg-red-600 font-semibold text-white text-md text-sm px-4 py-2 rounded-md mb-2"
              >
                Recusar
              </button>
              <button
                @click="handleAcceptOpenClick"
                class="flex-1 bg-primary-main font-semibold text-white text-md text-sm px-4 py-2 rounded-md mb-2"
              >
                Comprar
              </button>
              <button
                @click="goChat"
                class="flex-1 bg-blue-600 font-semibold text-white text-md text-sm px-4 py-2 rounded-md mb-2"
              >
                Enviar mensagem
              </button>
            </ul>

            <div
              v-if="
                selectedProposal.status == 3 || selectedProposal.status == 4
              "
              class=" flex flex-row justify-end my-2 gap-2"
            >
              <button
                :class="formatStatus(selectedProposal.status).bg"
                class="w-full text-sm px-2 py-1 pointer-events-none font-semibold text-white rounded-md dark:text-white"
              >
                {{ formatStatus(selectedProposal.status).text }}
              </button>
              <button
                v-tooltip="{ content: 'Visualizar Proposta' }"
                @click="handleDetailsClick"
                v-if="
                  selectedProposal.status == 3 || selectedProposal.status == 4
                "
                class="flex items-center justify-between px-2 py-2 bg-primary-lighter text-sm font-medium leading-5 text-white rounded-lg dark:text-gray-400 focus:outline-none focus:shadow-outline-gray"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M10 21h7a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v11m0 5l4.879-4.879m0 0a3 3 0 104.243-4.242 3 3 0 00-4.243 4.242z"
                  />
                </svg>
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
              <button
                v-if="selectedProposal.order"
                v-tooltip="{ content: 'Visualizar Pedido' }"
                @click="goOrder"
                class="flex items-center justify-between px-2 py-2 bg-yellow-500 text-sm font-medium leading-5 text-white rounded-lg dark:text-gray-400 focus:outline-none focus:shadow-outline-gray"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <ProposalAccept
      @close="handleAcceptCloseClick"
      v-if="modal.accept"
      :delivery="delivery"
      :discount="discount"
      :proposal="proposal"
      :shiping="shiping"
      :takeOut="takeOut"
    />
    <ProposalDecline
      @close="handleDeclineCloseClick"
      v-if="modal.decline"
      :proposal="proposal"
    />
    <ProposalShowImages
      v-if="modal.images"
      :proposal="proposal"
      @close="handleImageCloseClick"
    ></ProposalShowImages>
  </div>
</template>

<script>
import { bus } from "../../../main";
import {
  formatCurrency,
  formatDelivery,
  formatMissingInformation,
  formatSimilar,
  formatDiscountPercent,
  formatZipcode,
  formatMeasure,
} from "@/helpers/string-helper";
import ProposalAccept from "./ProposalAccept";
import ProposalDecline from "./ProposalDecline";
import ProposalShowImages from "./ProposalShowImages";
import {chatService} from '../../../services'

export default {
  name: "ProposalPartItem",
  props: ["estimate", "proposal", "discount", "delivery", "shiping", "takeOut"],
  components: {
    ProposalDecline,
    ProposalAccept,
    ProposalShowImages,
  },
  data() {
    return {
      status: [
        { id: 3, bg: "bg-primary-main", text: "Aprovada" },
        { id: 4, bg: "bg-red-600", text: "Rejeitada por você" },
      ],
      selectedProposal: this.proposal,
      selectedEstimate: this.estimate,
      isAlreadyConversation: false,
      alreadyConversationId: null,
      modal: {
        accept: false,
        decline: false,
        images: false,
      },
    };
  },
  methods: {
    formatSimilar,
    formatMissingInformation,
    formatCurrency,
    formatDelivery,
    formatDiscountPercent,
    formatZipcode,
    formatMeasure,
    async goChat(){
      const userReceiver = {
        name: this.selectedProposal.user.name,
        id: this.selectedProposal.user_id,
      }

      await chatService.getChat().then((res)=>{
        const data = res.data
        data.forEach((item) => {
          if(item.auth.id == userReceiver.id || item.notification.id == userReceiver.id){
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
    goOrder() {
      this.$router.push({
        name: "OrderDetails",
        params: { order_id: this.selectedProposal.order.id },
      });
    },
    formatStatus(value) {
      let format = this.status.find((status) => status.id == value);
      return format;
    },
    handleDetailsClick() {
      this.$router.push({
        name: "proposalDetails",
        params: { proposal_id: this.selectedProposal.id },
      });
    },
    showModalImages() {
      this.modal.images = true;
      bus.$emit("ModalOpen", true);
    },
    handleImageCloseClick() {
      this.modal.images = false;
      bus.$emit("ModalOpen", false);
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
    },
  },
};
</script>

<style></style>
