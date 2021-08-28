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
                class="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-500 sm:mx-0 sm:h-10 sm:w-10"
              >
                <!-- Heroicon name: outline/exclamation -->
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
</svg>
              </div>
              <div class="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                <h3
                  class="text-lg leading-6 font-medium text-gray-900"
                  id="modal-headline"
                >
                  Recusar cotação
                </h3>
                <div class="mt-2">
                  <p class="text-sm text-gray-600">
                   Tem certeza que deseja recusar essa cotação?
                  </p>
                  <p class="text-sm text-gray-600 mt-3">
                   Ao recusar, você <span class="font-bold">NÃO</span> poderá propor uma oferta para essa cotação!
                  </p>
                </div>
                <div class="-mx-3 md:flex mb-6">
                    <div class="md:w-full px-3 mb-2 md:mb-0">
                        <textarea v-model="reason" placeholder="Conte pra gente o motivo..." class="form-textarea mt-1 block resize-none w-full pl-2 pr-3 py-2 rounded border-b-2 border-red-400 shadow-md py-2 px-6 outline-none  focus:border-red-500 text-sm text-gray-600" rows="3"></textarea>
                    </div>
                </div>
              </div>
            </div>
          </div>
          <div class="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
            <button
              type="button"
              @click="declineProposal()"
              :disabled="disabled"
              class="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-500 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-lighter sm:ml-3 sm:w-auto sm:text-sm"
            >
              Recusar
            </button>
            <button
              type="button"
              @click="close"
              class="mt-3 w-full inline-flex justify-center rounded-md border  shadow-sm px-4 py-2 bg-gray-500 text-white text-base font-medium hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-main sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
            >
              Fechar
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

export default {
  name: "EstimateDecline",
  props: ['estimate'],
  data() {
    return {
        selectedEstimate: JSON.parse(JSON.stringify(this.$props.estimate)),
        disabled: false,
        reason: null,
    }
  },
  destroyed() {
    this.close()
  },
  methods: {
    close() {
      this.$emit("close");
    },
    declineProposal() {
        this.disabled = true
        const payload = {
            estimate_id: this.selectedEstimate.id,
            observation: this.reason
        }
        proposalService.declineProposal(payload).then((response) => {
            this.$toast.success(response.success_message, {
                position: "bottom-right",
                pauseOnHover: false,
                showCloseButtonOnHover: true,
                timeout: 2500
            });
            this.close();
            bus.$emit('updateSellerEstimates', true);
            this.disabled = false
        }).catch((error) => {
            console.log(error.response.data)
            this.disabled = false
        })
        },
  },
};
</script>