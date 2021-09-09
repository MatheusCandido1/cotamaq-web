<template>
  <transition name="modal-fade">
    <div class="fixed z-10 inset-0 overflow-y-auto">
      <div
        class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0"
      >
        <div class="fixed inset-0 transition-opacity" aria-hidden="true">
          <div class="absolute inset-0 bg-gray-900 opacity-80"></div>
        </div>

        <!-- This element is to trick the browser into centering the modal contents. -->
        <span
          class="hidden sm:inline-block sm:align-middle sm:h-screen"
          aria-hidden="true"
          >&#8203;</span
        >
        <div
          class="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full"
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-headline"
        >
          <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <div class="sm:flex sm:items-start">
              <div
                class="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-primary-lighter sm:mx-0 sm:h-10 sm:w-10"
              >
                <!-- Heroicon name: outline/exclamation -->
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
            </svg>
              </div>
              <div class="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                <h3
                  class="text-lg leading-6 font-medium text-gray-900"
                  id="modal-headline"
                >
                  Realizar compra
                </h3>
                <div class="mt-2">
                  <p class="text-sm text-gray-600">
                   Tem certeza que deseja aprovar essa proposta e realizar a compra?
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div class="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
            <button
              type="button"
              :disabled="disabled"
              @click="acceptProposal()"
              class="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-primary-main text-base font-medium text-white hover:bg-primary-darker focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-lighter sm:ml-3 sm:w-auto sm:text-sm"
            >
              Comprar
            </button>
            <button
              type="button"
              @click="close"
              class="mt-3 w-full inline-flex justify-center rounded-md border  shadow-sm px-4 py-2 bg-gray-500 text-white text-base font-medium hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-main sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
            >
              Cancelar
            </button>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>
<script>
import { bus } from '../../../main';
import { proposalService } from '../../../services';
import {
  formatSimilar,
  formatMissingInformation,
  formatCurrency,
  formatDelivery
} from "@/helpers/string-helper";
export default {
  name: "ProposalAccept",
  props: ['proposal','discount'],
  data() {
    return {
        selectedProposal: JSON.parse(JSON.stringify(this.$props.proposal)),
        disabled: false,
    }
  },
  destroyed() {
    this.close()
  },
  methods: {
    formatSimilar,
    formatMissingInformation,
    formatCurrency,
    formatDelivery,
    close() {
      this.$emit("close");
    },
    acceptProposal() {
      var data = {subtotal:this.proposal.subtotal ,discount:this.discount, takeOut:this.$store.getters.proposalTakeOut}
      proposalService.approveProposalByBuyer(this.selectedProposal.id,data ).then((response) => {
        this.$toast.success(response.success_message, {
          position: "bottom-right",
          pauseOnHover: false,
          showCloseButtonOnHover: true,
          timeout: 2500
        });
          bus.$emit('updateProposalsByBuyer', true);
          this.close()
          this.$router.push('/cotacoes')
          this.disabled = false
        }).catch((error) => {
          console.log(error.response.data)
        })
    },
  },
};
</script>