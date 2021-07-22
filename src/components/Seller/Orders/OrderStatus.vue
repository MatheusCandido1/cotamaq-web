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
                  Atualizar situação do pedido
                </h3>
                <div class="mt-2">
                  <p class="text-sm text-gray-600">
                   Tem certeza que deseja alterar a situação do pedido para <span class="font-bold">{{defaultName(newStatus)}}</span> ?
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div class="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
            <button
              type="button"
              @click="updateOrder()"
              :disabled="disabled"
              class="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-primary-main text-base font-medium text-white hover:bg-primary-darker focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-lighter sm:ml-3 sm:w-auto sm:text-sm"
            >
              Enviar
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
import { orderService } from '../../../services';

export default {
  name: "OrderStatus",
  props: ['order','status'],
  data() {
    return {
        selectedOrder: JSON.parse(JSON.stringify(this.$props.order)),
        newStatus: JSON.parse(JSON.stringify(this.$props.status)),
        names: ['Pendente','Em preparo','Em trânsito','Entregue'],
        disabled: false,
    }
  },
  methods: {
    close() {
      this.$emit("close");
    },
    updateOrder() {
      this.disabled = true
        const payload = {
            id: this.selectedOrder.id,
            status: this.newStatus
        }
        orderService.updateStatus(payload).then((response) => {
            this.$toast.success(response.success_message, {
                position: "bottom-right",
                pauseOnHover: false,
                showCloseButtonOnHover: true,
                timeout: 2500
            });
            this.$emit("closeAfterSave");
            this.disabled = false
        }).catch((error) => {
            console.log(error.response.data)
            this.disabled = false
        })
      
    },
    defaultName(id) {
        return this.names[id]
    }
  },
};
</script>