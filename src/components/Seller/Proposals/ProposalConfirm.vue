<template>
  <transition name="modal-fade">
    <div class="fixed z-50 inset-0 overflow-y-auto">
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
                class="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-primary-main sm:mx-0 sm:h-10 sm:w-10"
              >
                <!-- Heroicon name: outline/exclamation -->
                 <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                  </svg>
              </div>
              <div class="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                <h3 class="text-lg leading-6 font-medium text-gray-900" id="modal-headline">
                  Enviar Proposta
                </h3>
                 <div class="mt-2">
                  <p class="text-sm text-gray-800">
                   Tem certeza que deseja enviar esta proposta?
                  </p>

                  <div v-if="shipping == 0" class="bg-yellow-200 mt-6 rounded-md p-3 flex flex-col items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" class="text-gray-800 h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                    </svg>
                    <p class="text-sm text-gray-800 pt-2">
                    Favor conferir CEP de entrega e valor do frete.
                    Caso seja zero, será considerado como gratuito.
                    </p>
                  </div>
                </div>
                
              </div>
            </div>
          </div>
          <div class="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
            <button
              type="button"
              v-if="notShowNewProposalBtn != true"
              @click="save(true)"
              :disabled="disabled"
              class="mt-2 w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-primary-main text-base font-medium text-white hover:bg-primary-darker focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500 sm:ml-3 sm:w-auto sm:text-sm"
            >
              Enviar e Criar Nova Proposta
            </button>
            <button
              type="button"
              @click="save(false)"
              :disabled="disabled"
              class="mt-2 w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-primary-main text-base font-medium text-white hover:bg-primary-darker focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500 sm:ml-3 sm:w-auto sm:text-sm"
            >
              Enviar
            </button>
            <button
              type="button"
              @click="close"
              class="mt-2 w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 border-gray-300 text-base font-medium text-black hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-main sm:ml-3 sm:w-auto sm:text-sm"
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
export default {
  name: "ProposalConfirm",
  props: ['notShowNewProposalBtn', 'shipping'],
  data() {
    return {
      disabled: false
    }
  },
  destroyed() {
    this.close()
  },
  methods: {
    close() {
      this.$emit("close");
    },
    save(new_proposal) {
      this.$emit("save", new_proposal);
    },
  },
};
</script>